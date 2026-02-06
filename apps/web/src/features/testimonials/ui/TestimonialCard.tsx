import React from "react";
import { TestimonialType } from "../model/TestimonialType";
import { generateHundred } from "@/shared/lib";

export const TestimonialCard = (props: TestimonialType) => {
  const random = generateHundred();

  return (
    <div className=" cursor-pointer relative w-full h-[225px] p-6 rounded-sm shadow-[0_6px_24px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.08)]">
      <header className="w-full space-y-3 absolute left-6 -top-8">
        <figure className="relative w-16 h-16 overflow-hidden border-2 border-yellow-500">
          <img src={`https://picsum.photos/${random}/${random}`} alt="avatar" />
        </figure>
        <span className="text-[17px] leading-3 font-mono font-medium text-dark">
          {props.author}
        </span>
      </header>
      <p className="mt-12 text-[15px] text-dark font-normal">
        "
        {props.content.length > 145
          ? `${props.content.substring(0, 145)}...`
          : props.content}
        "
      </p>
      <div className="text-end text-sm text-gray-500 absolute bottom-6 right-6">
        {props.date}
      </div>
    </div>
  );
};
