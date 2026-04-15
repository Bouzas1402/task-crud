import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/providers/reactQueryProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Task CRUD App',
  description: 'Apliación para la gestión de tareas'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={clsx(inter.variable, 'h-full', 'antialiased')}>
      <body className="text-text-base flex min-h-full flex-col">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
