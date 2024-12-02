'use client';
import { Button } from '@/components/ui/button';
import { absoluteUrl } from '@/lib/utils';
import { Check, Copy, Share2 } from 'lucide-react';
import React, { useState } from 'react';

type CopyLinkButtonProps = {
  value: string;
};

const CopyLinkButton = ({ value }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setCopied(true);
        navigator.clipboard.writeText(absoluteUrl(value));
        setTimeout(() => setCopied(false), 3000);
      }}
      variant={'secondary'}
      className="group/copy transition-all"
    >
      {copied ? (
        <Check className="w-4 h-4 mr-2" />
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2 group-hover/copy:hidden" />
          <Copy className="w-4 h-4 mr-2 hidden group-hover/copy:block" />
        </>
      )}
      <span className="">Share</span>
    </Button>
  );
};

export default CopyLinkButton;
