import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

type BackButtonProps = {};

const BackButton = ({}: BackButtonProps) => {
  return (
    <Button variant={'secondary'} className="font-normal">
      <ChevronLeft className="w-4 h-4 mr-0.5" strokeWidth={3} />
      Go back
    </Button>
  );
};

export default BackButton;
