'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import clsx from 'clsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ open, onClose, title, children, className }, ref) => {
    const internalRef = useRef<HTMLDialogElement>(null);
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) || internalRef;

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
      } else if (!open && dialog.open) {
        dialog.close();
      }
    }, [open, dialogRef]);

    return (
      <dialog
        ref={dialogRef}
        onClose={onClose}
        onClick={e => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className={clsx(className, 'm-auto w-full max-w-md rounded-lg p-4 backdrop:bg-black/40')}
      >
        <div>
          {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}

          {children}
        </div>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
