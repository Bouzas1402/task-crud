import * as yup from 'yup';

export const taskSchema = yup.object({
  titulo: yup.string().required('El título es obligatorio'),
  descripcion: yup.string().optional(),
  estado: yup.mixed<'PENDIENTE' | 'COMPLETADA'>().oneOf(['PENDIENTE', 'COMPLETADA']).notRequired()
});

// 👇 clave
export const updateTaskSchema = taskSchema.partial();
