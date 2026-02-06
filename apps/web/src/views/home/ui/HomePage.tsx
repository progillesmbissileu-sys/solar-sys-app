"use client";

import { ArrowRight } from "lucide-react";
import { HeroSectionComponent } from "./section/HeroSectionComponent";
import { ProductPreviewComponent } from "@/features/products";
import { products } from "@/shared/assets/data/products";
import { APP_ROUTES } from "@/shared/config/app-routes";
import Link from "next/link";
import { CompanyServicePreviewComponent } from "@/features/services";
import { services } from "@/shared/assets/data/services";
import { TestimonialsPreviewComponent } from "@/features/testimonials/ui/TestimonialsPreviewComponent";
import { testimonials } from "@/shared/assets/data/testimonials";
import { ProjectPreviewComponent } from "@/features/projects/ui/ProjectPreviewComponent";
import { projects } from "@/shared/assets/data/projects";
// import {EmbeddedMap} from "@repo/ui/map/EmbeddedMap";

export default function HomePage() {
  return (
    <div>
      <section>
        <HeroSectionComponent picturesList={["", "", ""]} />
      </section>
      <section className="container min-h-80 xl:py-24 lg:py-12 md:py-6 px-3 lg:space-y-12">
        <header className="flex justify-between items-start">
          <div className="space-y-3 xl:w-3/5">
            <h3 className="text-4xl font-semibold text-dark font-sans">
              Disponible en magasin
            </h3>
            <p className="text-md font-light lg:w-1/2">description</p>
          </div>
        </header>
        <main className="xl:space-y-12">
          <div className="space-y-12">
            <header className="flex justify-between items-end">
              <h4 className="w-fit xl:text-lg relative  font-medium !font-montserrat-sans">
                <span>Equipements solaires</span>
                <div className="h-1.5 w-full absolute -bottom-3 bg-yellow-500"></div>
              </h4>
              <Link href={APP_ROUTES.IN_STORE} className="block xl:basis-1/5">
                <div className="flex justify-end items-center gap-x-1.5 text-dark font-medium">
                  <span className="text-md">Voir tout</span>
                  <ArrowRight />
                </div>
              </Link>
            </header>
            <div>
              <ProductPreviewComponent
                previewList={products}
                path={`${APP_ROUTES.IN_STORE}`}
              />
            </div>
          </div>
          <div className="space-y-12">
            <header className="flex justify-between items-end">
              <h4 className="w-fit xl:text-lg relative !font-montserrat-sans font-medium">
                <span>Equipements electriques</span>
                <div className="h-1.5 w-full absolute -bottom-3 bg-yellow-500"></div>
              </h4>
              <Link href={APP_ROUTES.IN_STORE} className="block xl:basis-1/5">
                <div className="flex justify-end items-center gap-x-1.5 text-dark font-medium">
                  <span className="text-md">Voir tout</span>
                  <ArrowRight />
                </div>
              </Link>
            </header>
            <div>
              <ProductPreviewComponent
                previewList={products}
                path={`${APP_ROUTES.IN_STORE}`}
              />
            </div>
          </div>
        </main>
      </section>
      <section className="bg-contain h-fit w-full bg-center  relative">
        <div className="absolute top-0 -z-10 h-full w-full bg-dark bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]"></div>

        <div className="container min-h-80 xl:py-20 lg:py-8 md:py-6 px-3 lg:space-y-9 grid md:grid-cols-2">
          <aside className="content-center">
            <div className="space-y-3">
              <h3 className="text-[68px] text-yellow-500 leading-[100%] font-bold text-start  xl:w-3/5">
                Service title
              </h3>
              <p className="text-md font-light xl:w-3/5 text-start text-white/90">
                description
              </p>
            </div>
          </aside>
          <aside>
            <CompanyServicePreviewComponent
              previewList={services}
              path={APP_ROUTES.SERVICES}
            />
          </aside>
        </div>
      </section>
      <section className="h-fit w-full">
        <div className="container min-h-80 xl:py-20 lg:py-8 md:py-6 lg:space-y-9 grid md:grid-cols-3">
          <aside className="col-span-1">
            <div className="space-y-6">
              <h3 className="text-2xl text-yellow-500 font-medium font-montserrat-sans">
                .testimonials_title
              </h3>
              <p className="text-[68px] leading-[100%] font-bold text-start">
                .subtitle
              </p>
            </div>
          </aside>
          <aside className="col-span-2 xl:pl-36">
            <TestimonialsPreviewComponent previewList={testimonials} />
            <TestimonialsPreviewComponent previewList={testimonials} />
          </aside>
        </div>
      </section>
      <section className="xl:pt-6 xl:pb-24">
        <div className="container xl:space-y-12">
          <header className="flex justify-between items-end">
            <div className="xl:basis-1/2">
              <h3 className="text-[68px] xl:w-3/4  leading-[100%] font-bold text-start text-yellow-500">
                .project_title
              </h3>
            </div>
            <div className="bg-dark px-6 py-3 h-fit content-center text-center text-white">
              <a href="{{ sulu_content_path(case_study_path.url) }}">
                Tous les projects
              </a>
            </div>
          </header>
          <div>
            <ProjectPreviewComponent previewList={projects} />
          </div>
        </div>
      </section>
      <section>
        <div className="container grid lg:grid-cols-2 xl:py-24">
          <aside className="col-span-1 space-y-12">
            <h3 className="xl:text-[68px] text-dark xl:leading-10 font-bold text-start">
              .contact_title
            </h3>
            <ul className="space-y-6 xl:w-3/5 *:grid *:grid-cols-3 *:h-12 *:items-center *:*:last:col-span-2 *:*:last:font-montserrat-sans pl-1 text-dark">
              <li className="border-l-3 border-yellow-500 pl-3">
                <span>Telephone :</span>
                <span>(+237) 675 75 75 30</span>
              </li>
              <li className="border-l-3 border-dark pl-3 bg-gray-100">
                <span>Whatsapp : </span>
                <span>(+237) 655 55 55 90</span>
              </li>
              <li className="border-l-3 border-yellow-500 pl-3">
                <span>Email : </span>
                <span>scvpsd237@yahoo.com</span>
              </li>
              <li className="border-l-3 border-dark pl-3 bg-gray-100">
                <span>Localisation: </span>
                <span>Yaounde, Lycee Bilingue Essos</span>
              </li>
              <li className="border-l-3 border-yellow-500 pl-3">
                <span>Disponibilite: </span>
                <span>Ouvert Lun - Dim / 07h-19h</span>
              </li>
            </ul>
          </aside>
          <aside className="col-span-1 h-full">
            {/*{typeof window !== 'undefined' && <EmbeddedMap/>}*/}
          </aside>
        </div>
      </section>
    </div>
  );
}
