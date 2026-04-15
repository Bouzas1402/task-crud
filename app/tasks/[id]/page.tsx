'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { CiTrash } from 'react-icons/ci';
import { useTask } from '@/hooks/useTask';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import DeleteTaskModal from '@/components/task/DeleteTaskModal';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Textarea from '@/ui/Textarea';
import Loading from '@/ui/Loading';
import ErrorMessage from '@/ui/ErrorMessage';
import Switch from '@/ui/Swicht';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const id = params?.id as string;

  const {
    task,
    isLoading: isLoadingTask,
    isError: errorTask,
    messageError: errorMessage
  } = useTask(id);
  const { control, errors, isLoading, handleSubmit } = useUpdateTask({ task });

  if (isLoadingTask) return <Loading size={80} />;
  if (errorTask) return <ErrorMessage message={errorMessage} />;
  return (
    <>
      <DeleteTaskModal
        open={open}
        onClose={() => setOpen(false)}
        taskId={id}
        onSuccess={() => {
          setTimeout(() => router.push('/tasks'), 1000);
        }}
      />
      <main className="mx-auto max-w-xl p-6">
        <div className="flex justify-between">
          <h1 className="mb-6 text-2xl font-semibold">Editar tarea</h1>

          <Button
            className="h-full !p-0"
            variant="ghost"
            color="danger"
            onClick={() => setOpen(true)}
          >
            <CiTrash size={24} title="Borrar tarea" />
          </Button>
        </div>

        <form id="edit-task-form" onSubmit={handleSubmit()} className="space-y-4">
          <div>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Título"
                  placeholder="Título de la tarea"
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
                  error={!!errors.descripcion}
                  errorMessage={errors.descripcion?.message}
                  rows={10}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value === 'COMPLETADA'}
                  onChange={e => field.onChange(e.target.checked ? 'COMPLETADA' : 'PENDIENTE')}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  label="Estado"
                />
              )}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              form="edit-task-form"
              className="w-[200px]"
              disabled={isLoading || isLoadingTask}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button type="button" color="neutral" variant="ghost" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
