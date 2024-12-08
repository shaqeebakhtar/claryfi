import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PencilLine, Trash2 } from 'lucide-react';
import { CreateTag } from './create-tag';

const ManageTags = () => {
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
        <TempTag />
        <TempTag />
        <TempTag />
        <TempTag />
      </div>
    </div>
  );
};

export default ManageTags;

const TempTag = () => {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex items-center gap-1.5 text-sm font-medium px-2 py-1 bg-blue-100 text-blue-600 rounded-sm">
        Feature
      </div>
      <div className="flex items-center gap-3">
        <div className="border rounded-sm text-sm px-2 py-1 text-muted-foreground">
          4 feedbacks
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-medium">
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
    </div>
  );
};
