'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useDeleteTask } from '@/hooks/useDeleteTask';

interface DeleteTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  taskId: string;
}

export function DeleteTaskModal({ open, onClose, onSuccess, taskId }: DeleteTaskModalProps) {
  const { deleteTask, isLoading } = useDeleteTask();

  const handleDelete = () => {
    deleteTask(taskId, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Eliminar tarea">
      <p className="mb-4">¿Estás seguro de que quieres eliminar esta tarea?</p>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>

        <Button variant="outline" color="danger" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </div>
    </Modal>
  );
}
