"use client";

import React, { useState } from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import AudioDropzone from './dropzone';
import { Input } from '../ui/input';
import CategorySelect from './category-select';
import { IconUpload } from '../ui/icons';

interface AudioUploadDialogProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioUploadDialog: React.FC<AudioUploadDialogProps> = ({ setIsDialogOpen }) => {
  
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const handleUpload = () => {
    console.log('Upload successful.');
  }

  return (
    <DialogContent className='flex flex-col spacing-y-6 rounded'>
      <DialogHeader className='mb-4'>
        <DialogTitle>Upload Audio File</DialogTitle>
      </DialogHeader>
      <DialogDescription className='rounded'>
        <Input placeholder="File name" className='my-2 border rounded' />
        <AudioDropzone onDrop={handleDrop} files={files} />
        <CategorySelect />
      </DialogDescription>
      <DialogFooter>
        <Button fullWidth onClick={handleUpload}>{<IconUpload className="mr-1" />} Upload</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default AudioUploadDialog