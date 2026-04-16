import { v7 as uuidv7 } from 'uuid';
import { Task } from '@/types/task';
import * as repo from '@/repositories/taskRepository';
import { taskSchema } from '@/schemas/taskSchema';
import { AppError } from '@/lib/appError';

export async function getAllTasks(): Promise<Task[]> {
  return repo.getAll();
}

export async function getPaginatedTasks({ page, limit }: { page?: number; limit?: number }) {
  const errors: string[] = [];

  if (page === undefined) {
    errors.push('page is required');
  } else if (Number.isNaN(page) || page < 1) {
    errors.push('page must be a number greater than 0');
  }

  if (limit === undefined) {
    errors.push('limit is required');
  } else if (Number.isNaN(limit) || limit < 1) {
    errors.push('limit must be a number greater than 0');
  }

  if (errors.length > 0) {
    throw new AppError('Validation error', 400, errors);
  }

  const offset = (page! - 1) * limit!;

  const [data, totalItems] = await Promise.all([
    repo.getAllPaginated(offset, limit!),
    repo.count()
  ]);

  const totalPages = Math.ceil(totalItems / limit!);

  return {
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  };
}

export async function getTaskById(id: string): Promise<Task | null> {
  const t = await repo.getById(id);
  return t ?? null;
}

export async function createTask(payload: unknown): Promise<Task> {
  const valid = await taskSchema.validate(payload, { abortEarly: false });

  const newTask: Task = {
    id: uuidv7(),
    titulo: valid.titulo,
    descripcion: valid.descripcion,
    estado: 'PENDIENTE'
  };
  return repo.create(newTask);
}

export async function updateTask(
  id: string,
  partial: Partial<Task> | unknown
): Promise<Task | null> {
  const validPartial = await taskSchema.partial().validate(partial, { abortEarly: false });
  return repo.update(id, validPartial as Partial<Task>);
}

export async function deleteTask(id: string): Promise<boolean> {
  return repo.remove(id);
}
