import { TextEditor } from '@/components/text-editor';
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
import { getFeedbackById } from '@/services/open/feedback';
import { useQuery } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';
import {
  ChevronUp,
  PencilLineIcon,
  Share2Icon,
  ThumbsUpIcon,
  XIcon,
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import FeedbackCardStatus from './feedback-card-status';

const FeedbackDisplaySheet = ({ feedbackId }: { feedbackId: string }) => {
  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const tagColors = [
    {
      name: 'Gray',
      tagClass: 'bg-gray-100 text-gray-600',
      buttonClass: 'bg-gray-500',
    },
    {
      name: 'Red',
      tagClass: 'bg-red-100 text-red-600',
      buttonClass: 'bg-red-500',
    },
    {
      name: 'Orange',
      tagClass: 'bg-orange-100 text-orange-600',
      buttonClass: 'bg-orange-500',
    },
    {
      name: 'Cyan',
      tagClass: 'bg-cyan-100 text-cyan-600',
      buttonClass: 'bg-cyan-500',
    },
    {
      name: 'Green',
      tagClass: 'bg-green-100 text-green-600',
      buttonClass: 'bg-green-500',
    },
    {
      name: 'Blue',
      tagClass: 'bg-blue-100 text-blue-600',
      buttonClass: 'bg-blue-500',
    },
    {
      name: 'Yellow',
      tagClass: 'bg-yellow-100 text-yellow-600',
      buttonClass: 'bg-yellow-500',
    },
    {
      name: 'Purple',
      tagClass: 'bg-purple-100 text-purple-600',
      buttonClass: 'bg-purple-500',
    },
  ];

  const { data: feedback, isLoading } = useQuery({
    queryKey: ['feedback', feedbackId],
    queryFn: () => getFeedbackById({ slug, feedbackId }),
  });

  if (isLoading && !feedback) return null;

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
                <div className="size-6 rounded-full bg-muted"></div>
                <span>John Doe</span>
                <span>•</span>
                <span>
                  {formatDistance(
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
                    'w-max flex gap-1.5 items-center text-xs font-bold rounded-lg py-2 px-3 bg-primary/10 hover:bg-primary/20 transition-all text-foreground shadow-none'
                  )}
                  size="sm"
                >
                  <ChevronUp
                    className={cn('size-4 text-primary')}
                    strokeWidth={3}
                  />
                  <span>{feedback?._count.upvotes}</span>
                </Button>
                <div className="space-x-2.5">
                  <Button size="sm" variant="secondary" className="shadow-none">
                    <PencilLineIcon className="w-4 h-4 text-muted-foreground mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="secondary" className="shadow-none">
                    <Share2Icon className="w-4 h-4 text-muted-foreground mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative px-6 py-5">
              <TextEditor
                placeholder="Add a comment..."
                className={
                  '[&>.tiptap]:bg-gray-50 [&>.tiptap]:rounded-sm [&>.tiptap]:min-h-28 [&>.tiptap]:px-3 [&>.tiptap]:py-2 [&>.tiptap]:text-sm'
                }
              />
              <Button
                size="sm"
                className="absolute right-9 bottom-9 px-5"
                disabled
              >
                Post
              </Button>
            </div>
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
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FeedbackDisplaySheet;

const Comment = () => {
  return (
    <div>
      <div className="flex items-start space-x-3">
        <div className="size-8 rounded-full bg-muted"></div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center space-x-2 mt-1.5">
            <span className="text-sm text-foreground font-medium">
              John Doe
            </span>
            <span className="text-xs text-muted-foreground">Nov 15, 2024</span>
          </div>
          <div className="space-y-2 5">
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              ex rem itaque ad aliquam quia?
            </p>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                className="rounded-full px-2.5 h-6 shadow-none text-muted-foreground"
                variant="outline"
              >
                <ThumbsUpIcon className="size-3 mr-1" />
                25
              </Button>
              <Button
                size="sm"
                variant="link"
                className="hover:no-underline text-muted-foreground"
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
