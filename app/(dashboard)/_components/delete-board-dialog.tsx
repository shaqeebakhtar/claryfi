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
import { deleteBoard } from '@/services/admin/board';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DeleteBoardDialog = () => {
  const { slug } = useParams() as { slug: string };

  const router = useRouter();

  const queryClient = useQueryClient();

  const deleteBoardMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      toast.success('Your board has been deleted');
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Board</Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-lg p-4">
        <ModalHeader className="mb-2 px-0">
          <ModalTitle className="font-medium">
            Are you sure, you want to delete this board?
          </ModalTitle>
          <ModalDescription>
            Deleting your board will permanently delete all the feedbacks and
            others things associated with it. This action cannot be undone -
            please proceed with caution.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter className="sm:justify-end gap-2">
          <ModalClose asChild>
            <Button type="button" variant="secondary">
              No, Cancel
            </Button>
          </ModalClose>
          <Button
            variant="destructive"
            onClick={() => deleteBoardMutation.mutate({ slug })}
          >
            {deleteBoardMutation.isPending && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            Yes, Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBoardDialog;
