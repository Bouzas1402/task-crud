'use client';

import clsx from 'clsx';
import React from 'react';

type Props = {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
};

const ErrorMessage = ({ message = 'Ha ocurrido un error', icon, className }: Props) => {
  return (
    <div className={clsx(className, 'flex items-center justify-center text-red-600')} role="alert">
      <span className="flex h-5 w-5 items-center justify-center">
        {icon ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l5.518 9.805c.75 1.332-.213 2.996-1.723 2.996H4.462c-1.51 0-2.473-1.664-1.723-2.996L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <span className="ml-2 text-2xl">{message}</span>
    </div>
  );
};

export default ErrorMessage;
