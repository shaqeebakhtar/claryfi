import Link from 'next/link';
import React from 'react';

const ChangelogCard = () => {
  return (
    <div className="sm:flex-1 lg:flex-grow-0 p-4 sm:p-5 bg-background border rounded-md shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold">Changelog</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            Recent updates
          </p>
        </div>
        <Link
          href={'/roadmap'}
          className="text-xs text-primary underline underline-offset-2 py-1"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ChangelogCard;
