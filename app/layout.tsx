import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import clsx from 'clsx';
import { ReactQueryProvider } from '@providers/reactQueryProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
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
    <html
      lang="en"
      className={clsx(geistSans.variable, geistMono.variable, 'h-full', 'antialiased')}
    >
      <body className="flex min-h-full flex-col">
        {' '}
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
