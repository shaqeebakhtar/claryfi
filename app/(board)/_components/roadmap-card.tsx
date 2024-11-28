import Link from 'next/link';
import React from 'react';

const RoadmapCard = () => {
  return (
    <div className="sm:flex-1 lg:flex-grow-0 p-4 sm:p-5 bg-background border rounded-md shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold">Roadmap</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            Upcoming features and fixes
          </p>
        </div>
        <Link
          href={'/roadmap'}
          className="text-xs text-primary underline underline-offset-2 py-1"
        >
          View
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
            <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-emerald-400"></div>
            <span className="mt-0.5">Approved</span>
          </div>
          <span className="bg-muted px-2.5 py-0.5 border rounded-full text-xs font-semibold">
            2
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
            <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-violet-400"></div>
            <span className="mt-0.5">In Progress</span>
          </div>
          <span className="bg-muted px-2.5 py-0.5 border rounded-full text-xs font-semibold">
            5
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm leading-none font-medium w-max text-muted-foreground">
            <div className="relative inline-flex rounded-full h-2.5 w-2.5 aspect-square bg-blue-400"></div>
            <span className="mt-0.5">Done</span>
          </div>
          <span className="bg-muted px-2.5 py-0.5 border rounded-full text-xs font-semibold">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
