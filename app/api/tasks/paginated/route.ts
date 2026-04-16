import * as service from '@/services/taskService';
import { ApiResponse } from '@/lib/apiResponse';
import { AppError } from '@/lib/appError';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page'));
    const limit = Number(searchParams.get('limit'));

    const tasks = await service.getPaginatedTasks({ page, limit });
    return ApiResponse.success(tasks);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error get tasks';
    if (err instanceof AppError) {
      if (message.includes('Validation error')) {
        return ApiResponse.badRequest(err.message, err.errors);
      }
    }

    return ApiResponse.error(message);
  }
}
