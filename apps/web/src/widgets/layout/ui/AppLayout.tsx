import {AppHeader} from "./components/AppHeader";

export default function AppLayout({children}:{children: React.ReactNode}) {

    return <div>
        <AppHeader/>
        <main>
            {children}
        </main>
        <footer className="bg-dark mt-2">
            <div className="container text-[15px] h-14 text-yellow-500 flex justify-between items-center">
                <p>Copyright {new Date().getFullYear()} IT&#39;s Services</p>
            </div>
        </footer>
    </div>
}