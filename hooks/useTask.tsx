'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@lib/api/axios';
import { Task } from '@/types/task';

export function useTask() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useQuery<Task, Error>({
    queryKey: ['task', id],
    queryFn: async () => {
      const res = await api.get<Task>(`/tasks/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const task = useMemo(() => data || undefined, [data]);

  return { task, isLoading, isError };
}
