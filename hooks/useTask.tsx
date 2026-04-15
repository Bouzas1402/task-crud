'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Task } from '@/types/task';

export const useTask = (id: string) => {
  const { data, isLoading, isError, error } = useQuery<Task, Error>({
    queryKey: ['task', id],
    queryFn: async () => {
      const res = await api.get<Task>(`/tasks/${id}`);
      return res.data;
    },

    enabled: !!id
  });

  const task = useMemo(() => data || undefined, [data]);

  return { task, isLoading, isError, messageError: error?.message };
};
