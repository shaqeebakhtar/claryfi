import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const BoardSlug = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-background">
      <div className="flex flex-col space-y-6 p-5 sm:p-10">
        <div className="space-y-2">
          <h2 className="text-xl font-medium">Board Slug</h2>
          <p className="text-sm text-muted-foreground">
            This is the unique slug of your board on Claryfi to access your
            board.
          </p>
        </div>
        <Input className="w-2/3" placeholder="my-board" />
      </div>

      <div className="flex items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
        <p className="text-sm text-muted-foreground">
          Only lowercase letters, numbers, and dashes. Max 48 characters.
        </p>
        <div className="shrink-0">
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default BoardSlug;
