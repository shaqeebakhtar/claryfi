import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import FeedbackDialogForm from './feedback-dialog-form';

const AddFeedbackDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'lg'}>
          <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} />
          Add feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle>Create New Feedback</DialogTitle>
          <DialogDescription>
            Submit a new feature request/suggestion to improve our product.
          </DialogDescription>
        </DialogHeader>
        <FeedbackDialogForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddFeedbackDialog;
