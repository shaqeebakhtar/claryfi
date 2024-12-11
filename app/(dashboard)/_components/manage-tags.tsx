'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PencilLine, Trash2 } from 'lucide-react';
import { CreateTag, EditTag } from './create-edit-tag';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getTagsByBoardSlug } from '@/services/admin/tag';
import { Skeleton } from '@/components/ui/skeleton';
import { Tag as TTag } from '@prisma/client';
import { cn, tagColors } from '@/lib/utils';
import { useState } from 'react';

const ManageTags = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: tags, isLoading } = useQuery({
    queryFn: () => getTagsByBoardSlug(slug),
    queryKey: [slug, 'tags'],
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1 max-w-xs">
          <h3 className="text-xl font-medium">Manage Tags</h3>
          <p className="text-sm text-muted-foreground">
            Create, edit, and organize tags to categorize and filter feedbacks
            more efficiently.
          </p>
        </div>
        <CreateTag />
      </div>
      <div className="space-y-3 divide-y divide-gray-100">
        {isLoading
          ? [...Array(5)].map((_, index) => <TagSkeleton key={index} />)
          : tags?.map((tag) => <Tag key={tag.id} tag={tag} />)}
      </div>
    </div>
  );
};

export default ManageTags;

const Tag = ({ tag }: { tag: TTag }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [tagClass, setTagClass] = useState(
    tagColors.find(
      (color) => color.name.toLowerCase() === tag.color.toLowerCase()
    )?.tagClass
  );

  return (
    <div className="flex items-center justify-between pt-3">
      <div
        className={cn(
          'flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-sm',
          tagClass
        )}
      >
        {tag.name}
      </div>
      <div className="flex items-center gap-3">
        <div className="border rounded-sm text-xs px-2 py-1 text-muted-foreground">
          4 feedbacks
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="font-medium"
              onClick={(e) => {
                e.preventDefault();
                setIsEditDialogOpen(true);
              }}
            >
              <PencilLine className="size-4 mr-2 text-muted-foreground" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-medium text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditTag
        tagId={tag.id}
        name={tag.name}
        color={tag.color}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={() => setIsEditDialogOpen(false)}
      />
    </div>
  );
};

const TagSkeleton = () => {
  return (
    <div className="flex items-center justify-between pt-3">
      <Skeleton className="w-20 h-8" />
      <div className="flex items-center gap-3">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="size-8" />
      </div>
    </div>
  );
};
