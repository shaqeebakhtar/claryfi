'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateBoardForm from './create-board-form';
import { useState } from 'react';

const CreateBoardDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size={'lg'}>Create Board</Button>
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
