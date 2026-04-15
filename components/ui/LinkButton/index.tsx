'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
  ButtonVariant,
  ButtonColor,
  buttonColorClass,
  buttonShadowColor
} from '@/components/ui/SharedButton/shared';
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
        'btn-base inline-flex items-center justify-center rounded-xl px-4 py-2 shadow-md transition-colors hover:shadow-lg',
        buttonColorClass(color, variant),
        buttonShadowColor(color)
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
