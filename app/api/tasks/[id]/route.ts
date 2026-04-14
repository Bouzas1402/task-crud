import { NextResponse } from 'next/server';
import * as yup from 'yup';
import * as service from '@services/taskService';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = params;
    const task = await service.getTaskById(id);

    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    return NextResponse.json(task);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error fetching task';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();

    const updated = await service.updateTask(id, body);

    if (!updated) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Error updating task';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = params;
    const removed = await service.deleteTask(id);
    if (!removed) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error deleting task';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
