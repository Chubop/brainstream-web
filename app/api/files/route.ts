import type { NextApiRequest, NextApiResponse } from "next";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";

// Initialize Google Cloud Storage with project credentials.
// Ensure that environment variables are set for authentication.

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});



// Get the bucket from the environment variables.
// The bucket is where the files will be stored.
const bucket = storage.bucket(process.env.BUCKET_NAME || '');

// Handler for POST requests to upload files.
export async function POST(req: Request) {
  // Log environment variables for debugging purposes.
  // It's important to ensure that sensitive info like private keys are not logged in production.
  console.log("Environment Variables:", {
    PROJECT_ID: process.env.PROJECT_ID,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY ? "provided" : "not provided",
  });
  
  try {
    // Parse the request body to get the file information.
    const json = await req.json();
    console.log("request:", json);
    console.log("no bucket:", json.file);
    // Create a reference to the file in the bucket.
    const file = bucket.file(json.file as string);
    console.log("bucket:", file);
    // Define the options for the signed URL.
    const options = {
      expires: Date.now() + 5 * 60 * 1000, // Set expiration time for the signed URL (5 minutes).
      fields: { "x-goog-meta-source": "brainstream-web" }, // Custom metadata for the upload.
    };

    // Generate a signed URL that allows for direct file upload.
    const [response] = await file.generateSignedPostPolicyV4(options);
    // Return the signed URL in the response.
    return response;
  } catch (error) {
    // Handle any errors that occur during the signed URL generation.
    // Return a JSON response with the error message and a 500 status code.
    return new Response(JSON.stringify({ error: `Error generating signed URL" ${error}` }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// You can add more handlers for other HTTP methods if needed.
// For example, for a GET request:
// export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
//   // Handle GET request
// }