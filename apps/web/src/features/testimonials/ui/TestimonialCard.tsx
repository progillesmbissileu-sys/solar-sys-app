import React from 'react';
import { TestimonialType } from '../model/TestimonialType';
import { generateHundred } from '@/shared/lib';

export const TestimonialCard = (props: TestimonialType) => {
  const random = generateHundred();

  return (
    <div className="relative h-[225px] w-full cursor-pointer rounded-sm p-6 shadow-[0_6px_24px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.08)]">
      <header className="absolute -top-8 left-6 w-full space-y-3">
        <figure className="relative h-16 w-16 overflow-hidden border-2 border-yellow-500">
          <img src={`https://picsum.photos/${random}/${random}`} alt="avatar" />
        </figure>
        <span className="text-dark font-mono text-[17px] leading-3 font-medium">
          {props.author}
        </span>
      </header>
      <p className="text-dark mt-12 text-[15px] font-normal">
        "{props.content.length > 145 ? `${props.content.substring(0, 145)}...` : props.content}"
      </p>
      <div className="absolute right-6 bottom-6 text-end text-sm text-gray-500">{props.date}</div>
    </div>
  );
};
