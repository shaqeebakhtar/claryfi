'use client';
import * as React from 'react';
import { Bold } from '@tiptap/extension-bold';
import { Code } from '@tiptap/extension-code';
import { Heading } from '@tiptap/extension-heading';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { BulletList } from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Text } from '@tiptap/extension-text';
import { Underline } from '@tiptap/extension-underline';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Document } from '@tiptap/extension-document';
import {
  Editor,
  EditorContent,
  useEditor,
  BubbleMenu,
  isMarkActive,
} from '@tiptap/react';
import { useCallback } from 'react';
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const TextEditor = () => {
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
      }),
      Code,
      BulletList,
      OrderedList,
      ListItem,
      Document,
    ],
    content: '',
    editable: true,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <TextEditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
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
      <BubbleMenu
        editor={editor}
        className={cn(showUrlPopup ? 'block' : 'hidden')}
      >
        <div className="flex items-center gap-2 bg-background px-2.5 py-2 shadow rounded">
          <Input
            type="url"
            className="text-xs h-6 px-2 rounded-sm shadow-none"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            autoFocus
          />
          <Button
            size={'sm'}
            className="rounded-sm h-6"
            type="button"
            onClick={setLink}
            disabled={url === ''}
          >
            Save
          </Button>
        </div>
      </BubbleMenu>

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
        <Toggle
          tooltipLabel="Link"
          aria-label="Toggle link"
          onClick={linkToggle}
          isActive={editor.isActive('link')}
        >
          <Link2Icon className="size-4" />
        </Toggle>
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
