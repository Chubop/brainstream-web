import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Makes a POST request to the specified URL with the given body.
 * 
 * @param {string} url - The URL to which the POST request is made.
 * @param {object} body - The body of the POST request.
 * @returns {Promise<any>} - The response from the POST request.
 */
export async function makePostRequest(url: string, body: object) {
    // Use the fetcher function with POST method and JSON headers
    return await fetcher(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

/**
 * Validates that all required parameters are present in the params object.
 * 
 * @param {any} params - The object containing parameters to validate.
 * @param {string[]} requiredParams - An array of strings representing the keys of required parameters.
 * @throws {Error} - Throws an error if any required parameter is missing.
 */
export function validateRequestParams(params: any, requiredParams: string[]) {
    // Iterate over required parameters and check for their presence in the params object
    for (const param of requiredParams) {
        if (!params[param]) {
            // If a required parameter is missing, throw an error with a message indicating which parameters are expected
            throw new Error(`Missing request body parameter (expecting ${requiredParams.join(' and ')})`);
        }
    }
}

/**
 * Creates and configures a Google Cloud Storage instance.
 * 
 * @returns {Storage} - The configured Google Cloud Storage instance.
 */
export function createStorage() {
  // Create a new Storage instance
  const storage = new Storage();

  // Set the project ID from the environment variables
  storage.projectId = process.env.PROJECT_ID;

  // Set the credentials from the environment variables
  // Note: The private key is sanitized to replace escaped newlines with actual newlines
  storage.credentials = {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  // Return the configured Storage instance
  return storage;
}
