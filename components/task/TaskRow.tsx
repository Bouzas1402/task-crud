'use client';

import React from 'react';
import { Task } from '@/types/task';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default function TaskRow({ task }: { task: Optional<Task, 'estado'> }) {
  return (
    <li className="rounded border p-3">
      <div className="font-medium">{task.titulo}</div>
      {task.descripcion && <div className="text-sm text-gray-600">{task.descripcion}</div>}
      {task.estado && <div className="text-xs text-gray-500">{task.estado}</div>}
    </li>
  );
}
