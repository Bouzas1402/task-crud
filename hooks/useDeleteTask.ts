'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation<void, Error, string>({
    mutationFn: async id => {
      if (!id) {
        throw new Error('Task id is required');
      }

      await api.delete(`/tasks/${id}`);
    },

    onSuccess: id => {
      toast.success('Tarea eliminada');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', id] });
    },

    onError: error => {
      toast.error(error instanceof Error ? error.message : 'Error eliminando la tarea');
    }
  });

  return {
    deleteTask: mutate,
    isLoading: isPending,
    isError
  };
}
