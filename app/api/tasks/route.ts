import { NextResponse } from 'next/server';
import * as yup from 'yup';
import * as service from '@services/taskService';

export async function GET() {
  try {
    const tasks = await service.getAllTasks();
    return NextResponse.json(tasks);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error fetching tasks';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await service.createTask(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof yup.ValidationError) {
      return NextResponse.json({ errors: err.errors }, { status: 400 });
    }
    const message = err instanceof Error ? err.message : 'Error creating task';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
