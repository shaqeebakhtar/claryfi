'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FileUpload } from '../../../components/file-upload';

const UploadLogo = () => {
  const [image, setImage] = useState<string | null>();

  return (
    <div className="xl:space-x-3 pt-8">
      <div className="grid xl:grid-cols-4 space-y-0 gap-6 xl:gap-3 items-start">
        <div className="space-y-1">
          <h2 className="text-base font-medium">Board Logo</h2>
          <p className="text-sm text-muted-foreground">
            This is the logo of your board.
          </p>
        </div>
        <div className="col-span-2 flex gap-8 items-center justify-between">
          <FileUpload
            accept="images"
            className="h-24 w-24 rounded-full border border-gray-300"
            iconClassName="w-5 h-5"
            variant="plain"
            imageSrc={image}
            readFile
            onChange={({ src }) => setImage(src)}
            content={null}
            maxFileSizeMB={2}
          />
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default UploadLogo;
