"use client";

import React, { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import AudioDropzone from './dropzone';
import { Input } from '../ui/input';
import CategorySelect from './category-select';
import { IconSpinner, IconUpload } from '../ui/icons';
import { useFileUpload } from '@/lib/hooks/use-file-upload';

interface AudioUploadDialogProps {}

const AudioUploadDialog: React.FC<AudioUploadDialogProps> = ({ }) => {
  
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileUpload = useFileUpload();

  const handleDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const handleUpload = async () => {
    setIsLoading(true);
    if (files.length > 0) {
      // use the hook to upload the file
      const uploadSuccessful = await fileUpload(fileName, files[0]);
      console.log('Upload successful:', uploadSuccessful);
    }
    setIsLoading(false);
  }

  return (
    <DialogContent className='flex flex-col spacing-y-6 rounded'>
      <DialogHeader className='mb-4'>
        <DialogTitle>Upload Audio File</DialogTitle>
      </DialogHeader>
      <DialogDescription className='rounded'>
        <Input placeholder="File name" className='my-2 border rounded' onChange={(e) => setFileName(e.target.value)} />
        <AudioDropzone onDrop={handleDrop} files={files} />
        <CategorySelect />
      </DialogDescription>
      <DialogFooter>
        <Button 
        fullWidth 
        onClick={handleUpload}>{
          isLoading ? 
          <IconSpinner className="mr-1 animate-spin" /> 
          : 
          <IconUpload className="mr-1" />}
          Upload
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default AudioUploadDialog