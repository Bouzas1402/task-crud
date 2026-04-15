'use client';

import React from 'react';
import Link from 'next/link';
import { Task } from '@/types/task';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default function TaskRow({ task }: { task: Optional<Task, 'estado'> }) {
  return (
    <li className="rounded border p-3">
      <Link
        href={`/tasks/${task.id}`}
        className="w-full bg-transparent p-0 text-left"
        aria-label={`Ver detalles de ${task.titulo}`}
      >
        <div>
          <div className="font-medium">{task.titulo}</div>
          {task.descripcion && <div className="text-sm text-gray-600">{task.descripcion}</div>}
        </div>
        {task.estado && <div className="text-xs text-gray-500">{task.estado}</div>}{' '}
      </Link>
    </li>
  );
}
