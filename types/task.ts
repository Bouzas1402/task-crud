export type Task = {
  id: string;
  titulo: string;
  descripcion?: string;
  estado: 'PENDIENTE' | 'COMPLETADA';
};
