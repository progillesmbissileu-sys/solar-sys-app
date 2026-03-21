'use client';

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Options as CarouselConfigType } from '@splidejs/splide';
import React from 'react';

import { useViewPort } from '@/shared/hooks/use-view-port';

interface CarouselComponentProps<T> {
  items: Array<T & { key: string | number }>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onItemClick?: (item: T) => void;
  config?: CarouselConfigType;
}

export function CarouselComponent<T>(props: CarouselComponentProps<T>) {
  const viewPort = useViewPort();

  return (
    <div
      className="relative w-full"
      style={{
        height: props.config?.height ?? (viewPort?.isDesktop ? '320px' : '200px'),
      }}
    >
      <Splide options={props.config} hasTrack={false} className="h-full w-full">
        <div className="relative">
          <SplideTrack>
            {props.items.map((item, index) => (
              <SplideSlide key={item.key}>{props.renderItem(item, index)}</SplideSlide>
            ))}
          </SplideTrack>
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev"></button>
            <button className="splide__arrow splide__arrow--next"></button>
          </div>
        </div>
      </Splide>
    </div>
  );
}
