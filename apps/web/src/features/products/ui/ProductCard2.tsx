import React from 'react';

import { generateHundred } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';

import { ProductType } from '../model/ProductType';
export const ProductCard2 = (props: ProductType & { color?: 'dark' | 'primary' }) => {
  const random = generateHundred();

  return (
    <div className="h-full w-full cursor-pointer overflow-hidden">
      <header className="h-4/5 w-full">
        <figure className="relative h-full w-full overflow-hidden rounded-md">
          <img
            src={`https://picsum.photos/${random}/${random}`}
            alt={props.description}
            className="aspect-square w-full"
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
                minimumFractionDigits: 1,
              })}
            </span>
          </div>
          <div className="absolute top-0 left-0 z-20 h-full w-full bg-black/5 transition-colors duration-200 ease-in hover:bg-white/10"></div>
        </figure>
      </header>
      <footer className="py-3">
        <h4 className="text-dark text-center font-mono text-lg leading-[120%] font-semibold">
          {props.designation}
        </h4>
      </footer>
    </div>
  );

  // return (
  //   <div className=" cursor-pointer w-full h-full overflow-hidden">
  //     <header className="w-full">
  //       <figure className="w-full relative overflow-hidden rounded-sm">
  //         <img src={props.thumbnail} alt={props.description} className="w-full aspect-square" />
  //         <div className="absolute w-full h-full bg-black/5 z-20 top-0 left-0 hover:bg-yellow-500/5 transition-colors duration-200"></div>
  //       </figure>
  //     </header>
  //     <footer className="space-y-2 pt-3 text-center">
  //       <h4 className="font-semibold leading-[120%] text-lg   text-dark  font-sans">
  //         {props.designation.length > 23
  //           ? `${props.designation.substring(0, 20)}...`
  //           : props.designation}
  //       </h4>
  //       <div className={cn("w-1/3 h-1 mx-auto bg-gray-300")}></div>
  //       <span className="text-xl font-bold font-mono text-dark leading-[120%] ">
  //         {Number(props.price).toLocaleString("fr-FR", {
  //           style: "currency",
  //           currency: "XAF",
  //           minimumFractionDigits: 2,
  //         })}
  //       </span>
  //     </footer>
  //   </div>
  // );
};
