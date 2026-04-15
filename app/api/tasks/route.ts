import * as yup from 'yup';
import * as service from '@services/taskService';
import { ApiResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    const tasks = await service.getAllTasks();
    return ApiResponse.success(tasks);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error get tasks';

    return ApiResponse.error(message);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await service.createTask(body);
    return ApiResponse.created(created);
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) return ApiResponse.badRequest(err.message, err.errors);

    const message = err instanceof Error ? err.message : 'Error creating task';
    if (message.includes('Unexpected end of JSON input'))
      return ApiResponse.badRequest('Invalid JSON payload');

    return ApiResponse.error(message);
  }
}
