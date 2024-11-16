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
import { Editor, EditorContent, useEditor } from '@tiptap/react';
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
        openOnClick: true,
        autolink: true,
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
      <EditorContent
        editor={editor}
        className="flex min-h-[80px] w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </>
  );
};

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Toggle = ({
  className,
  isActive = false,
  ...props
}: ToggleProps) => {
  const Comp = 'button';
  return (
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
  );
};

export const TextEditorMenu = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  return (
    <div className="flex gap-0.5 bg-accent rounded-sm rounded-b-none p-1.5">
      <Toggle
        aria-label="Toggle heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1Icon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2Icon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3Icon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <BoldIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle italics"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <ItalicIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
      >
        <UnderlineIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
      >
        <CodeIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle link"
        onClick={() =>
          !editor.isActive('link')
            ? setLink()
            : editor.chain().focus().unsetLink().run()
        }
        isActive={editor.isActive('link')}
      >
        <Link2Icon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrderedIcon className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Toggle bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <ListIcon className="size-4" />
      </Toggle>
    </div>
  );
};
