'use client';
import { Button } from '@/components/ui/button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/responsive-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddDashboardFeedbackForm } from './add-dashboard-feedback-form';

export const AddDashboardFeedback = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <ModalTrigger asChild>
        <Button>
          <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} />
          Add feedback
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-lg">
        <ModalHeader>
          <ModalTitle>Add Feedback</ModalTitle>
          <ModalDescription>
            Submit a new feature request/suggestion.
          </ModalDescription>
        </ModalHeader>
        <AddDashboardFeedbackForm closeDialog={() => setIsDialogOpen(false)} />
      </ModalContent>
    </Modal>
  );
};
