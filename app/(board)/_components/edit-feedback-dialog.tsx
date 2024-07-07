'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Feedback } from '@prisma/client';
import { PencilLine } from 'lucide-react';
import { useState } from 'react';
import EditFeedbackDialogForm from './edit-feedback-dialog-form';

type EditFeedbackDialogProps = {
  feedback: Feedback;
};

const EditFeedbackDialog = ({ feedback }: EditFeedbackDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={'lg'}>
          <PencilLine className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} />
          Edit feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle>Edit Your Feedback</DialogTitle>
          <DialogDescription>
            Submit a new feature request/suggestion to improve our product.
          </DialogDescription>
        </DialogHeader>
        <EditFeedbackDialogForm
          closeDialog={() => setIsDialogOpen(false)}
          feedback={feedback}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditFeedbackDialog;
