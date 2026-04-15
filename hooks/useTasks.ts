'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Task } from '@/types/task';

export function useTasks() {
  const { data, isLoading, isError } = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get<Task[]>('/tasks');
      return res.data;
    }
  });

  const tasks = useMemo(() => data || [], [data]);

  return { tasks, isLoading, isError };
}
