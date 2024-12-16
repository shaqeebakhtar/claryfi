import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { undovoteFeedback, upvoteFeedback } from '@/services/feedback';
import { getFeedbackById } from '@/services/open/feedback';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';
import { ChevronUp, Share2Icon, UserRound, XIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Comment from './comment';
import FeedbackCardStatus from './feedback-card-status';
import PostComment from './post-comment';

const FeedbackDisplaySheet = ({ feedbackId }: { feedbackId: string }) => {
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [upvotes, setUpvotes] = useState<number>(0);

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

  const { data: feedback, isLoading } = useQuery({
    queryKey: ['feedback', feedbackId],
    queryFn: () => getFeedbackById({ slug, feedbackId }),
  });

  useEffect(() => {
    if (!isLoading && feedback) {
      setUpvotes(feedback._count.upvotes);
      const hasUpvoted = feedback?.upvotes.some(
        (upvote) => upvote.upvoterId === session?.user?.id
      );
      setUpvoted(hasUpvoted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, session?.user?.id]);

  const upvoteFeedbackMutation = useMutation({
    mutationFn: upvoteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [slug, 'feedbacks'] });
    },
    onError: () => {
      toast.error('Failed to upvote');
      setUpvoted(!upvoted);
      setUpvotes((prev) => prev - 1);
    },
  });

  const undovoteFeedbackMutation = useMutation({
    mutationFn: undovoteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [slug, 'feedbacks'] });
    },
    onError: () => {
      toast.error('Failed to remove vote');
    },
  });

  const handleUpvoteAndUndovote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!session?.user) {
      toast.info('You need to be logged in to upvote');
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setUpvoted(!upvoted);
    if (upvoted) {
      setUpvotes((prev) => prev - 1);
      undovoteFeedbackMutation.mutate({
        slug,
        feedbackId,
      });
    } else {
      setUpvotes((prev) => prev + 1);
      upvoteFeedbackMutation.mutate({
        slug,
        feedbackId,
      });
    }
  };

  if (isLoading || !feedback) return;

  return (
    <Sheet
      open={!!feedbackId}
      onOpenChange={() => router.replace(pathname, { scroll: false })}
    >
      <SheetContent className="sm:max-w-[450px] h-auto rounded-md p-0 overflow-hidden [&>button]:hidden">
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background">
            <SheetClose asChild className="absolute right-4 top-4 rounded-full">
              <Button size="icon" variant="outline" className="size-6">
                <XIcon className="size-3" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
            <SheetHeader className="px-6 pt-6">
              <div className="flex items-center gap-3">
                <FeedbackCardStatus
                  status={feedback?.status as string}
                  className="text-sm"
                />
                {feedback && feedback?.tags.length > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                      {feedback?.tags.map((tag) => (
                        <div
                          key={tag.tag.name}
                          className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-sm',
                            tagColors.find(
                              (color) =>
                                color.name.toLowerCase() ===
                                tag.tag.color.toLowerCase()
                            )?.tagClass
                          )}
                        >
                          {tag.tag.name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <SheetTitle className="text-xl text-left">
                {feedback?.title}
              </SheetTitle>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Avatar className="size-6 rounded-full">
                  <AvatarImage src={feedback?.user?.image as string} />
                  <AvatarFallback>
                    <UserRound className="size-4 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <span>{feedback?.user?.name || 'Anonymous'}</span>
                <span>•</span>
                <span>
                  {feedback &&
                    formatDistance(
                      new Date(feedback?.createdAt as Date),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                </span>
              </div>
            </SheetHeader>
            <div className="px-6 pt-4 pb-5 space-y-5 border-b border-b-gray-100">
              <p
                className="feedback--desc text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: feedback?.description as string,
                }}
              ></p>
              <div className="flex items-center justify-between">
                <Button
                  className={cn(
                    'w-max flex gap-1.5 items-center text-xs font-bold rounded-lg py-2 px-3 bg-primary/10 hover:bg-primary/20 transition-all text-foreground shadow-none',
                    upvoted && 'bg-primary text-white hover:bg-primary/80'
                  )}
                  size="sm"
                  onClick={handleUpvoteAndUndovote}
                >
                  <ChevronUp
                    className={cn(
                      'size-4 text-primary',
                      upvoted && 'text-white'
                    )}
                    strokeWidth={3}
                  />
                  <span>{upvotes}</span>
                </Button>
                <Button size="sm" variant="secondary" className="shadow-none">
                  <Share2Icon className="w-4 h-4 text-muted-foreground mr-2" />
                  Share
                </Button>
              </div>
            </div>
            <PostComment feedbackId={feedbackId} />
            <Separator className="bg-gray-100" />
            <div className="px-6 py-5 space-y-5">
              <h3 className="font-semibold">
                Comments
                <span className="px-2.5 py-0.5 border rounded-full text-xs font-semibold ml-3">
                  {feedback?._count.comments}
                </span>
              </h3>
            </div>
          </div>
          <div className="space-y-5 px-6 pb-6">
            {feedback.comments.length > 0 ? (
              feedback.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FeedbackDisplaySheet;
