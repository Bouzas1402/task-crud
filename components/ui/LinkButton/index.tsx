'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { ButtonVariant, ButtonColor, buttonColorClass } from '@/components/ui/SharedButton/shared';
interface LinkButtonProps {
  href: string;
  hidden?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

const LinkButton = ({
  href,
  hidden,
  children,
  variant = 'solid',
  color = 'primary',
  className
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      hidden={hidden}
      className={clsx(
        className,
        'btn-base inline-flex items-center justify-center rounded px-4 py-2 text-white transition-colors',
        buttonColorClass(color, variant)
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
