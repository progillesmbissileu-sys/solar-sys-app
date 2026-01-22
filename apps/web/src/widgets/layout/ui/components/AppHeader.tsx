import {CalendarCheck, MapPin, Phone} from "lucide-react";
import Image from "next/image";
import {APP_ROUTES} from "@/shared/config/app-routes";
import Link from "next/link";

const menu = [
    {
        title: "Accueil",
        url: APP_ROUTES.HOME
    },
    {
        title: "Boutique",
        url: APP_ROUTES.IN_STORE
    },
    {
      title: "Services",
      url: APP_ROUTES.SERVICES
    },
    {
        title: "Cas d'etudes",
        url: APP_ROUTES.CASE_STUDIES
    },
]

export function AppHeader() {

    return (
        <div>
            <section className="w-full  lg:h-14 ">
                <div className="relative h-full flex justify-between">
                    <aside className="bg-dark w-full xl:[clip-path:polygon(0_0,60%_0,70%_100%,0_100%)]">
                        <div className="container content-center h-full">
                            <ul className="flex gap-x-12">
                                <li className="text-yellow-500 flex gap-x-2 font-montserrat-sans">
                            <CalendarCheck size={17}/>
                                    <span className="text-[15px]">Ouvert Lun - Dim / 07h-19h</span>
                                </li>
                                <li className="text-yellow-500 flex gap-x-2 font-montserrat-sans">
                            <MapPin size={17}/>
                                    <span className="text-[15px]">Yaounde, Lycee Bilingue Essos</span>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <aside
                        className="bg-yellow-500 absolute w-full h-full top-0 right-0 [clip-path:polygon(60%_0,100%_0,100%_100%,70%_100%)]">
                        <div className="container content-center h-full">
                            <ul className="flex gap-x-12 justify-end">
                                <li className="text-dark flex gap-x-2 font-sans items-center">
                                    <Phone size={17}/>
                                    <span className="text-[15px] font-medium">(+237) 655 55 55 90 - 675 75 75 30</span>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>
            <section className="container h-20 flex overflow-hidden items-center justify-between">
                <div className="xl:basis-1/3">
                    <a href="/apps/web/public">
                        <figure>
                            <Image src="logo.svg" alt="Logo de l'entreprise" width={56} height={100}/>
                        </figure>
                    </a>
                </div>
                <nav className="xl:basis-1/3">
                    <ul className="flex justify-between gap-x-3 lg:gap-x-6 xl:gap-x-12 font-family-sans font-medium">
                        {menu.map((item) => (
                            <li>
                                <Link prefetch href={item.url}
                                   >{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-x-3 xl:gap-x-8 xl:basis-1/3 justify-end">
                    <div>
                        <div>
                            <label>
                                <input className="rounded-full lg:w-64 py-2.5 px-3 border text-sm border-gray-300"
                                       type="search" placeholder="Rechercher"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="fi fi-{{ app.request.locale == 'en' ? 'gb' : app.request.locale }}"></div>
                        lang-switcher
                    </div>
                </div>
            </section>
        </div>
    )
}