import '@/app/styles/globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoururl.com'),
  title: 'Admin | Dashboard',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`bg-white-50 h-full antialiased dark:bg-gray-950`}>{children}</body>
    </html>
  );
}
