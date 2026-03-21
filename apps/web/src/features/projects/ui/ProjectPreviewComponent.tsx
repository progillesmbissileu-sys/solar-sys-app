'use client';

import React from 'react';

import { projects } from '@/shared/assets/data/projects';
import { CarouselComponent } from '@/shared/ui/widgets/CarouselComponent';

import { ProjectItemCard, ProjectItemType } from './ProjectItemCard';

export function ProjectPreviewComponent(
  props: { previewList: ProjectItemType[] } = { previewList: projects }
) {
  return (
    <CarouselComponent<ProjectItemType>
      items={props.previewList.map((item, index) => ({
        ...item,
        counter: index + 1,
        key: item.slug,
      }))}
      config={{
        type: 'slide',
        gap: '1rem',
        autoplay: true,
        perPage: 3,
        height: '700px',
        perMove: 1,
        interval: 3000,
        rewind: true,
      }}
      renderItem={(item) => <ProjectItemCard {...item} />}
    />
  );
}
