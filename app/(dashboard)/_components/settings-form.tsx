'use client';

import { FileUpload } from '@/components/file-upload';
import { Button } from '@/components/ui/button';
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
import { Switch } from '@/components/ui/switch';
import {
  getBoardMetaDataBySlug,
  updateBoardMetaData,
} from '@/services/admin/settings';
import { settingsFormSchema } from '@/validations/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CrownIcon, Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const SettingsForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: board, isLoading } = useQuery({
    queryKey: [slug, 'settings'],
    queryFn: () => getBoardMetaDataBySlug({ slug }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateBoardMetaData,
    onSuccess: (data) => {
      toast.success('Updated board successfully');
      form.setValue('slug', data?.slug);
      queryClient.invalidateQueries({ queryKey: [slug, 'settings'] });
      router.push(`/${data?.slug}/settings`);
    },
    onError: () => {
      toast.error('Failed to update the board');
    },
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      hide_branding: false,
    },
  });

  function onSubmit(data: SettingsFormValues) {
    mutate({
      name: data.name,
      slug,
      newSlug: data.slug,
      websiteUrl: data.url,
      brandColor: data.color,
      hideBranding: data.hide_branding,
    });
  }

  useEffect(() => {
    if (!isLoading && board) {
      form.setValue('logo', board?.logoUrl as string);
      form.setValue('name', board?.name);
      form.setValue('slug', board?.slug);
      form.setValue('color', board?.brandColor as string);
      form.setValue('url', board?.websiteUrl as string);
      form.setValue('hide_branding', board?.hideBranding as boolean);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  function isAnyFieldUpdated() {
    return (
      form.watch('logo') !== board?.logoUrl ||
      form.watch('name') !== board?.name ||
      form.watch('slug') !== board?.slug ||
      form.watch('url') !== board?.websiteUrl ||
      form.watch('color') !== board?.brandColor ||
      form.watch('hide_branding') !== board?.hideBranding
    );
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
            render={() => (
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
                      imageSrc={form.watch('logo')}
                      accept="images"
                      className="h-24 w-24 rounded-full border border-gray-300"
                      iconClassName="w-5 h-5"
                      variant="plain"
                      readFile
                      content={null}
                      maxFileSizeMB={2}
                      onChange={(data) => {
                        form.setValue('logo', data.src);
                      }}
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
                  <Input
                    placeholder="My board"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <span className="text-muted-foreground text-sm ml-1.5">
                    (Optional)
                  </span>
                </FormLabel>
                <FormDescription>
                  This will be used to link back to your website.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <Input
                    placeholder="my-board"
                    {...field}
                    disabled={isLoading}
                  />
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
                        disabled={isLoading}
                      />
                      <span className="text-sm">{form.watch('color')}</span>
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
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading || isPending || !isAnyFieldUpdated()}
            className="disabled:bg-gray-300 disabled:text-secondary-foreground shadow-none"
          >
            {isPending && <Loader className="size-4 animate-spin mr-2" />}
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
