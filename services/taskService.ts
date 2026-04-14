import { v7 as uuidv7 } from 'uuid';
import { Task } from '@/types/task';
import * as repo from '@repositories/taskRepository';
import { taskSchema } from '@/schemas/taskSchema';

export async function getAllTasks(): Promise<Task[]> {
  return repo.getAll();
}

export async function getTaskById(id: string): Promise<Task | null> {
  const t = await repo.getById(id);
  return t ?? null;
}

export async function createTask(payload: unknown): Promise<Task> {
  // Validar todo el payload para POST
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
  // Validar parcialmente para PATCH
  const validPartial = await taskSchema.partial().validate(partial, { abortEarly: false });
  return repo.update(id, validPartial as Partial<Task>);
}

export async function deleteTask(id: string): Promise<boolean> {
  return repo.remove(id);
}
