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
import { getTagsByBoardSlug } from '@/services/admin/tag';
import { Tag as TTag } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { MoreHorizontal, PencilLine, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { CreateTag, DeleteTag, EditTag } from './create-edit-tag';

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
            <DropdownMenuItem
              className="font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteDialogOpen(true);
              }}
            >
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
      <DeleteTag
        tagId={tag.id}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={() => setIsDeleteDialogOpen(false)}
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
