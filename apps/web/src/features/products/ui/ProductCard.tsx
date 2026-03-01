import React from 'react';
import { ProductType } from '../model/ProductType';
import { cn } from '@/shared/lib/utils';
import { generateHundred } from '@/shared/lib';

export const ProductCard = (props: ProductType & { color: 'dark' | 'primary' }) => {
  const random = generateHundred();
  return (
    <div className="h-full w-full cursor-pointer overflow-hidden">
      <header className="h-4/5 w-full">
        <figure className="relative h-full w-full overflow-hidden rounded-md">
          <img
            src={`https://picsum.photos/${random}/${random}`}
            alt={props.description}
            className="aspect-video h-full"
          />
          <div
            className={cn(
              'absolute right-0 bottom-0 z-30 content-center rounded-tl-[44px] text-center opacity-100 xl:h-1/5 xl:w-3/4',
              {
                'text-dark bg-yellow-500': props.color === 'primary',
                'bg-dark text-white': props.color === 'dark',
              }
            )}
          >
            <span className="font-mono text-lg font-bold">
              {Number(props.price).toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'XAF',
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="absolute top-0 left-0 z-20 h-full w-full bg-black/5"></div>
        </figure>
      </header>
      <footer className="h-1/5 content-center">
        <div>
          <h4 className="text-dark text-lg leading-[120%] font-semibold">{props.designation}</h4>
        </div>
      </footer>
    </div>
  );
};
