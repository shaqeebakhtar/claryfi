'use client';
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddPublicFeedbackForm from './add-public-feedback-form';

const AddPublicFeedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
      <ModalTrigger asChild>
        <Button>
          <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} />
          Add feedback
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-lg">
        <ModalHeader className="mb-2">
          <ModalTitle>Add Feedback</ModalTitle>
          <ModalDescription>
            Submit a new feature request/suggestion.
          </ModalDescription>
        </ModalHeader>
        <AddPublicFeedbackForm closeDialog={() => setIsModalOpen(false)} />
      </ModalContent>
    </Modal>
  );
};

export default AddPublicFeedback;
