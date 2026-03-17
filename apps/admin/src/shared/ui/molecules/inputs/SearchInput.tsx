'use client';

import React from 'react';
import { Input } from '../../atoms/Input';
import { Popover, PopoverContent, PopoverAnchor } from '../../atoms/Popover';
import { cx } from '@/shared/lib/utils';
import { RiLoader2Line, RiSearchLine } from '@remixicon/react';
import { CollectionResponseType, Result } from '@/shared/api';

export type SearchInputOption = {
  label: string;
  value: string;
};

export type SearchInputProps = {
  onChange?: (value: string) => void;
  onSearch: (query: string) => Promise<Result<CollectionResponseType<any>>>;
  placeholder?: string;
  debounceMs?: number;
  minSearchLength?: number;
  loadingText?: string;
  noResultsText?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  name?: string;
  displayValue?: string;
  parseCallback?: (record: any) => SearchInputOption;
  loadInitial?: boolean;
};

export function SearchInput({
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  minSearchLength = 1,
  loadingText = 'Loading...',
  noResultsText = 'No results found',
  className,
  disabled = false,
  value: controlledValue,
  defaultValue,
  name,
  displayValue: controlledDisplayValue,
  parseCallback,
  loadInitial = false,
}: SearchInputProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(controlledDisplayValue ?? '');
  const [selectedValue, setSelectedValue] = React.useState(controlledValue ?? defaultValue ?? '');
  const [options, setOptions] = React.useState<SearchInputOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const debounceRef = React.useRef<number | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // Sync controlled value changes
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  // Sync controlled display value changes
  React.useEffect(() => {
    if (controlledDisplayValue !== undefined) {
      setInputValue(controlledDisplayValue);
    }
  }, [controlledDisplayValue]);

  const performSearch = React.useCallback(
    async (query: string, skipMinLengthCheck = false) => {
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
    },
    [onSearch, minSearchLength]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setInputValue(query);
      setOpen(true);

      // Clear selection when user types
      if (selectedValue) {
        setSelectedValue('');
        onChange?.('');
      }

      // Debounce the search
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }

      debounceRef.current = window.setTimeout(() => {
        performSearch(query);
      }, debounceMs);
    },
    [selectedValue, onChange, debounceMs, performSearch]
  );

  const handleSelect = React.useCallback(
    (option: SearchInputOption) => {
      setSelectedValue(option.value);
      setInputValue(option.label);
      setOptions([]);
      setOpen(false);
      onChange?.(option.value);
    },
    [onChange]
  );

  // Load initial items on mount if loadInitial is true
  React.useEffect(() => {
    if (loadInitial && options.length === 0 && !loading) {
      performSearch('', true);
    }
  }, [loadInitial]);

  const handleFocus = React.useCallback(() => {
    setOpen(true);
    // Load items on focus if loadInitial and no query
    if (loadInitial && inputValue.length < minSearchLength && options.length === 0) {
      performSearch('', true);
    }
  }, [loadInitial, inputValue.length, minSearchLength, options.length, performSearch]);

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
    // Prevent popover from stealing focus from input
    event.preventDefault();
  }, []);

  const handleCloseAutoFocus = React.useCallback((event: Event) => {
    // Prevent focus from returning to trigger on close
    event.preventDefault();
  }, []);

  const handleInteractOutside = React.useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    // Don't close if clicking on the input itself
    if (target.closest('[data-radix-popper-anchor]')) {
      return;
    }
    setOpen(false);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className={cx('relative', className)}>
          <Input
            name={name}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            disabled={disabled}
            className="pr-8"
          />
          <div className="pointer-events-none absolute right-0 top-0 flex h-full items-center justify-center px-3">
            {loading ? (
              <RiLoader2Line className="size-4 animate-spin text-gray-400" />
            ) : (
              <RiSearchLine className="size-4 text-gray-400" />
            )}
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
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={cx(
                    'w-full px-3 py-2 text-left text-sm transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    'focus:bg-gray-100 focus:outline-none dark:focus:bg-gray-800',
                    selectedValue === option.value && 'bg-gray-100 dark:bg-gray-800'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
