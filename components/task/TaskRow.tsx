'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { CiTrash } from 'react-icons/ci';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import DeleteTaskModal from './DeleteTaskModal';
import Switch from '@/ui/Swicht';
import Button from '@/ui/Button';
import { Task } from '@/types/task';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const TaskRow = ({ task }: { task: Optional<Task, 'estado'> }) => {
  const [open, setOpen] = useState(false);

  const { mutate, isLoading } = useUpdateTask({ task: task as Task });

  const handleToggle = (checked: boolean) => {
    const newEstado = checked ? 'COMPLETADA' : 'PENDIENTE';
    mutate({ estado: newEstado });
  };

  return (
    <>
      <DeleteTaskModal
        open={open}
        onClose={() => setOpen(false)}
        taskId={task.id}
        title={task.titulo}
      />
      <li className="group border-border/60 rounded-xl border bg-white/80 p-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg">
        <div className="flex items-stretch justify-between gap-4">
          <Link
            href={`/tasks/${task.id}`}
            className="w-full bg-transparent p-0 text-left"
            aria-label={`Ver detalles de ${task.titulo}`}
          >
            <div>
              <div className="mb-2 font-semibold">{task.titulo}</div>
              {task.descripcion && <div className="text-sm text-gray-600">{task.descripcion}</div>}
            </div>
          </Link>

          <div className="flex flex-col items-end justify-between gap-4 self-stretch">
            <Switch
              checked={task.estado === 'COMPLETADA'}
              onChange={e => handleToggle(e.target.checked)}
              disabled={isLoading}
              variant="solid"
              colorOn="success"
              colorOff="danger"
              aria-label={`Marcar ${task.titulo} como completada`}
            />
            <Button variant="ghost" color="danger" onClick={() => setOpen(true)}>
              <CiTrash size={24} title="Borrar tarea" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default TaskRow;
