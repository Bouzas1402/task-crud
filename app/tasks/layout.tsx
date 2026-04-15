'use client';
import { Suspense } from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();

  const isTasks = !segment;
  const isCreate = segment === 'create';

  return (
    <>
      <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-transparent p-4">
        <div className="text-xl font-bold">Mis tareas</div>
        <div className="flex gap-2">
          <LinkButton hidden={isTasks} href="/tasks">
            Lista de tareas
          </LinkButton>

          <LinkButton hidden={isCreate} href="/tasks/create">
            Nueva tarea
          </LinkButton>
        </div>
      </header>
      <div className="pt-20">{children}</div>
    </>
  );
}
