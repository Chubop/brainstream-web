export function useFileUpload() {
  // This hook function is used to upload a file
  return async (filename: string, file: File) => {
    // Log the filename and file for debugging purposes
    // Send a POST request to get the upload URL from the server
    const result = await fetch(`/api/files?file=${filename}`);
    // Extract the URL and fields from the server response
    const { url, fields } = await result.json();
    // Create a new FormData object for the file upload
    const formData = new FormData();
    // Append the fields and file to the FormData object
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    // Send a POST request to the upload URL with the FormData
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });
    // Return true if the upload was successful
    return upload.ok;
  };
}
