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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn, tagColors } from '@/lib/utils';
import { createTag } from '@/services/admin/tag';
import { tagSchema } from '@/validations/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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
        <CreateTagForm setIsDialogOpen={() => setIsDialogOpen(false)} />
      </ModalContent>
    </Modal>
  );
};

const CreateTagForm = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: () => void;
}) => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedColor, setSelectedColor] = useState(tagColors[0]);

  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: '',
      color: 'Gray',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      toast.success('Your tag has been created');
      setIsDialogOpen();
    },
    onError: () => {
      toast.error('Failed to create tag');
    },
  });

  const onSubmit = (data: z.infer<typeof tagSchema>) => {
    mutate({
      slug,
      name: data.name,
      color: data.color,
    });
  };

  useEffect(() => {
    setSelectedColor(
      tagColors.find((color) => color.name === form.watch('color')) as {
        name: string;
        tagClass: string;
        buttonClass: string;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('color')]);

  return (
    <Form {...form}>
      <form className="p-4 lg:p-0" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Name</FormLabel>
              <FormControl>
                <Input placeholder="New tag" {...field} />
              </FormControl>
              <FormMessage />
              <div
                className={cn(
                  'ml-auto text-center px-2 py-1 text-xs font-medium rounded-sm w-max select-none',
                  selectedColor.tagClass
                )}
              >
                {form.getValues('name') === ''
                  ? 'New Tag'
                  : form.getValues('name')}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={() => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {tagColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={cn(
                        'size-10 rounded-full transition-all shadow-none hover:scale-110',
                        color.buttonClass,
                        selectedColor.name === color.name &&
                          'ring-2 ring-offset-2 ring-offset-background ring-ring'
                      )}
                      onClick={() => form.setValue('color', color.name)}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ModalFooter className="sm:justify-end gap-2 mt-8">
          <ModalClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </ModalClose>
          <Button disabled={isPending || form.getValues('name') === ''}>
            {isPending && <Loader className="size-4 mr-2 animate-spin" />}
            Create
          </Button>
        </ModalFooter>
      </form>
    </Form>
  );
};
