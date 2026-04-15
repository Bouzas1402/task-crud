import * as yup from 'yup';
import * as service from '@services/taskService';
import { ApiResponse } from '@/lib/apiResponse';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const task = await service.getTaskById(id);

    if (!task) return ApiResponse.notFound('Task not found');

    return ApiResponse.success(task);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching task';

    return ApiResponse.error(message);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await service.updateTask(id, body);

    if (!updated) return ApiResponse.notFound('Task not found');

    return ApiResponse.success(updated);
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) return ApiResponse.badRequest(err.message, err.errors);

    const message = err instanceof Error ? err.message : 'Error updating task';

    if (message.includes('Unexpected end of JSON input'))
      return ApiResponse.badRequest('Invalid JSON payload');
    return ApiResponse.error(message);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const removed = await service.deleteTask(id);
    if (!removed) return ApiResponse.notFound('Task not found');
    return ApiResponse.success({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error deleting task';
    return ApiResponse.error(message);
  }
}
