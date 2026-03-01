'use client';

import { ArrowRight } from 'lucide-react';
import { HeroSectionComponent } from './section/HeroSectionComponent';
import { ProductPreviewComponent } from '@/features/products';
import { products } from '@/shared/assets/data/products';
import { APP_ROUTES } from '@/shared/config/app-routes';
import Link from 'next/link';
import { CompanyServicePreviewComponent } from '@/features/services';
import { services } from '@/shared/assets/data/services';
import { TestimonialsPreviewComponent } from '@/features/testimonials/ui/TestimonialsPreviewComponent';
import { testimonials } from '@/shared/assets/data/testimonials';
import { ProjectPreviewComponent } from '@/features/projects/ui/ProjectPreviewComponent';
import { projects } from '@/shared/assets/data/projects';
// import {EmbeddedMap} from "@repo/ui/map/EmbeddedMap";

export default function HomePage() {
  return (
    <div>
      <section>
        <HeroSectionComponent picturesList={['', '', '']} />
      </section>
      <section className="container min-h-80 px-3 md:py-6 lg:space-y-12 lg:py-12 xl:py-24">
        <header className="flex items-start justify-between">
          <div className="space-y-3 xl:w-3/5">
            <h3 className="text-dark font-sans text-4xl font-semibold">Disponible en magasin</h3>
            <p className="text-md font-light lg:w-1/2">description</p>
          </div>
        </header>
        <main className="xl:space-y-12">
          <div className="space-y-12">
            <header className="flex items-end justify-between">
              <h4 className="!font-montserrat-sans relative w-fit font-medium xl:text-lg">
                <span>Equipements solaires</span>
                <div className="absolute -bottom-3 h-1.5 w-full bg-yellow-500"></div>
              </h4>
              <Link href={APP_ROUTES.IN_STORE} className="block xl:basis-1/5">
                <div className="text-dark flex items-center justify-end gap-x-1.5 font-medium">
                  <span className="text-md">Voir tout</span>
                  <ArrowRight />
                </div>
              </Link>
            </header>
            <div>
              <ProductPreviewComponent previewList={products} path={`${APP_ROUTES.IN_STORE}`} />
            </div>
          </div>
          <div className="space-y-12">
            <header className="flex items-end justify-between">
              <h4 className="!font-montserrat-sans relative w-fit font-medium xl:text-lg">
                <span>Equipements electriques</span>
                <div className="absolute -bottom-3 h-1.5 w-full bg-yellow-500"></div>
              </h4>
              <Link href={APP_ROUTES.IN_STORE} className="block xl:basis-1/5">
                <div className="text-dark flex items-center justify-end gap-x-1.5 font-medium">
                  <span className="text-md">Voir tout</span>
                  <ArrowRight />
                </div>
              </Link>
            </header>
            <div>
              <ProductPreviewComponent previewList={products} path={`${APP_ROUTES.IN_STORE}`} />
            </div>
          </div>
        </main>
      </section>
      <section className="relative h-fit w-full bg-contain bg-center">
        <div className="bg-dark absolute top-0 -z-10 h-full w-full bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]"></div>

        <div className="container grid min-h-80 px-3 md:grid-cols-2 md:py-6 lg:space-y-9 lg:py-8 xl:py-20">
          <aside className="content-center">
            <div className="space-y-3">
              <h3 className="text-start text-[68px] leading-[100%] font-bold text-yellow-500 xl:w-3/5">
                Service title
              </h3>
              <p className="text-md text-start font-light text-white/90 xl:w-3/5">description</p>
            </div>
          </aside>
          <aside>
            <CompanyServicePreviewComponent previewList={services} path={APP_ROUTES.SERVICES} />
          </aside>
        </div>
      </section>
      <section className="h-fit w-full">
        <div className="container grid min-h-80 md:grid-cols-3 md:py-6 lg:space-y-9 lg:py-8 xl:py-20">
          <aside className="col-span-1">
            <div className="space-y-6">
              <h3 className="font-montserrat-sans text-2xl font-medium text-yellow-500">
                .testimonials_title
              </h3>
              <p className="text-start text-[68px] leading-[100%] font-bold">.subtitle</p>
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
          <header className="flex items-end justify-between">
            <div className="xl:basis-1/2">
              <h3 className="text-start text-[68px] leading-[100%] font-bold text-yellow-500 xl:w-3/4">
                .project_title
              </h3>
            </div>
            <div className="bg-dark h-fit content-center px-6 py-3 text-center text-white">
              <a href="{{ sulu_content_path(case_study_path.url) }}">Tous les projects</a>
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
            <h3 className="text-dark text-start font-bold xl:text-[68px] xl:leading-10">
              .contact_title
            </h3>
            <ul className="*:*:last:font-montserrat-sans text-dark space-y-6 pl-1 *:grid *:h-12 *:grid-cols-3 *:items-center *:*:last:col-span-2 xl:w-3/5">
              <li className="border-l-3 border-yellow-500 pl-3">
                <span>Telephone :</span>
                <span>(+237) 675 75 75 30</span>
              </li>
              <li className="border-dark border-l-3 bg-gray-100 pl-3">
                <span>Whatsapp : </span>
                <span>(+237) 655 55 55 90</span>
              </li>
              <li className="border-l-3 border-yellow-500 pl-3">
                <span>Email : </span>
                <span>scvpsd237@yahoo.com</span>
              </li>
              <li className="border-dark border-l-3 bg-gray-100 pl-3">
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
