import React from 'react'
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'

interface CheckEmailDialogProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckEmailDialog: React.FC<CheckEmailDialogProps> = ({ setIsDialogOpen }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmation Email Sent</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Please check your email to confirm your account.
      </DialogDescription>
      <DialogFooter>
        <Button fullWidth onClick={() => setIsDialogOpen(false)}>Close</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default CheckEmailDialog