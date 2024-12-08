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
import { Switch } from '@/components/ui/switch';
import { CrownIcon } from 'lucide-react';

type AppearanceFormValues = z.infer<typeof generalSettingsFormSchema>;

const GeneralSettingsForm = () => {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(generalSettingsFormSchema),
    defaultValues: {
      color: '#7c3aed',
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    console.log(data);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="text-xl font-medium">General & Branding</h3>
        <p className="text-sm text-muted-foreground">
          Customize your board&apos;s core settings and visual identity to align
          with your brand.
        </p>
      </div>
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Website URL
                </FormLabel>
                <FormDescription>
                  This will be used to link back to your website.
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
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Brand Color
                </FormLabel>
                <FormDescription>
                  Set the color you want to use in your board.
                </FormDescription>
                <div className="relative w-max">
                  <FormControl>
                    <div className="w-[120px] flex items-center gap-2 p-1 pr-3 border border-input rounded-lg h-9">
                      <input
                        type="color"
                        {...field}
                        className="w-7 appearance-none border-0 rounded-sm bg-none cursor-pointer"
                      />
                      <span className="text-sm">{form.getValues('color')}</span>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hide_branding"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-medium flex items-center gap-2">
                    Hide Claryfi Branding
                    <CrownIcon className="size-4 text-yellow-600" />
                  </FormLabel>
                  <FormDescription>
                    Toggle to hide or display Claryfi branding on your board.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Save changes</Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettingsForm;
