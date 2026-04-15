'use client';

import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';

type SwitchVariant = 'solid' | 'outline';
type SwitchColor = 'success' | 'danger';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  description?: string;
  variant?: SwitchVariant;
  colorOn?: SwitchColor;
  colorOff?: SwitchColor;
}

const DEFAULT_ERROR_MESSAGE = 'Este campo es obligatorio';

const SWITCH_STYLES = {
  solid: {
    success: 'bg-green-500',
    danger: 'bg-red-500'
  },
  outline: {
    success: 'border border-green-500',
    danger: 'border border-red-500'
  }
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      error = false,
      errorMessage,
      description,
      className,
      id,
      disabled,
      checked,
      onChange,
      variant = 'solid',
      colorOn = 'success',
      colorOff = 'danger',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const bgClass = checked ? SWITCH_STYLES[variant][colorOn] : SWITCH_STYLES[variant][colorOff];

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        {/* Switch */}
        <label className="inline-flex cursor-pointer items-center">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className="sr-only"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            {...rest}
          />

          <div
            className={clsx(
              'relative h-6 w-11 rounded-full transition-colors',
              bgClass,
              disabled && 'cursor-not-allowed opacity-60',
              error && 'ring-2 ring-red-500',
              className
            )}
          >
            <span
              className={clsx(
                'absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform',
                checked ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </div>
        </label>

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

Switch.displayName = 'Switch';

export { Switch };
