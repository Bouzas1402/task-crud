'use client';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@lib/api/axios';
import { toast } from 'sonner';
import { Task } from '@/types/task';
import { updateTaskSchema } from '@schemas/taskSchema';

export type FormValues = yup.InferType<typeof updateTaskSchema>;

export function useUpdateTask({ task }: { task?: Task }) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(updateTaskSchema),
    defaultValues: { titulo: '', descripcion: '', estado: undefined }
  });

  useEffect(() => {
    if (task) {
      reset({
        titulo: task.titulo,
        descripcion: task.descripcion || '',
        estado: task.estado || ''
      });
    }
  }, [task, reset]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!task) {
        toast.error('Se requiere el id de la tarea para actualizar');
        throw new Error('Se requiere el id de la tarea para actualizar');
      }
      const res = await api.patch<Task>(`/tasks/${task.id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Tarea actualizada');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', task?.id] });
    },
    onError: error =>
      toast.error(error instanceof Error ? error.message : 'Error actualizando la tarea')
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return {
    mutate,
    isLoading: isPending || isSubmitting,
    isError,
    control,
    errors,
    handleSubmit: () => handleSubmit(onSubmit)
  };
}
