'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import React, { useEffect, useRef, useState } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo,
  Redo,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  ImageIcon,
  Link as LinkIcon,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Unlink,
} from 'lucide-react';
import { cx, focusInput, hasErrorInput } from '@/shared/lib/utils';

export interface RichTextInputProps {
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
  editorClassName?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

function ToolbarButton({ onClick, isActive, disabled, children, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cx(
        'rounded p-1.5 transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isActive && 'bg-gray-100 dark:bg-gray-700'
      )}
    >
      {children}
    </button>
  );
}

interface ToolbarSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  title?: string;
}

function ToolbarSelect({ value, onChange, options, title }: ToolbarSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      title={title}
      className={cx(
        'rounded border-none bg-transparent px-2 py-1 text-sm',
        'focus:outline-none focus:ring-1 focus:ring-blue-500',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'dark:text-gray-200'
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface ToolbarProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string>;
}

function Toolbar({ editor, onImageUpload }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  if (!editor) return null;

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (onImageUpload) {
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const setLink = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const currentHeading = editor.isActive('heading', { level: 1 })
    ? '1'
    : editor.isActive('heading', { level: 2 })
      ? '2'
      : editor.isActive('heading', { level: 3 })
        ? '3'
        : editor.isActive('heading', { level: 4 })
          ? '4'
          : editor.isActive('heading', { level: 5 })
            ? '5'
            : 'paragraph';

  const handleHeadingChange = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 })
        .run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 p-1.5 dark:border-gray-700">
      {/* Headings */}
      <ToolbarSelect
        value={currentHeading}
        onChange={handleHeadingChange}
        options={[
          { value: 'paragraph', label: 'Paragraph' },
          { value: '1', label: 'Heading 1' },
          { value: '2', label: 'Heading 2' },
          { value: '3', label: 'Heading 3' },
          { value: '4', label: 'Heading 4' },
          { value: '5', label: 'Heading 5' },
        ]}
        title="Text Style"
      />
      <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        title="Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Text Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}
        title="Align Justify"
      >
        <AlignJustify className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Lists & Quote */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Link */}
      {showLinkInput ? (
        <div className="flex items-center gap-1">
          <input
            type="url"
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setLink()}
            className="w-32 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
          />
          <button
            type="button"
            onClick={setLink}
            className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
          >
            Set
          </button>
        </div>
      ) : (
        <ToolbarButton
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href || '';
            setLinkUrl(previousUrl);
            setShowLinkInput(true);
          }}
          isActive={editor.isActive('link')}
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
      )}
      {editor.isActive('link') && (
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} title="Unlink">
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
      )}

      {/* Image */}
      <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Insert Image">
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />

      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export function RichTextInput({
  name,
  placeholder = 'Write something...',
  defaultValue = '',
  onChange,
  hasError,
  disabled,
  className,
  editorClassName,
  onImageUpload,
}: RichTextInputProps) {
  const [content, setContent] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: false,
        dropcursor: false,
        gapcursor: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: defaultValue,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange?.(html);
    },
  });

  // Update content when defaultValue changes
  useEffect(() => {
    if (editor && defaultValue !== editor.getHTML()) {
      editor.commands.setContent(defaultValue, { emitUpdate: false });
    }
  }, [defaultValue, editor]);

  // Update editable state when disabled changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  return (
    <div
      className={cx(
        'overflow-hidden rounded-md border shadow-sm transition-colors',
        // border color
        'border-gray-300 dark:border-gray-800',
        // background color
        'bg-white dark:bg-[#090E1A]',
        // focus
        focusInput,
        // error
        hasError ? hasErrorInput : '',
        // disabled
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {name && <input type="hidden" name={name} value={content} />}
      <Toolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent
        editor={editor}
        className={cx(
          'prose prose-sm dark:prose-invert min-h-[120px] max-w-none p-3',
          '[&_.ProseMirror]:min-h-[80px] [&_.ProseMirror]:outline-none',
          '[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:dark:text-gray-500',
          editorClassName
        )}
      />
    </div>
  );
}
