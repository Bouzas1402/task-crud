'use client';

import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';
import TaskRow from '@/components/task/TaskRow';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function TasksPage() {
  const { tasks, isLoading, isError } = useTasks();

  if (isLoading) return <Loading size={80} text="Cargando tareas..." />;
  if (isError) return <ErrorMessage message="Error al cargar tareas" />;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Lista de Tareas</h1>{' '}
      <ul className="space-y-3">
        {!tasks || tasks.length === 0 ? (
          <TaskRow
            task={{
              id: 'no-tasks',
              titulo: 'No hay tareas',
              descripcion: 'No se encontraron tareas para mostrar.'
            }}
          />
        ) : (
          <>
            {tasks.map((t: Task) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </>
        )}
      </ul>
    </main>
  );
}
