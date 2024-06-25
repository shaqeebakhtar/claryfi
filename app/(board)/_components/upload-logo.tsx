'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FileUpload } from '../../../components/file-upload';

const UploadLogo = () => {
  const [image, setImage] = useState<string | null>();

  return (
    <div className="rounded-lg border border-gray-200 bg-background">
      <div className="flex flex-col space-y-6 p-5 sm:p-10">
        <div className="space-y-2">
          <h2 className="text-xl font-medium">Board Logo</h2>
          <p className="text-sm text-muted-foreground">
            This is the logo of your board on Claryfi
          </p>
        </div>
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
      </div>

      <div className="flex items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
        <p className="text-sm text-muted-foreground">
          Accepted file types: .png, .jpg. Max file size: 2MB.
        </p>
        <div className="shrink-0">
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default UploadLogo;
