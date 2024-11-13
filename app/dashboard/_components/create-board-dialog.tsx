'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateBoardForm from './create-board-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const CreateBoardDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="gap-2 p-2"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Create board
          </div>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>
            Collect feedbacks and prioritize what really matter to your business
            and customers.
          </DialogDescription>
        </DialogHeader>
        <CreateBoardForm closeDialog={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardDialog;
