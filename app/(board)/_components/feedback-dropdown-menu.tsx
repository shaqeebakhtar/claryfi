import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteFeedback, updateFeedbackStatus } from '@/data-access/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreVertical, PencilLine, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

type FeedbackDropdownMenuProps = {
  feedbackId: string;
  status: string;
  changeStatus: (value: string) => void;
};

const FeedbackDropdownMenu = ({
  feedbackId,
  status,
  changeStatus,
}: FeedbackDropdownMenuProps) => {
  const { slug } = useParams() as { slug: string };

  const queryClient = useQueryClient();

  const deleteFeedbackMutation = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      toast.success('The feedback has been deleted');
      queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateFeedbackStatusMutation = useMutation({
    mutationFn: updateFeedbackStatus,
    onSuccess: () => {
      toast.success('The feedback has been updated');
      queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    deleteFeedbackMutation.mutate({ slug, feedbackId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="rounded-sm w-8 hover:bg-muted"
        >
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center">
          <PencilLine className="w-4 h-4 mr-2" />
          Update Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => {
            changeStatus(value);
            updateFeedbackStatusMutation.mutate({
              slug,
              feedbackId,
              status: value,
            });
          }}
        >
          <DropdownMenuRadioItem value="NEW">New</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="CANCELLED">
            Cancelled
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="IN_PROGRESS">
            In Progress
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="LIVE">Live</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={(e) => handleDelete(e)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FeedbackDropdownMenu;
