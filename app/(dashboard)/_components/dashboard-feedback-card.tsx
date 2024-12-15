'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { IFeedback } from '@/types/feedback';
import {
  ChevronUp,
  MessageCircle,
  MoreHorizontal,
  PencilLine,
  Trash2,
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteFeedback from './delete-feedback';
import { EditDashboardFeedback } from './add-edit-dashboard-feedback';

type FeedbackCardProps = {
  feedback: IFeedback;
};

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const { slug } = useParams() as { slug: string };
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const tagColors = [
    {
      name: 'Gray',
      tagClass: 'bg-gray-50 text-gray-600 border border-gray-200',
      buttonClass: 'bg-gray-500',
    },
    {
      name: 'Red',
      tagClass: 'bg-red-50 text-red-600 border border-red-200',
      buttonClass: 'bg-red-500',
    },
    {
      name: 'Orange',
      tagClass: 'bg-orange-50 text-orange-600 border border-orange-200',
      buttonClass: 'bg-orange-500',
    },
    {
      name: 'Cyan',
      tagClass: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
      buttonClass: 'bg-cyan-500',
    },
    {
      name: 'Green',
      tagClass: 'bg-green-50 text-green-600 border border-green-200',
      buttonClass: 'bg-green-500',
    },
    {
      name: 'Blue',
      tagClass: 'bg-blue-50 text-blue-600 border border-blue-200',
      buttonClass: 'bg-blue-500',
    },
    {
      name: 'Yellow',
      tagClass: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
      buttonClass: 'bg-yellow-500',
    },
    {
      name: 'Purple',
      tagClass: 'bg-purple-50 text-purple-600 border border-purple-200',
      buttonClass: 'bg-purple-500',
    },
  ];

  // const [canEdit, setCanEdit] = useState<boolean>(false);
  // const [upvotes, setUpvotes] = useState<number>(feedback._count.upvotes);
  // const [status, setStatus] = useState<string>(feedback.status);

  // const { data: session } = useSession();

  // const queryClient = useQueryClient();

  // const upvoteFeedbackMutation = useMutation({
  //   mutationFn: upvoteFeedback,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     setUpvoted(!upvoted);
  //     setUpvotes((prev) => prev - 1);
  //   },
  // });

  // const undovoteFeedbackMutation = useMutation({
  //   mutationFn: undovoteFeedback,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['feedbacks', slug] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // useEffect(() => {
  //   const hasUpvoted = feedback.upvotes.some(
  //     (upvote) => upvote.upvoterId === session?.user?.id
  //   );
  //   setUpvoted(hasUpvoted);
  // }, [feedback.upvotes, session?.user?.id]);

  // useEffect(() => {
  //   setCanEdit(path === `/b/${slug}/admin`);
  // }, [path, slug]);

  // const handleUpvoteAndUndovote = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setUpvoted(!upvoted);
  //   if (upvoted) {
  //     undovoteFeedbackMutation.mutate({
  //       slug,
  //       feedbackId: feedback.id,
  //     });
  //     setUpvotes((prev) => prev - 1);
  //   } else {
  //     upvoteFeedbackMutation.mutate({
  //       slug,
  //       feedbackId: feedback.id,
  //     });
  //     setUpvotes((prev) => prev + 1);
  //   }
  // };

  return (
    <div className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative border">
      <div className="space-y-3">
        {feedback.tags.length > 0 && (
          <div className="flex items-center gap-1.5">
            {feedback.tags.map((tag) => (
              <div
                key={tag.tag.name}
                className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-sm',
                  tagColors.find(
                    (color) =>
                      color.name.toLowerCase() === tag.tag.color.toLowerCase()
                  )?.tagClass
                )}
              >
                {tag.tag.name}
              </div>
            ))}
          </div>
        )}
        <div
          className="space-y-0.5 group cursor-pointer"
          onClick={() =>
            router.push(`${pathname}?f=${feedback.id}`, { scroll: false })
          }
        >
          <h3 className="font-medium group-hover:text-primary transition-all">
            {feedback.title}
          </h3>
          <p
            className="feedback--desc text-muted-foreground text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: feedback.description }}
          ></p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            className={cn(
              'flex gap-1.5 items-center text-xs font-bold rounded-lg py-1.5 px-3 bg-primary/10 hover:bg-primary/20 transition-all',
              upvoted && 'bg-primary text-white hover:bg-primary/80'
            )}
          >
            <ChevronUp
              className={cn('size-4 text-primary', upvoted && 'text-white')}
              strokeWidth={3}
            />
            <span>{feedback._count.upvotes}</span>
          </button>
          <div className="flex items-center gap-1">
            <MessageCircle className="size-4 text-muted-foreground" />
            <span className="font-semibold text-xs">
              {feedback._count.comments}
            </span>
          </div>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="font-medium"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditDialogOpen(true);
              }}
            >
              <PencilLine className="size-4 mr-2 text-muted-foreground" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeleteFeedback
        feedbackId={feedback.id}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={() => setIsDeleteDialogOpen(false)}
      />
      <EditDashboardFeedback
        feedbackId={feedback.id}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={() => setIsEditDialogOpen(false)}
      />
    </div>
  );
};

export const FeedbackCardSkeleton = () => {
  return (
    <div className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative border">
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
        <div className="space-y-0.5">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-56 h-4" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Skeleton className="w-14 h-7 rounded-lg" />
          <Skeleton className="size-7 rounded-lg" />
        </div>
        <Skeleton className="size-9 rounded-lg" />
      </div>
    </div>
  );
};
