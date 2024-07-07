import React from 'react';
import Comment from './comment';

const Comments = () => {
  return (
    <div className="p-6 sm:p-8 bg-background rounded-xl shadow space-y-2">
      <h3 className="font-bold text-base md:text-lg">3 Comments</h3>
      <ul className="divide-y-2 space-y-6">
        <Comment />
        <Comment />
        <Comment />
      </ul>
    </div>
  );
};

export default Comments;
