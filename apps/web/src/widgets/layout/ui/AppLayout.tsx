import { AppHeader } from './components/AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
      <footer className="bg-dark mt-2">
        <div className="container flex h-14 items-center justify-between text-[15px] text-yellow-500">
          <p>Copyright {new Date().getFullYear()} IT&#39;s Services</p>
        </div>
      </footer>
    </div>
  );
}
