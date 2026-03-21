import React from 'react';
import { Fade } from 'react-awesome-reveal';

import { ServiceType } from '../model/ServiceType';
import { CompanyServiceCard } from './CompanyServiceCard';

const thumbnails = [
  'noun-solar-pannel.svg',
  'noun-maintenance.svg',
  'noun-advisor.svg',
  'noun-sell.svg',
];

export function CompanyServicePreviewComponent(props: {
  previewList: ServiceType[];
  path: string;
}) {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      {props.previewList.map((service, index) => (
        <div className="aspect-[18/16] overflow-hidden">
          <Fade delay={index * 100} triggerOnce className="h-full w-full">
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
