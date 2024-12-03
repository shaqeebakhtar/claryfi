'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteBoard } from '@/data-access/board';
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Board</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="font-medium">
            Are you sure, you want to delete this board?
          </DialogTitle>
          <DialogDescription>
            Deleting your board will permanently delete all the feedbacks and
            others things associated with it. This action cannot be undone -
            please proceed with caution.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No, Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteBoardMutation.mutate({ slug })}
          >
            {deleteBoardMutation.isPending && (
              <Loader className="w-4 h-4 mr-1.5 animate-spin" />
            )}
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoardDialog;
