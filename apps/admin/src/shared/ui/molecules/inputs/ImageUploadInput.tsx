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
  name?: string;
  /**
   * Expected to be an array of `File`s (new images) and/or `string` URLs
   * (already uploaded images).
   *
   * When used inside the Form wrapper `withFieldContext` passes the TanStack
   * field value here on every render.  The component treats it as the
   * authoritative source of truth and keeps its own state in sync.
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
   * Optional future hook: if provided (and `autoUpload` is true), newly
   * selected `File`s are uploaded immediately and replaced with returned URL
   * strings in the field value.
   */
  upload?: (files: File[]) => Promise<string[]>;
  autoUpload?: boolean;
  /**
   * Maximum allowed file size in bytes.
   * Default: 5MB (5 * 1024 * 1024 bytes)
   */
  maxFileSize?: number;
  /**
   * Array of accepted image MIME types.
   * Default: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
   */
  acceptedFormats?: string[];
  /**
   * Callback fired when validation error occurs.
   * Receives an object with error type and message.
   */
  onValidationError?: (error: { type: 'format' | 'size'; message: string }) => void;
};

function isFile(item: ImageItem): item is File {
  return typeof item !== 'string';
}

function normalizeValue(value: unknown): ImageItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string' || v instanceof File) as ImageItem[];
}

/**
 * Shallow comparison of two `ImageItem[]` arrays.
 * Two `File` objects are considered equal when they share the same name,
 * size and lastModified timestamp (reference equality is checked first).
 */
function itemsEqual(a: ImageItem[], b: ImageItem[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, i) => {
    const other = b[i];
    if (item === other) return true;
    if (isFile(item) && isFile(other)) {
      return (
        item.name === other.name &&
        item.size === other.size &&
        item.lastModified === other.lastModified
      );
    }
    return false;
  });
}

