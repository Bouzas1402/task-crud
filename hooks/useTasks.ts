'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Task } from '@/types/task';

type TasksResponse = {
  data: Task[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export const useTasks = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<TasksResponse, Error>({
    queryKey: ['tasks', page],
    queryFn: async () => {
      const res = await api.get<TasksResponse>(`/tasks/paginated?page=${page}&limit=5`);
      return res.data;
    }
  });

  const tasks = useMemo(() => data?.data || [], [data]);
  const totalPages = data?.pagination?.totalPages;

  return { tasks, totalPages, page, setPage, isLoading, isError };
};
