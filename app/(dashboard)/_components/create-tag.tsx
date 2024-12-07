'use client';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export const CreateTag = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Modal open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <ModalTrigger asChild>
        <Button>
          <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={3} />
          Create Tag
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-md">
        <ModalHeader className="mb-2">
          <ModalTitle>Create tag</ModalTitle>
          <ModalDescription>
            Tags can be use to manage and categorize your feedbacks
          </ModalDescription>
        </ModalHeader>
        <CreateTagForm />
      </ModalContent>
    </Modal>
  );
};

const CreateTagForm = () => {
  const colors = [
    {
      name: 'Gray',
      tagClass: 'bg-gray-100 text-gray-600',
      buttonClass: 'bg-gray-500',
    },
    {
      name: 'Red',
      tagClass: 'bg-red-100 text-red-600',
      buttonClass: 'bg-red-500',
    },
    {
      name: 'Orange',
      tagClass: 'bg-orange-100 text-orange-600',
      buttonClass: 'bg-orange-500',
    },
    {
      name: 'Cyan',
      tagClass: 'bg-cyan-100 text-cyan-600',
      buttonClass: 'bg-cyan-500',
    },
    {
      name: 'Green',
      tagClass: 'bg-green-100 text-green-600',
      buttonClass: 'bg-green-500',
    },
    {
      name: 'Blue',
      tagClass: 'bg-blue-100 text-blue-600',
      buttonClass: 'bg-blue-500',
    },
    {
      name: 'Yellow',
      tagClass: 'bg-yellow-100 text-yellow-600',
      buttonClass: 'bg-yellow-500',
    },
    {
      name: 'Purple',
      tagClass: 'bg-purple-100 text-purple-600',
      buttonClass: 'bg-purple-500',
    },
  ];
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (tagName === '') return;
  };

  return (
    <form className="p-4 lg:p-0" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label>Tag Name</Label>
        <Input
          placeholder="New tag"
          onChange={(e) => setTagName(e.currentTarget.value)}
        />
        <div
          className={cn(
            'ml-auto text-center px-2 py-1 text-xs font-medium rounded-sm w-max select-none',
            selectedColor.tagClass
          )}
        >
          {tagName === '' ? 'New Tag' : tagName}
        </div>
      </div>
      <div className="space-y-1 mt-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              className={cn(
                'size-10 rounded-full transition-all shadow-none hover:scale-110',
                color.buttonClass,
                selectedColor.name === color.name &&
                  'ring-2 ring-offset-2 ring-offset-background ring-ring'
              )}
              onClick={() => setSelectedColor(color)}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
      <ModalFooter className="sm:justify-end gap-2 mt-8">
        <ModalClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </ModalClose>
        <Button disabled={tagName === ''}>Create</Button>
      </ModalFooter>
    </form>
  );
};
