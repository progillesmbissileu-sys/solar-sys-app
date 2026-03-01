import React from 'react';
import { Rotate } from 'react-awesome-reveal';
import { ServiceType } from '../model/ServiceType';
import Image from 'next/image';

export const CompanyServiceCard = (props: ServiceType & { rootPath: string }) => {
  return (
    <div className="group relative h-full w-full cursor-pointer overflow-hidden rounded-lg border border-yellow-500">
      <div className="z-10 h-full w-full pt-12">
        <Rotate triggerOnce direction="top-left" cascade duration={500} delay={300} damping={0.1}>
          <figure className="relative mx-auto aspect-square w-1/2">
            <Image fill src={props.thumbnail} alt={props.designation} />
          </figure>
        </Rotate>
      </div>
      <div className="absolute top-0 left-0 z-20 flex h-full w-full flex-col items-center justify-end py-6">
        <div className="flex h-16 items-center overflow-y-hidden rounded-sm bg-white p-4 px-3 lg:w-5/6">
          <div className="w-full">
            <h3 className="font-montserrat-sans text-dark text-center text-lg font-medium">
              <a href={`${props.rootPath}#${props.tag}`}>{props.designation}</a>
            </h3>
            {/*<p className="text-md hidden group-hover:block font-sans font-medium">*/}
            {/*  {props.shortDescription}*/}
            {/*</p>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
