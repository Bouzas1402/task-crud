'use client';

import React from 'react';
import Link from 'next/link';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import { Switch } from '@/components/ui/Swicht';
import { Task } from '@/types/task';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default function TaskRow({ task }: { task: Optional<Task, 'estado'> }) {
  const { mutate, isLoading } = useUpdateTask({ task: task as Task });

  const handleToggle = (checked: boolean) => {
    const newEstado = checked ? 'COMPLETADA' : 'PENDIENTE';
    mutate({ estado: newEstado });
  };

  return (
    <li className="rounded border p-3">
      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/tasks/${task.id}`}
          className="w-full bg-transparent p-0 text-left"
          aria-label={`Ver detalles de ${task.titulo}`}
        >
          <div>
            <div className="font-medium">{task.titulo}</div>
            {task.descripcion && <div className="text-sm text-gray-600">{task.descripcion}</div>}
          </div>
        </Link>

        <div className="text-xs whitespace-nowrap text-gray-500">
          <Switch
            checked={task.estado === 'COMPLETADA'}
            onChange={e => handleToggle(e.target.checked)}
            disabled={isLoading}
            variant="solid"
            colorOn="success"
            colorOff="danger"
            aria-label={`Marcar ${task.titulo} como completada`}
          />
        </div>
      </div>
    </li>
  );
}
