import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { undovoteFeedback, upvoteFeedback } from '@/services/feedback';
import { IFeedback } from '@/types/feedback';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const RoadmapFeedbackCard = ({ feedback }: { feedback: IFeedback }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { slug } = useParams() as { slug: string };
  const { data: session } = useSession();
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [upvotes, setUpvotes] = useState<number>(feedback._count.upvotes);

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

  console.log(feedback);
  useEffect(() => {
    const hasUpvoted = feedback.upvotes.some(
      (upvote) => upvote.upvoterId === session?.user?.id
    );
    setUpvoted(hasUpvoted);
  }, [feedback, session?.user?.id]);

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
        feedbackId: feedback.id,
      });
    } else {
      setUpvotes((prev) => prev + 1);
      upvoteFeedbackMutation.mutate({
        slug,
        feedbackId: feedback.id,
      });
    }
  };

  return (
    <div
      className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative"
      key={feedback.id}
    >
      <div className="space-y-3">
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
        <div
          className="space-y-0.5 group cursor-pointer"
          onClick={() =>
            router.push(`${pathname}?f=${feedback.id}`, {
              scroll: false,
            })
          }
        >
          <h3 className="font-medium group-hover:text-primary transition-all">
            {feedback.title}
          </h3>
          <p
            className="feedback--desc text-muted-foreground text-sm line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: feedback.description,
            }}
          ></p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={cn(
            'flex gap-1.5 items-center text-xs font-bold rounded-lg py-1.5 px-3 bg-primary/10 hover:bg-primary/20 transition-all',
            upvoted && 'bg-primary text-white hover:bg-primary/80'
          )}
          onClick={handleUpvoteAndUndovote}
        >
          <ChevronUp
            className={cn('size-4 text-primary', upvoted && 'text-white')}
            strokeWidth={3}
          />
          <span>{upvotes}</span>
        </button>
        <div className="flex items-center gap-1">
          <MessageCircle className="size-4 text-muted-foreground" />
          <span className="font-semibold text-xs">
            {feedback._count.comments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapFeedbackCard;

export const RoadmapFeedbackCardSkeleton = () => {
  return (
    <div className="mt-2 p-4 sm:p-5 bg-background rounded-md flex flex-col gap-4 relative">
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
        <Skeleton className="w-14 h-7 rounded-lg" />
        <Skeleton className="size-7 rounded-lg" />
      </div>
    </div>
  );
};
