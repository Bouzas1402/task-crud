'use client';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
interface DeleteTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  taskId: string;
  title: string;
}

const DeleteTaskModal = ({ open, onClose, onSuccess, taskId, title }: DeleteTaskModalProps) => {
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
    <Modal
      className="px-[24px] py-[32px]"
      open={open}
      onClose={onClose}
      title={`Eliminar tarea: ${title}`}
    >
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
};

export default DeleteTaskModal;
