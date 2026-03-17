// 'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverAnchor } from '../../atoms/Popover';
import { cx } from '@/shared/lib/utils';
import { RiLoader2Line, RiSearchLine, RiCloseLine } from '@remixicon/react';
import { CollectionResponseType, Result } from '@/shared/api';

export type MultiSearchInputOption = {
  label: string;
  value: string;
};

export type MultiSearchInputProps = {
  onChange?: (value: string[]) => void;
  onSearch: (query: string) => Promise<Result<CollectionResponseType<any>>>;
  placeholder?: string;
  debounceMs?: number;
  minSearchLength?: number;
  loadingText?: string;
  noResultsText?: string;
  inputClassName?: string;
  disabled?: boolean;
  value?: string[];
  defaultValue?: string[] | MultiSearchInputOption[];
  name?: string;
  parseCallback?: (record: any) => MultiSearchInputOption;
  loadInitial?: boolean;
};

export function MultiSearchInput({
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  minSearchLength = 1,
  loadingText = 'Loading...',
  noResultsText = 'No results found',
  inputClassName,
  disabled = false,
  value: controlledValue,
  defaultValue,
  name,
  parseCallback,
  loadInitial = false,
}: MultiSearchInputProps) {
  // Ensure defaultValue is always an array
  const safeDefaultValue = Array.isArray(defaultValue) ? defaultValue : [];
  const safeControlledValue = Array.isArray(controlledValue) ? controlledValue : undefined;

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState<MultiSearchInputOption[]>([]);
  const [options, setOptions] = React.useState<MultiSearchInputOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const debounceRef = React.useRef<number | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    (async () => {
      await fetchAction('', true);
    })();
  }, []);

  React.useEffect(() => {
    // if (safeDefaultValue.length === 0 && onChange) {
    //   onChange([]);
    // }
    selectedItems.length == 0 &&
      setSelectedItems(
        safeDefaultValue.map((value) =>
          typeof value === 'string' ? { value, label: value } : value
        )
      );
  }, [defaultValue]);

  // Sync controlled value changes
  React.useEffect(() => {
    if (safeControlledValue !== undefined) {
      // When controlled value changes, we need to update selectedItems
      // But we don't have the labels, so we keep existing items that match
      setSelectedItems((prev) => prev.filter((item) => safeControlledValue.includes(item.value)));
    }
  }, [safeControlledValue]);

  const fetchAction = async (query: string = '', skipMinLengthCheck = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!skipMinLengthCheck && query.length < minSearchLength) {
      setOptions([]);
      setLoading(false);
      return;
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const results = await onSearch(query);
      setOptions(
        parseCallback
          ? (results.data?.data ?? []).map(parseCallback)
          : (results.data?.data ?? []).map((item) => ({
              label: item.designation,
              value: item.id,
            }))
      );
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Failed to search');
        setOptions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const performSearch = React.useCallback(fetchAction, [onSearch, minSearchLength]);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setInputValue(query);
      setOpen(true);

      // Debounce the search
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }

      debounceRef.current = window.setTimeout(() => {
        performSearch(query);
      }, debounceMs);
    },
    [debounceMs, performSearch]
  );

  const handleSelect = React.useCallback(
    (option: MultiSearchInputOption) => {
      setSelectedItems((prev) => {
        const isSelected = prev.some((item) => item.value === option.value);
        const newItems = isSelected
          ? prev.filter((item) => item.value !== option.value)
          : [...prev, option];

        // Call onChange with the new values
        onChange?.(newItems.map((item) => item.value));
        return newItems;
      });

      setInputValue('');
      setOptions([]);
      inputRef.current?.focus();
    },
    [onChange]
  );

  const handleRemove = React.useCallback(
    (value: string) => {
      setSelectedItems((prev) => {
        const newItems = prev.filter((item) => item.value !== value);
        onChange?.(newItems.map((item) => item.value));
        return newItems;
      });
    },
    [onChange]
  );

  const handleFocus = React.useCallback(() => {
    setOpen(true);
    if (loadInitial && inputValue.length < minSearchLength && options.length === 0) {
      performSearch('', true);
    }
  }, [loadInitial, inputValue.length, minSearchLength, options.length, performSearch]);

  // Load initial items on mount if loadInitial is true
  React.useEffect(() => {
    if (loadInitial && options.length === 0 && !loading) {
      performSearch('', true);
    }
  }, [loadInitial]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleOpenAutoFocus = React.useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  const handleCloseAutoFocus = React.useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  const handleInteractOutside = React.useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-radix-popper-anchor]')) {
      return;
    }
    setOpen(false);
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
        // Remove last item on backspace when input is empty
        handleRemove(selectedItems[selectedItems.length - 1].value);
      }
    },
    [inputValue, selectedItems, handleRemove]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className={cx('relative', inputClassName)}>
          <div
            className={cx(
              'flex h-full w-full flex-wrap items-center gap-1.5 rounded-md border px-2.5 py-1.5',
              'border-gray-300 dark:border-gray-800',
              'bg-white dark:bg-gray-950',
              'focus-within:ring-2 focus-within:ring-blue-200 focus-within:dark:ring-blue-800/20',
              'disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {selectedItems.map((item) => (
              <span
                key={item.value}
                className={cx(
                  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm',
                  'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                )}
              >
                {item.label}
                <button
                  type="button"
                  className="hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.value);
                  }}
                  tabIndex={-1}
                >
                  <RiCloseLine className="size-3.5" />
                </button>
              </span>
            ))}
            <input
              type="hidden"
              name={name}
              value={selectedItems.map((item) => item.value).join(',')}
            />
            <input
              ref={inputRef}
              // name={name}
              type="text"
              placeholder={selectedItems.length === 0 ? placeholder : ''}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className={cx(
                'h-full flex-1 bg-transparent text-sm outline-none',
                'placeholder:text-gray-400 dark:placeholder:text-gray-500'
              )}
            />
            <div className="pointer-events-none flex items-center">
              {loading ? (
                <RiLoader2Line className="size-4 animate-spin text-gray-400" />
              ) : (
                <RiSearchLine className="size-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="max-h-60 w-[var(--radix-popover-trigger-width)] overflow-auto p-0"
        align="start"
        sideOffset={5}
        onOpenAutoFocus={handleOpenAutoFocus}
        onCloseAutoFocus={handleCloseAutoFocus}
        onInteractOutside={handleInteractOutside}
      >
        {loading ? (
          <div className="px-3 py-2 text-sm text-gray-500">{loadingText}</div>
        ) : error ? (
          <div className="px-3 py-2 text-sm text-red-500">{error}</div>
        ) : options.length === 0 && inputValue.length >= minSearchLength ? (
          <div className="px-3 py-2 text-sm text-gray-500">{noResultsText}</div>
        ) : options.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500">
            Type at least {minSearchLength} character{minSearchLength > 1 ? 's' : ''} to search
          </div>
        ) : (
          <ul className="m-0 p-0">
            {options.map((option) => {
              const isSelected = selectedItems.some((item) => item.value === option.value);
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    className={cx(
                      'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      'focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800',
                      isSelected && 'bg-gray-100 dark:bg-gray-800'
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    <div
                      className={cx(
                        'flex h-4 w-4 items-center justify-center rounded border',
                        isSelected
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      )}
                    >
                      {isSelected && (
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M10.28 2.28L4 8.56 1.72 6.28a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06z" />
                        </svg>
                      )}
                    </div>
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
