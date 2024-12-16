'use client';
import { cn } from '@/lib/utils';
import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Code } from '@tiptap/extension-code';
import { Document } from '@tiptap/extension-document';
import { Heading } from '@tiptap/extension-heading';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import { Text } from '@tiptap/extension-text';
import { Underline } from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  Link2Icon,
  Link2OffIcon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from 'lucide-react';
import * as React from 'react';
import { useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { UseFormReturn } from 'react-hook-form';

export const TextEditor = ({
  placeholder,
  className,
  form,
  value,
  ...props
}: {
  placeholder?: string;
  className?: string;
  form?: UseFormReturn<any, undefined>;
  value?: string;
}) => {
  const editor = useEditor({
    extensions: [
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Text,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Link.configure({
        defaultProtocol: 'https',
      }).extend({
        inclusive: false,
      }),
      Code,
      BulletList,
      OrderedList,
      ListItem,
      Document,
      Placeholder.configure({
        placeholder,
      }),
    ],
    editable: true,
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form?.setValue('description', html);
      form?.setValue('comment', html);
    },
  });

  React.useEffect(() => {
    editor?.commands.setContent(value as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-1">
      <TextEditorMenu editor={editor} />
      <EditorContent editor={editor} className={className} {...props} />
    </div>
  );
};

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  tooltipLabel: string;
}

export const Toggle = ({
  className,
  isActive = false,
  tooltipLabel,
  ...props
}: ToggleProps) => {
  const Comp = 'button';
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            type="button"
            className={cn(
              'p-1.5 inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
              isActive &&
                'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
              className
            )}
            {...props}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-gray-400 text-white rounded-sm">
          {tooltipLabel}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const TextEditorMenu = ({ editor }: { editor: Editor }) => {
  const [url, setUrl] = React.useState('');
  const [showUrlPopup, setShowUrlPopup] = React.useState(false);

  const setLink = useCallback(() => {
    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();

    setUrl('');
    setShowUrlPopup(false);
  }, [editor, url]);

  const linkToggle = () => {
    if (!editor.isActive('link')) {
      editor.chain().focus().run();
      setShowUrlPopup(true);
    } else {
      editor.chain().focus().unsetLink().run();
      setShowUrlPopup(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-0.5 bg-accent rounded-sm p-1.5">
        <Toggle
          tooltipLabel="Heading 1"
          aria-label="Toggle heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1Icon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Heading 2"
          aria-label="Toggle heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2Icon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Heading 3"
          aria-label="Toggle heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
        >
          <Heading3Icon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Bold"
          aria-label="Toggle bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <BoldIcon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Italics"
          aria-label="Toggle italics"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <ItalicIcon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Underline"
          aria-label="Toggle underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
        >
          <UnderlineIcon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Code"
          aria-label="Toggle code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
        >
          <CodeIcon className="size-4" />
        </Toggle>
        <div className="relative">
          <div
            className={cn(
              'hidden items-center gap-2 bg-background px-2.5 py-2 shadow-xl rounded w-[250px] absolute bottom-full left-1/2 -translate-x-1/2 z-20',
              showUrlPopup && 'flex'
            )}
          >
            <Input
              type="url"
              className="text-xs h-6 px-2 rounded-sm shadow-none"
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
              autoFocus={showUrlPopup}
            />
            <Button
              size={'sm'}
              className="rounded-sm h-6"
              type="submit"
              onClick={setLink}
              disabled={url === ''}
            >
              Save
            </Button>
          </div>
          <Toggle
            tooltipLabel="Link"
            aria-label="Toggle link"
            onClick={linkToggle}
            isActive={editor.isActive('link')}
          >
            {editor.isActive('link') ? (
              <Link2OffIcon className="size-4" />
            ) : (
              <Link2Icon className="size-4" />
            )}
          </Toggle>
        </div>
        <Toggle
          tooltipLabel="Ordered List"
          aria-label="Toggle ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrderedIcon className="size-4" />
        </Toggle>
        <Toggle
          tooltipLabel="Bullet List"
          aria-label="Toggle bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <ListIcon className="size-4" />
        </Toggle>
      </div>
    </>
  );
};
