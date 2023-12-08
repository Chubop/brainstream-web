// useFileUpload.ts
import { useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const useFileUpload = () => {
  const [status, setStatus] = useState<UploadStatus>('idle');


  const uploadFile = async (file: File, fileName: string): Promise<boolean> => {
    setStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);
    const fileExtension = file.name.split('.').pop();
    const fullFileName = fileName + (fileExtension ? '.' + fileExtension : '');
    formData.append('fileName', fullFileName);
  
    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      setStatus('success');
      return true; // Return true when the upload is successful
    } catch (error) {
      setStatus('error');
      console.error('Upload error:', error);
      return false; // Return false when the upload fails
    }
  };

  return { uploadFile, status };
};

export default useFileUpload;
