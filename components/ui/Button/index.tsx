'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import {
  ButtonVariant,
  ButtonColor,
  buttonColorClass,
  buttonShadowColor
} from '@/ui/SharedButton/shared';

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
          'btn-base rounded-xl px-4 py-2 shadow-md transition-colors hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50',
          buttonColorClass(color, variant),
          buttonShadowColor(color),
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
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

export default Button;
