// useFileUpload.ts
import { useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const useFileUpload = () => {
  const [status, setStatus] = useState<UploadStatus>('idle');


  const uploadFile = async (file: File, fileName: string) => {
    setStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);
    if (fileName) {
      formData.append('fileName', fileName);
    }

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.error('Upload error:', error);
    }
  };

  return { uploadFile, status };
};

export default useFileUpload;