export function ImageUploadInput({
  name,
  defaultValue,
  onChange,
  multiple = true,
  maxFiles,
  accept = 'image/*',
  disabled,
  className,
  upload,
  autoUpload = false,
  onRemove,
  maxFileSize,
  acceptedFormats,
  onValidationError,
}: ImageUploadInputProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Default accepted image formats
  const DEFAULT_ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  // Default max file size: 5MB
  const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;

  const effectiveAcceptedFormats = acceptedFormats ?? DEFAULT_ACCEPTED_FORMATS;
  const effectiveMaxFileSize = maxFileSize ?? DEFAULT_MAX_FILE_SIZE;

  // ── Internal state ──────────────────────────────────────────────────
  const [items, setItems] = React.useState<ImageItem[]>(() => normalizeValue(defaultValue));

  const [isUploading, setIsUploading] = React.useState(false);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Track the last value we pushed via `onChange` so we can distinguish
  // external resets from our own updates echoing back through
  // `defaultValue`.
  const lastCommittedRef = React.useRef<ImageItem[]>(items);

  // ── Sync from external `defaultValue` ───────────────────────────────
  // `withFieldContext` passes `field.state.value` as `defaultValue` on
  // every render.  We only update internal state when the incoming value
  // is genuinely different from what we last committed – this prevents
  // the feedback loop that previously caused bugs.
  React.useEffect(() => {
    const incoming = normalizeValue(defaultValue);
    if (!itemsEqual(incoming, lastCommittedRef.current)) {
      setItems(incoming);
      lastCommittedRef.current = incoming;
    }
  }, [defaultValue]);

  const effectiveMaxFiles = multiple ? maxFiles : 1;

  // ── Preview URLs ────────────────────────────────────────────────────
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

  // ── Commit helper ───────────────────────────────────────────────────
  const commit = React.useCallback(
    (next: ImageItem[]) => {
      const normalized = normalizeValue(next);
      const capped =
        typeof effectiveMaxFiles === 'number' ? normalized.slice(0, effectiveMaxFiles) : normalized;

      lastCommittedRef.current = capped;
      setItems(capped);
      onChange?.(capped);
    },
    [effectiveMaxFiles, onChange]
  );

  // ── Remove ──────────────────────────────────────────────────────────
  const removeAt = React.useCallback(
    (index: number) => {
      const removed = items[index];
      const nextValue = items.filter((_, i) => i !== index);
      commit(nextValue);
      if (removed !== undefined) {
        void onRemove?.({ removed, index, nextValue });
      }
    },
    [commit, items, onRemove]
  );

  // ── Open file picker ────────────────────────────────────────────────
  const handleChooseFiles = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // ── Add files (from picker or drop) ─────────────────────────────────
  const addFiles = React.useCallback(
    async (selectedRaw: File[]) => {
      const selected = selectedRaw.filter((f) => f.size > 0);

      const shouldFilterToImages = accept.includes('image/');
      const filtered = shouldFilterToImages
        ? selected.filter((f) => f.type?.startsWith('image/'))
        : selected;

      if (filtered.length === 0) return;

      // Validate file formats
      const invalidFormatFiles = filtered.filter((f) => !effectiveAcceptedFormats.includes(f.type));
      if (invalidFormatFiles.length > 0) {
        const formatList = effectiveAcceptedFormats
          .map((f) => f.replace('image/', '').toUpperCase())
          .join(', ');
        const errorMsg = `Invalid file format. Accepted formats: ${formatList}`;
        setValidationError(errorMsg);
        onValidationError?.({ type: 'format', message: errorMsg });
        setTimeout(() => setValidationError(null), 3000);
        return;
      }

      // Validate file sizes
      const oversizedFiles = filtered.filter((f) => f.size > effectiveMaxFileSize);
      if (oversizedFiles.length > 0) {
        const maxSizeMB = (effectiveMaxFileSize / (1024 * 1024)).toFixed(1);
        const errorMsg = `File too large. Maximum size: ${maxSizeMB}MB`;
        setValidationError(errorMsg);
        onValidationError?.({ type: 'size', message: errorMsg });
        setTimeout(() => setValidationError(null), 3000);
        return;
      }

      const current = items;

      const remainingSlots =
        typeof effectiveMaxFiles === 'number'
          ? Math.max(0, effectiveMaxFiles - current.length)
          : null;

      const cappedSelection =
        remainingSlots === null ? filtered : filtered.slice(0, Math.max(0, remainingSlots));

      if (cappedSelection.length === 0) return;

      const nextLocal = multiple ? [...current, ...cappedSelection] : [cappedSelection[0]];

      commit(nextLocal);

      if (!autoUpload || !upload) return;

      setIsUploading(true);
      try {
        const urls = await upload(cappedSelection);
        const uploadedItems: ImageItem[] = urls.filter(Boolean);

        if (uploadedItems.length === 0) return;

        const nextUploaded = multiple
          ? [...current, ...uploadedItems]
          : [uploadedItems[0] ?? cappedSelection[0]];

        commit(nextUploaded);
      } finally {
        setIsUploading(false);
      }
    },
    [
      accept,
      autoUpload,
      commit,
      effectiveMaxFiles,
      items,
      multiple,
      upload,
      effectiveAcceptedFormats,
      effectiveMaxFileSize,
      onValidationError,
    ]
  );

  // ── File input change handler ───────────────────────────────────────
  const isResettingRef = React.useRef(false);

  const handleFileChange = React.useCallback(
    async (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (isResettingRef.current) return;
      const selected = Array.from(evt.target.files ?? []);
      if (selected.length === 0) return;
      await addFiles(selected);
    },
    [addFiles]
  );

  // ── Sync native file input for FormData submission ──────────────────
  React.useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;

    const files = items.filter(isFile);

    if (typeof DataTransfer !== 'undefined') {
      const dt = new DataTransfer();
      files.forEach((f) => dt.items.add(f));

      isResettingRef.current = true;
      input.files = dt.files;
      input.value = '';
      isResettingRef.current = false;
    }
  }, [items]);

  // ── Drag & drop handlers ────────────────────────────────────────────
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
    typeof effectiveMaxFiles !== 'number' ? true : items.length < effectiveMaxFiles;

  return (
    <div className={cx('w-full', { 'aspect-video': !multiple }, className)}>
      {/* Hidden native file input – participates in FormData submission */}
      <input
        ref={fileInputRef}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled || isUploading || !canAddMore}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center justify-end gap-2">
        {maxFiles && typeof effectiveMaxFiles === 'number' && (
          <span className="text-xs text-gray-500">
            {items.length}/{effectiveMaxFiles}
          </span>
        )}
        {validationError && <span className="text-xs text-red-500">{validationError}</span>}
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
          focusRing,
          { 'aspect-video': !multiple }
        )}
        aria-disabled={disabled || isUploading}
      >
        <div
          className={cx('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4', {
            'h-full max-h-full grid-cols-1 bg-blue-500 lg:grid-cols-1': !multiple,
          })}
        >
          {/* Dropzone tile */}
          <div
            className={cx(
              'flex h-full items-center justify-center rounded-md border border-blue-200 bg-gray-50 text-gray-600',
              !canAddMore && 'hidden',
              { 'aspect-square': multiple }
            )}
          >
            {isUploading ? (
              <div className={cx('flex flex-col items-center gap-2 text-xs')}>
                <RiLoader2Fill className="size-5 animate-spin" aria-hidden="true" />
                <span>Uploading…</span>
              </div>
            ) : (
              <div className={cx('flex flex-col items-center gap-2 text-xs')}>
                <RiImageAddLine className="size-5" aria-hidden="true" />
                <span>{multiple ? 'Add' : 'Choose'}</span>
              </div>
            )}
          </div>

          {/* Previews */}
          {items.length > 0 &&
            previewSrcs.map((src, index) => (
              <div key={`${src}-${index}`} className="group relative h-full">
                <figure
                  className={cx(
                    'h-1/2 overflow-hidden rounded-md border border-gray-200 bg-gray-50 p-1',
                    {
                      'aspect-square': multiple || maxFiles,
                    }
                  )}
                >
                  <img src={src} alt="Selected image preview" className="" />
                </figure>
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
            ))}
        </div>
      </div>
    </div>
  );
}
