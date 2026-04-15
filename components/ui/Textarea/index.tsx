'use client';

import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  description?: string;
}

const DEFAULT_ERROR_MESSAGE = 'Este campo es obligatorio';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error = false, errorMessage, description, className, id, disabled, rows = 4, ...rest },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          id={inputId}
          ref={ref}
          disabled={disabled}
          rows={rows}
          className={clsx(
            'w-full resize-none rounded border px-3 py-2 text-sm transition-colors outline-none',
            error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500',
            disabled && 'cursor-not-allowed opacity-60',
            className
          )}
          {...rest}
        />

        {/* Error */}
        {error && (
          <p className="mt-1 text-xs text-red-500">{errorMessage || DEFAULT_ERROR_MESSAGE}</p>
        )}

        {/* Description */}
        {!error && description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
