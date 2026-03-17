'use client';

import React from 'react';
import { RiDeleteBinLine, RiImageAddLine } from '@remixicon/react';
import { cx, focusRing } from '@/shared/lib/utils';

export type ImageUploadFieldItem = File | string;

export type ImageUploadFieldRemoveEvent = {
  removed: ImageUploadFieldItem;
  index: number;
  nextValue: ImageUploadFieldItem[];
};

export type ImageUploadFieldProps = {
  name: string;
  /**
   * Array of File objects (new images) and/or string URLs (existing images).
   * This is the controlled value from the form field.
   */
  defaultValue?: ImageUploadFieldItem[];
  onChange?: (value: ImageUploadFieldItem[]) => void;
  /**
   * Called when the user removes an item via the UI.
   * Useful for triggering delete-on-server for already uploaded images.
   */
  onRemove?: (event: ImageUploadFieldRemoveEvent) => void | Promise<void>;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  disabled?: boolean;
  className?: string;
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
   */
  onValidationError?: (error: { type: 'format' | 'size'; message: string }) => void;
};

function isFile(item: ImageUploadFieldItem): item is File {
  return typeof item !== 'string';
}

function normalizeValue(value: unknown): ImageUploadFieldItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string' || v instanceof File) as ImageUploadFieldItem[];
}

/**
 * Shallow comparison of two `ImageUploadFieldItem[]` arrays.
 */
function itemsEqual(a: ImageUploadFieldItem[], b: ImageUploadFieldItem[]): boolean {
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
    // Compare strings
    if (typeof item === 'string' && typeof other === 'string') {
      return item === other;
    }
    return false;
  });
}

/**
 * ImageUploadField - A form-integrated image upload component
 *
 * This component properly integrates with FormWrapper by:
 * 1. Using a single file input with `multiple` attribute for file submission
 * 2. Syncing files to the input using DataTransfer API (works because we set on DOM element)
 * 3. Rendering hidden inputs for existing URLs to be included in FormData
 * 4. Tracking files in form state for validation and previews
 *
 * Key difference from ImageUploadInput: This component ensures that on form submit,
 * both new files AND existing URLs are properly included in the FormData by using
 * the DataTransfer API to sync files to a single file input.
 */
