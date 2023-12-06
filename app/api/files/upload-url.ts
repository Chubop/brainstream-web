import type { NextApiRequest, NextApiResponse } from "next";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";

/**
 * Handler function for file upload API.
 * This function generates a signed URL for file upload to Google Cloud Storage.
 * 
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse<SignedPostPolicyV4Output | string>} res - The outgoing response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignedPostPolicyV4Output | string>
) {
  const { query, method } = req;
  
  // Check if the request method is POST, if not return a 405 status code.
  if (method !== "POST") {
    res.status(405).json("Method not allowed");
    return;
  }
  
  // Initialize Google Cloud Storage with project credentials.
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });
  
  // Get the bucket from the environment variables.
  const bucket = storage.bucket(process.env.BUCKET_NAME || '');
  
  // Get the file from the request query.
  const file = bucket.file(query.file as string);
  
  // Set the options for the signed URL.
  const options = {
    expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
    fields: { "x-goog-meta-source": "nextjs-project" },
  };
  
  // Generate the signed URL.
  const [response] = await file.generateSignedPostPolicyV4(options);
  
  // Return the signed URL in the response.
  res.status(200).json(response);
}