'use client';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { deleteFeedbackById } from '@/services/admin/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const DeleteFeedback = ({
  feedbackId,
  isDialogOpen,
  setIsDialogOpen,
}: {
  feedbackId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: () => void;
}) => {
  const { slug } = useParams<{ slug: string }>();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteFeedbackById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [slug, 'feedbacks'] });
      toast.success('Feedback deleted successfully');
      setIsDialogOpen();
    },
    onError: () => {
      toast.error('Failed to delete Feedback');
    },
  });

  return (
    <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <ModalContent className="sm:max-w-md p-4 [&>button]:hidden">
        <ModalHeader className="mb-2">
          <ModalTitle className="font-medium">
            Are you sure, you want to delete this feedback?
          </ModalTitle>
          <ModalDescription>
            Deleting this feedback will remove it permanently and it cannot be
            recovered - please proceed with caution.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter className="sm:justify-end gap-2">
          <ModalClose asChild>
            <Button type="button" variant="secondary" className="shadow-none">
              No, Cancel
            </Button>
          </ModalClose>
          <Button
            disabled={isPending}
            onClick={() => mutate({ slug, feedbackId })}
            variant="destructive"
            className="shadow-none"
          >
            {isPending && <Loader className="size-4 mr-2 animate-spin" />}
            Yes, Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFeedback;
