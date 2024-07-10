import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';

type BackButtonProps = {};

const BackButton = ({}: BackButtonProps) => {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  return (
    <Button
      variant={'ghost'}
      className="font-semibold p-0 group hover:underline"
      onClick={() => router.back()}
    >
      <div
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'mr-3 group-hover:bg-mute'
        )}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      </div>
      Go back
    </Button>
  );
};

export default BackButton;
