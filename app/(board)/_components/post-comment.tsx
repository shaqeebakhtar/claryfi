import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader } from 'lucide-react';
import { useState } from 'react';

const PostComment = () => {
  const [comment, setComment] = useState('');

  const onSubmit = () => {};

  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-4">
      <h3 className="font-bold text-base md:text-lg">Post Comment</h3>
      <form onSubmit={onSubmit} className="space-y-5">
        <Textarea
          className="shadow-none bg-muted font-medium min-h-24 max-h-40 p-3"
          placeholder="Add your response"
          maxLength={255}
          onChange={(e) => setComment(e.currentTarget.value.trim())}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground break-words">
            {255 - comment.length} characters left
          </span>
          <Button size={'lg'} type="submit" disabled={!comment}>
            {false && <Loader className="w-4 h-4 mr-1.5 animate-spin" />}
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
