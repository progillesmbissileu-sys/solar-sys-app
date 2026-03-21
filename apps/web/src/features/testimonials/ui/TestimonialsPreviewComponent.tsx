'use client';

import React from 'react';
import { Fade } from 'react-awesome-reveal';

import { CarouselComponent } from '@/shared/ui/widgets/CarouselComponent';

import { TestimonialType } from '../model/TestimonialType';
import { TestimonialCard } from './TestimonialCard';

export const TestimonialsPreviewComponent = (props: { previewList: TestimonialType[] }) => {
  return (
    <CarouselComponent<TestimonialType>
      items={props.previewList.map((item, index) => ({
        ...item,
        key: `testimonial-${index + 1}`,
      }))}
      config={{
        type: 'slide',
        gap: '16px',
        autoplay: true,
        perPage: 2,
        height: '290px',
        perMove: 1,
        wheel: true,
        interval: 10000,
        rewind: true,
      }}
      renderItem={(item) => (
        <div className="h-full content-center p-1">
          <Fade direction="down" cascade duration={500} delay={300} damping={0.1}>
            <TestimonialCard {...item} />
          </Fade>
        </div>
      )}
    />
  );
};
