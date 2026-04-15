'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { ButtonVariant, ButtonColor, buttonColorClass } from '@components/ui/SharedButton/shared';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'solid',
      color = 'primary',
      type = 'button',
      disabled,
      hidden,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        hidden={hidden}
        className={clsx(
          'btn-base cursor-pointer rounded px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          buttonColorClass(color, variant),
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
