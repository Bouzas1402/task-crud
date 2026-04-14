'use client';

import { LinkButton } from '@/components/ui/LinkButton';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();

  const isCreate = segment === 'create';

  const href = isCreate ? '/tasks' : '/tasks/create';
  const textButton = isCreate ? 'Lista de tareas' : 'Nueva tarea';

  return (
    <>
      <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-transparent p-4">
        <div className="text-xl font-bold">Mis tareas</div>
        <LinkButton href={href}>{textButton}</LinkButton>
      </header>
      <div className="pt-20">{children}</div>
    </>
  );
}
