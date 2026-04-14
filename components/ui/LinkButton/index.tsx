'use client';

import Link from 'next/link';
import clsx from 'clsx';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  color?: ButtonColor;
}

import { ButtonColor, buttonColorClass } from '@/components/ui/SharedButton/shared';

export function LinkButton({ href, children, className, color = 'primary' }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'btn-base inline-flex items-center justify-center rounded px-4 py-2 text-white transition-colors',
        buttonColorClass(color),
        className
      )}
    >
      {children}
    </Link>
  );
}
