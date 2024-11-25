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
import { Plus } from 'lucide-react';
import { AddDashboardFeedbackForm } from './add-dashboard-feedback-form';
import { useState } from 'react';

export const AddDashboardFeedback = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={'lg'}>
          <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} />
          Add feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle>Add Feedback</DialogTitle>
          <DialogDescription>
            Submit a new feature request/suggestion to improve our product.
          </DialogDescription>
        </DialogHeader>
        <AddDashboardFeedbackForm closeDialog={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
