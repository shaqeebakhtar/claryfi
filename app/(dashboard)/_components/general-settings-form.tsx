'use client';

import { FileUpload } from '@/components/file-upload';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generalSettingsFormSchema } from '@/validations/general';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DeleteBoardDialog from './delete-board-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type AppearanceFormValues = z.infer<typeof generalSettingsFormSchema>;

const GeneralSettingsForm = () => {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(generalSettingsFormSchema),
    defaultValues: {},
  });

  function onSubmit(data: AppearanceFormValues) {
    console.log(data);
  }

  return (
    <div className="space-y-8 max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="text-base font-medium">
                    Board Logo
                  </FormLabel>
                  <FormDescription className="mt-1 mb-4">
                    This is the logo of your board.
                  </FormDescription>
                  <FormControl>
                    <FileUpload
                      accept="images"
                      className="h-24 w-24 rounded-full border border-gray-300"
                      iconClassName="w-5 h-5"
                      variant="plain"
                      readFile
                      content={null}
                      maxFileSizeMB={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Board Name
                </FormLabel>
                <FormDescription>
                  This is the name of your board.
                </FormDescription>
                <FormControl>
                  <Input placeholder="My board" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Board Slug
                </FormLabel>
                <FormDescription>
                  This is the unique slug of your board.
                </FormDescription>
                <FormControl>
                  <Input placeholder="my-board" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save changes</Button>
        </form>
      </Form>
      <Separator orientation="horizontal" className="bg-gray-100" />
      <div className="space-y-4 p-4 border border-destructive rounded-lg bg-destructive/5">
        <div className="space-y-1">
          <h2 className="text-base font-medium text-destructive">
            Delete Board
          </h2>
          <p className="text-sm text-muted-foreground">
            Deleting your board will also delete all the feedbacks and others
            things associated with it.
          </p>
        </div>
        <DeleteBoardDialog />
      </div>
    </div>
  );
};

export default GeneralSettingsForm;
