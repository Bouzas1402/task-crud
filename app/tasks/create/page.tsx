'use client';

import React from 'react';

import { Controller } from 'react-hook-form';
import { useCreateTask } from '@/hooks/useCreateTask';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';

export default function CreateTaskPage() {
  const { isLoading, control, errors, handleSubmit } = useCreateTask();

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Crear tarea</h1>

      <form id="new-task-form" onSubmit={handleSubmit()} className="space-y-4">
        <div>
          <Controller
            name="titulo"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Título"
                placeholder="Título de la tarea"
                description="Esto ayudará a identificar la tarea fácilmente"
                error={!!errors.titulo}
                errorMessage={errors.titulo?.message}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Descripción"
                placeholder="Descripción de la tarea"
                description="Añade más información para entender mejor la tarea"
                error={!!errors.descripcion}
                errorMessage={errors.descripcion?.message}
                rows={10}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="submit" className="w-[200px]" form="new-task-form" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Crear'}
          </Button>
        </div>
      </form>
    </main>
  );
}
