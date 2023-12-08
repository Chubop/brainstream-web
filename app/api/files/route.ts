// pages/api/upload.ts
import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

// Specify bucket name here
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName || '');


export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const file = body.get('file') as File;
    const fileName = body.get('fileName') as string;

    if (!file) {
      return NextResponse.json({ message: "Missing file" }, { status: 400 });
    }
    if (!fileName) {
      return NextResponse.json({ message: "Missing file name" }, { status: 400 });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    // Convert the file to a buffer
    const buffer = await file.arrayBuffer();

    // Wrap the stream finish event in a promise
    await new Promise<void>((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error(err);
        reject(new Error("Error uploading to Google Cloud bucket"));
      });

      blobStream.on('finish', () => {
        resolve();
      });

      blobStream.end(Buffer.from(buffer));
    });

    // After the file has been uploaded, construct the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    // Return the fileName and publicUrl in the response
    return NextResponse.json({ fileName, publicUrl }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error'}, { status: 500 });
  }
}
