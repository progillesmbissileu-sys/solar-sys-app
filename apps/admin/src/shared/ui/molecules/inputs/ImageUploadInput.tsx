'use client';

import React from 'react';
import { RiDeleteBinLine, RiImageAddLine, RiLoader2Fill } from '@remixicon/react';
import { cx, focusRing } from '@/shared/lib/utils';

export type ImageItem = File | string;

export type ImageUploadInputRemoveEvent = {
  removed: ImageItem;
  index: number;
  nextValue: ImageItem[];
};

export type ImageUploadInputProps = {
  name: string;
  /**
   * Expected to be an array of `File`s (new images) and/or `string` URLs (already uploaded images).
   */
  defaultValue?: ImageItem[];
  onChange?: (value: ImageItem[]) => void;
  /**
   * Called when the user removes an item via the UI.
   * Useful for triggering delete-on-server for already uploaded images.
   */
  onRemove?: (event: ImageUploadInputRemoveEvent) => void | Promise<void>;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  disabled?: boolean;
  className?: string;
  /**
   * Optional future hook: if provided (and `autoUpload` is true), newly selected `File`s
   * are uploaded immediately and replaced with returned URL strings in the field value.
   */
  upload?: (files: File[]) => Promise<string[]>;
  autoUpload?: boolean;
};

function isFile(item: ImageItem): item is File {
  return typeof item !== 'string';
}

function normalizeValue(value: unknown): ImageItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string' || v instanceof File) as ImageItem[];
}

export function ImageUploadInput({
  defaultValue,
  onChange,
  multiple = true,
  maxFiles,
  accept = 'image/*',
  disabled,
  className,
  upload,
  autoUpload = false,
  ...props
}: ImageUploadInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [items, setItems] = React.useState<ImageItem[]>(() => normalizeValue(defaultValue));
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDragActive, setIsDragActive] = React.useState(false);

  React.useEffect(() => {
    setItems(normalizeValue(defaultValue));
  }, [defaultValue]);

  const effectiveMaxFiles = multiple ? maxFiles : 1;

  const [previewSrcs, setPreviewSrcs] = React.useState<string[]>([]);
  React.useEffect(() => {
    const urls = items.map((item) => {
      if (isFile(item)) return { src: URL.createObjectURL(item), revoke: true };
      return { src: item, revoke: false };
    });

    setPreviewSrcs(urls.map((u) => u.src));

    return () => {
      urls.forEach((u) => {
        if (u.revoke) URL.revokeObjectURL(u.src);
      });
    };
  }, [items]);

  const commit = React.useCallback(
    (next: ImageItem[]) => {
      const normalized = normalizeValue(next);
      const capped =
        typeof effectiveMaxFiles === 'number' ? normalized.slice(0, effectiveMaxFiles) : normalized;

      setItems(capped);
      onChange?.(capped);
    },
    [effectiveMaxFiles, onChange]
  );

  const removeAt = React.useCallback(
    (index: number) => {
      const removed = items[index];
      const nextValue = items.filter((_, i) => i !== index);
      commit(nextValue);
      if (removed !== undefined) {
        void props.onRemove?.({ removed, index, nextValue });
      }
    },
    [commit, items, props]
  );

  const handleChooseFiles = React.useCallback(() => {
    inputRef.current?.click();
  }, []);

  const addFiles = React.useCallback(
    async (selectedRaw: File[]) => {
      const selected = selectedRaw
        .filter((f) => f.type?.startsWith('image/'))
        .filter((f) => f.size > 0);

      if (selected.length === 0) return;

      const current = normalizeValue(items);
      const nextLocal = multiple ? [...current, ...selected] : [selected[0]];

      // optimistic local update
      commit(nextLocal);

      if (!autoUpload || !upload) return;

      setIsUploading(true);
      try {
        const urls = await upload(selected);
        const uploadedItems: ImageItem[] = urls.filter(Boolean);

        // If upload returns nothing (or fails silently), keep local files.
        if (uploadedItems.length === 0) return;

        const nextUploaded = multiple
          ? [...current, ...uploadedItems]
          : [uploadedItems[0] ?? selected[0]];

        commit(nextUploaded);
      } finally {
        setIsUploading(false);
      }
    },
    [autoUpload, commit, items, multiple, upload]
  );

  const handleFileChange = React.useCallback(
    async (evt: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(evt.target.files ?? []);
      // allow re-selecting the same file(s)
      evt.target.value = '';
      await addFiles(selected);
    },
    [addFiles]
  );

  const handleDrop = React.useCallback(
    async (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      setIsDragActive(false);

      if (disabled || isUploading) return;

      const files = Array.from(evt.dataTransfer.files ?? []);
      await addFiles(files);
    },
    [addFiles, disabled, isUploading]
  );

  const handleDragOver = React.useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      if (!isDragActive) setIsDragActive(true);
    },
    [isDragActive]
  );

  const handleDragLeave = React.useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsDragActive(false);
  }, []);

  const canAddMore =
    typeof effectiveMaxFiles !== 'number' ? true : items.length < (effectiveMaxFiles ?? 0);

  return (
    <div className={cx('w-full', className)}>
      <input
        {...props}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled || isUploading || !canAddMore}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="text-sm text-gray-600">Drag and drop images here, or click the drop zone.</div>

        {typeof effectiveMaxFiles === 'number' && (
          <span className="text-xs text-gray-500">
            {items.length}/{effectiveMaxFiles}
          </span>
        )}
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (disabled || isUploading || !canAddMore) return;
          handleChooseFiles();
        }}
        onKeyDown={(evt) => {
          if (evt.key !== 'Enter' && evt.key !== ' ') return;
          evt.preventDefault();
          if (disabled || isUploading || !canAddMore) return;
          handleChooseFiles();
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cx(
          'mt-2 rounded-md border border-dashed p-3 transition-colors',
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50',
          (disabled || isUploading) && 'cursor-not-allowed opacity-60',
          focusRing
        )}
        aria-disabled={disabled || isUploading}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {/* Dropzone tile */}
          <div
            className={cx(
              'flex aspect-square items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600',
              !canAddMore && 'hidden'
            )}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-xs">
                <RiLoader2Fill className="size-5 animate-spin" aria-hidden="true" />
                <span>Uploading…</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-xs">
                <RiImageAddLine className="size-5" aria-hidden="true" />
                <span>{multiple ? 'Add' : 'Choose'}</span>
              </div>
            )}
          </div>

          {/* Previews */}
          {items.length === 0 ? (
            <div className="col-span-2 flex items-center justify-center text-sm text-gray-500 sm:col-span-3 lg:col-span-4">
              No images selected.
            </div>
          ) : (
            previewSrcs.map((src, index) => (
              <div key={`${src}-${index}`} className="group relative">
                <div className="aspect-square overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                  <img
                    src={src}
                    alt="Selected image preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    removeAt(index);
                  }}
                  disabled={disabled || isUploading}
                  className={cx(
                    'absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-gray-900 shadow-sm transition-opacity',
                    'opacity-0 group-hover:opacity-100',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    focusRing
                  )}
                  aria-label="Remove image"
                >
                  <RiDeleteBinLine className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
