import React from 'react';
import CopyLinkButton from './copy-link-button';
import { ThumbsUp } from 'lucide-react';
import Link from 'next/link';

const BoardCard = () => {
  return (
    <Link
      href="#"
      className="p-6 bg-background rounded-lg shadow transition-all hover:shadow-md relative flex flex-col justify-between space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-green-50 rounded-full text-center font-medium uppercase grid items-center text-green-600">
            BO
          </div>
          <div>
            <h2 className="max-w-48 truncate text-base md:text-lg font-semibold leading-5">
              Boardname
            </h2>
            <p className="text-muted-foreground max-w-48 truncate">boardname</p>
          </div>
        </div>
        <CopyLinkButton value="temp" />
      </div>
      <div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <ThumbsUp className="w-4 h-4" />
          <span className="whitespace-nowrap text-sm">6 feedbacks</span>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
