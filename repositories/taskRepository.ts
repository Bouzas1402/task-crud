import { Task } from '@/types/task';
import { readData, writeData } from '@/utils/utils';

export async function getAll(): Promise<Task[]> {
  return readData();
}

export async function getAllPaginated(offset: number, limit: number): Promise<Task[]> {
  const tasks = await readData();
  return tasks.slice(offset, offset + limit);
}

export async function getById(id: string): Promise<Task | undefined> {
  const tasks = await readData();
  return tasks.find(t => t.id === id);
}

export async function create(task: Task): Promise<Task> {
  const tasks = await readData();
  tasks.push(task);
  await writeData(tasks);
  return task;
}

export async function update(id: string, partial: Partial<Task>): Promise<Task | null> {
  const tasks = await readData();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const updated = { ...tasks[idx], ...partial } as Task;
  tasks[idx] = updated;
  await writeData(tasks);
  return updated;
}

export async function remove(id: string): Promise<boolean> {
  const tasks = await readData();
  const filtered = tasks.filter(t => t.id !== id);
  if (filtered.length === tasks.length) return false;
  await writeData(filtered);
  return true;
}

export async function count(): Promise<number> {
  const tasks = await readData();
  return tasks.length;
}