export function ImageUploadField({
  name,
  defaultValue,
  onChange,
  multiple = true,
  maxFiles,
  accept = 'image/*',
  disabled,
  className,
  onRemove,
  maxFileSize,
  acceptedFormats,
  onValidationError,
}: ImageUploadFieldProps) {
  // Ref to the file input that will be submitted with the form
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Ref to track if we're currently syncing files to prevent infinite loops
  const isSyncingRef = React.useRef(false);

  // Default accepted image formats
  const DEFAULT_ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  // Default max file size: 5MB
  const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;

  const effectiveAcceptedFormats = acceptedFormats ?? DEFAULT_ACCEPTED_FORMATS;
  const effectiveMaxFileSize = maxFileSize ?? DEFAULT_MAX_FILE_SIZE;

  // Internal state synced from form field value
  const [items, setItems] = React.useState<ImageUploadFieldItem[]>(() =>
    normalizeValue(defaultValue)
  );

  const [isDragActive, setIsDragActive] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Track the last committed value to prevent feedback loops
  const lastCommittedRef = React.useRef<ImageUploadFieldItem[]>(items);

  // Sync from external `defaultValue` (form field value)
  React.useEffect(() => {
    const incoming = normalizeValue(defaultValue);
    if (!itemsEqual(incoming, lastCommittedRef.current)) {
      setItems(incoming);
      lastCommittedRef.current = incoming;
    }
  }, [defaultValue]);

  const effectiveMaxFiles = multiple ? maxFiles : 1;

  // Preview URLs
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

  // ── Sync files to the file input using DataTransfer API ─────────────────
  // This is the KEY fix: we set files on an existing DOM element, not via JSX
  React.useEffect(() => {
    const input = fileInputRef.current;
    if (!input || isSyncingRef.current) return;

    const files = items.filter(isFile);

    // Use DataTransfer to set files on the input
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));

    isSyncingRef.current = true;
    input.files = dt.files;
    isSyncingRef.current = false;
  }, [items]);

  // ── Commit helper - updates form state ───────────────────────────────────
  const commit = React.useCallback(
    (next: ImageUploadFieldItem[]) => {
      const normalized = normalizeValue(next);
      const capped =
        typeof effectiveMaxFiles === 'number' ? normalized.slice(0, effectiveMaxFiles) : normalized;

      lastCommittedRef.current = capped;
      setItems(capped);
      onChange?.(capped);
    },
    [effectiveMaxFiles, onChange]
  );

  // ── Remove item ──────────────────────────────────────────────────────────
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

  // ── Open file picker ──────────────────────────────────────────────────────
  const handleChooseFiles = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // ── Add files (from picker or drop) ───────────────────────────────────────
  const addFiles = React.useCallback(
    (selectedRaw: File[]) => {
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
    },
    [
      accept,
      commit,
      effectiveMaxFiles,
      items,
      multiple,
      effectiveAcceptedFormats,
      effectiveMaxFileSize,
      onValidationError,
    ]
  );

  // ── File input change handler ─────────────────────────────────────────────
  const handleFileChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      // Ignore if we're syncing files
      if (isSyncingRef.current) return;

      const selected = Array.from(evt.target.files ?? []);
      if (selected.length === 0) return;
      addFiles(selected);
      // Note: We don't clear the input here because we want to keep the files
      // The sync effect will update the input with all files
    },
    [addFiles]
  );

  // ── Drag & drop handlers ──────────────────────────────────────────────────
  const handleDrop = React.useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();
      evt.stopPropagation();
      setIsDragActive(false);

      if (disabled) return;

      const files = Array.from(evt.dataTransfer.files ?? []);
      addFiles(files);
    },
    [addFiles, disabled]
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

  // Separate items into files and URLs for rendering
  const urlItems = items.filter((item): item is string => typeof item === 'string');

  return (
    <div className={cx('w-full', className)}>
      {/* 
        THE KEY FIX: Single file input with multiple attribute.
        Files are synced to this input using DataTransfer API.
        This input WILL submit files via FormData because:
        1. It has a name attribute
        2. Files are set via DOM manipulation (not JSX)
        3. It's part of the form being submitted
        
        NOTE: We do NOT disable this input when canAddMore is false because
        disabled inputs are NOT submitted with the form. The input is hidden
        anyway, so users can't interact with it directly.
      */}
      <input
        ref={fileInputRef}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Hidden inputs for URL strings so they appear in FormData */}
      {/* FormData.getAll(name) will return both files from input and these URLs */}
      {urlItems.map((url, index) => (
        <input key={`url-${url}-${index}`} type="hidden" name={name} value={url} />
      ))}

      <div className="flex items-center justify-end gap-2">
        {typeof effectiveMaxFiles === 'number' && (
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
          if (disabled || !canAddMore) return;
          handleChooseFiles();
        }}
        onKeyDown={(evt) => {
          if (evt.key !== 'Enter' && evt.key !== ' ') return;
          evt.preventDefault();
          if (disabled || !canAddMore) return;
          handleChooseFiles();
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cx(
          'mt-2 rounded-md border border-dashed p-3 transition-colors',
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50',
          disabled && 'cursor-not-allowed opacity-60',
          focusRing
        )}
        aria-disabled={disabled}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {/* Dropzone tile */}
          <div
            className={cx(
              'flex aspect-square items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600',
              !canAddMore && 'hidden'
            )}
          >
            <div className="flex flex-col items-center gap-2 text-xs">
              <RiImageAddLine className="size-5" aria-hidden="true" />
              <span>{multiple ? 'Add' : 'Choose'}</span>
            </div>
          </div>

          {/* Previews */}
          {items.length > 0 &&
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
                  disabled={disabled}
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
