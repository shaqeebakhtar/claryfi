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
import { AddDashboardFeedbackForm } from './add-edit-dashboard-feedback-form';

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

export const EditDashboardFeedback = ({
  feedbackId,
  isDialogOpen,
  setIsDialogOpen,
}: {
  feedbackId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: () => void;
}) => {
  return (
    <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <ModalContent className="sm:max-w-lg">
        <ModalHeader>
          <ModalTitle>Edit Feedback</ModalTitle>
          <ModalDescription>
            Update your feedback to share new ideas or suggestions.
          </ModalDescription>
        </ModalHeader>
        <AddDashboardFeedbackForm
          closeDialog={setIsDialogOpen}
          feedbackId={feedbackId}
        />
      </ModalContent>
    </Modal>
  );
};
