import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/tasks/route';
import * as repo from '@/repositories/taskRepository';

const urlRoot = 'http://localhost';

describe('POST /api/tasks (mock repo)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('crea tarea correctamente', async () => {
    vi.spyOn(repo, 'create').mockImplementation(async task => task);

    const req = new Request(`${urlRoot}/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ titulo: 'Nueva tarea' })
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.data.titulo).toBe('Nueva tarea');
  });

  it('falla si falta título (Yup REAL)', async () => {
    const req = new Request(`${urlRoot}/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({})
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.message).toBe('El título es obligatorio');
  });

  it('POST devuelve 500 si repo falla', async () => {
    vi.spyOn(repo, 'create').mockRejectedValue(new Error('DB fail'));

    const req = new Request(`${urlRoot}/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ titulo: 'Test' })
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
  });
});
