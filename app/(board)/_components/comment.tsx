import { Button } from '@/components/ui/button';
import { ReplyIcon } from 'lucide-react';
import React from 'react';

const Comment = () => {
  return (
    <li className="pt-6 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-full bg-muted grid place-items-center font-semibold text-muted-foreground text-sm">
            HO
          </div>
          <div className="space-y-0.5">
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-xs text-muted-foreground font-semibold">
              2 months ago
            </p>
          </div>
        </div>
        <Button
          size={'sm'}
          variant={'ghost'}
          className="text-primary font-bold"
        >
          <ReplyIcon className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
          Reply
        </Button>
      </div>
      <p className="text-sm text-muted-foreground sm:ml-[60px]">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, ab!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla sed
        consequatur qui omnis consequuntur id sapiente iusto accusamus
      </p>
    </li>
  );
};

export default Comment;
