'use client';

import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  description?: string;
}

const DEFAULT_ERROR_MESSAGE = 'Este campo es obligatorio';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, errorMessage, description, className, id, disabled, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'w-full rounded border px-3 py-2 text-sm transition-colors outline-none',
            error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500',
            className
          )}
          {...rest}
        />

        {error && (
          <p className="mt-1 text-xs text-red-500">{errorMessage || DEFAULT_ERROR_MESSAGE}</p>
        )}

        {!error && description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
