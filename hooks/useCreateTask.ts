'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { api } from '@/lib/axios';
import { taskSchema } from '@/schemas/taskSchema';

type FormValues = yup.InferType<typeof taskSchema>;

export function useCreateTask() {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(taskSchema),

    defaultValues: { titulo: '', descripcion: '' }
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await api.post('/tasks', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Tarea creada exitosamente');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      reset();
    },
    onError: error => toast.error(error instanceof Error ? error.message : 'Error creando la tarea')
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
