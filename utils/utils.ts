import { promises as fs } from 'fs';
import path from 'path';
import { Task } from '@/types/task';

const filePath = path.join(process.cwd(), 'data', 'task.json');

export async function readData(): Promise<Task[]> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Task[];
  } catch (err: unknown) {
    throw err;
  }
}

export async function writeData(tasks: Task[]) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
}
