'use client';

import clsx from 'clsx';
import { ButtonColor } from '@/components/ui/SharedButton/shared';

interface LoadingProps {
  size?: number;
  text?: string;
  color?: ButtonColor;
}

function getTextColor(color: ButtonColor) {
  const map = {
    primary: 'text-blue-500',
    neutral: 'text-slate-500',
    secondary: 'text-gray-500',
    success: 'text-green-500',
    danger: 'text-red-500'
  };

  return map[color];
}

export function Loading({ size = 20, text, color = 'primary' }: LoadingProps) {
  return (
    <div className="flex items-center justify-center p-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('animate-spin', getTextColor(color))}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>

      {text && <span className={clsx('ml-3 text-sm', getTextColor(color))}>{text}</span>}
    </div>
  );
}

export default Loading;
