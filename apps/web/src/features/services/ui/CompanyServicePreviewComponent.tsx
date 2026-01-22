import React from "react";
import { Fade } from "react-awesome-reveal";
import { CompanyServiceType } from "../model/CompanyServiceType";
import { CompanyServiceCard } from "./CompanyServiceCard";

const thumbnails = [
  "noun-solar-pannel.svg",
  "noun-maintenance.svg",
  "noun-advisor.svg",
  "noun-sell.svg",
];

export function CompanyServicePreviewComponent(props: {
  previewList: CompanyServiceType[];
  path: string;
}) {
  return (
    <div className="w-full grid md:grid-cols-2 gap-6">
      {props.previewList.map((service, index) => (
        <div className="overflow-hidden aspect-[18/16]">
          <Fade delay={index * 100} triggerOnce className="w-full h-full">
            <CompanyServiceCard
              {...service}
              thumbnail={thumbnails.at(index) as any}
              rootPath={props.path}
            />
          </Fade>
        </div>
      ))}
      {/*<div className='border border-dark rounded-xl content-center text-center'>*/}
      {/*    <a href='/nos-services' className='xl:text-xl'>*/}
      {/*        Plus de details*/}
      {/*    </a>*/}
      {/*</div>*/}
    </div>
  );
}
