import React from "react";
import { Rotate } from "react-awesome-reveal";
import { CompanyServiceType } from "../model/CompanyServiceType";
import Image from "next/image";

export const CompanyServiceCard = (
  props: CompanyServiceType & { rootPath: string },
) => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg cursor-pointer group border border-yellow-500 ">
      <div className="w-full h-full z-10 pt-12">
        <Rotate
          triggerOnce
          direction="top-left"
          cascade
          duration={500}
          delay={300}
          damping={0.1}
        >
          <figure className="w-1/2 relative aspect-square mx-auto">
            <Image fill src={props.thumbnail} alt={props.designation} />
          </figure>
        </Rotate>
      </div>
      <div className="absolute w-full h-full top-0 left-0  z-20 flex flex-col justify-end items-center py-6">
        <div className="bg-white  overflow-y-hidden  lg:w-5/6 px-3   h-16 p-4 flex  items-center rounded-sm">
          <div className="w-full">
            <h3 className="text-lg font-medium text-center  font-montserrat-sans text-dark">
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
