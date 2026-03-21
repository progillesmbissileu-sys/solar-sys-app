import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" disableTransitionOnChange attribute="class">
      <div className="bg-foreground dark:bg-foreground-dark">{children}</div>
    </ThemeProvider>
  );
}
