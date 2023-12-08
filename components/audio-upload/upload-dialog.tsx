"use client";

import React, { useEffect, useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import AudioDropzone from './dropzone';
import { Input } from '../ui/input';
import CategorySelect from './category-select';
import { IconSpinner, IconUpload } from '../ui/icons';
import useFileUpload from '@/lib/hooks/use-file-upload';
import UploadAlert from './upload-alert';
import { toast } from 'react-hot-toast';

interface AudioUploadDialogProps {}

const AudioUploadDialog: React.FC<AudioUploadDialogProps> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const MAX_FILE_SIZE_MB = 100;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const { uploadFile } = useFileUpload();

  useEffect(() => {
    if (files.length > 0) {
      const nameWithoutExtension = files[0].name.replace(/\.[^/.]+$/, "");
      setFileName(nameWithoutExtension);
    }
  }, [files]);

  const handleDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setAlertMessage(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
      setShowUploadAlert(true);
    } else {
      setFiles(acceptedFiles);
    }
  }, []);

  const handleUpload = async () => {
    setIsLoading(true);
    if (files.length > 0) {
      const uploadSuccessful = await uploadFile(files[0], fileName);
      if (!uploadSuccessful) {
        setAlertMessage("Upload failed. Please try again.");
        setShowUploadAlert(true);
      }
      else{
        toast.success("File was uploaded successfully.");
      }
    }
    setIsLoading(false);
  };

  const closeUploadAlert = () => {
    setShowUploadAlert(false);
  }

  return (
    <React.Fragment>
      <DialogContent className='flex flex-col spacing-y-6 rounded'>
        <DialogHeader className='mb-4'>
          <DialogTitle>Upload Audio File</DialogTitle>
        </DialogHeader>
        <DialogDescription className='rounded'>
          <Input placeholder="File name" value={fileName} className='my-2 border rounded' onChange={(e) => setFileName(e.target.value)} />
          <AudioDropzone onDrop={handleDrop} files={files} />
          <CategorySelect />
        </DialogDescription>
        <DialogFooter>
          <Button 
            fullWidth 
            onClick={handleUpload}
          >
            {isLoading ? 
              <IconSpinner className="mr-1 animate-spin" /> 
              : 
              <IconUpload className="mr-1" />}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
      <UploadAlert isOpen={showUploadAlert} onDismiss={closeUploadAlert} message={alertMessage} />
    </React.Fragment>
  
  )
}

export default AudioUploadDialog;