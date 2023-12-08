import * as React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

// Props definition for the UploadAlert component
interface UploadAlertProps {
    isOpen: boolean;
    onDismiss: () => void;
    message: string; // Add a message prop
  }

// UploadAlert component definition
const UploadAlert: React.FC<UploadAlertProps> = ({ isOpen, onDismiss, message }) => {
    return (
    // AlertDialog component to show upload status
    <AlertDialog open={isOpen} onOpenChange={onDismiss}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Open Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction asChild>
          <Button onClick={onDismiss}>Okay</Button>
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Export the UploadAlert component
export default UploadAlert;