import React from "react";
import { ArrowUpRight } from "lucide-react";

export type ProjectItemType = {
  title: string;
  slug: string;
  thumbnail: string;
  tag: string;
  counter?: number;
};

export const ProjectItemCard = (props: ProjectItemType) => {
  return (
    <div className="relative w-full xl:h-[700px]">
      <header className="relative w-full h-3/4">
        <figure className="w-full h-full relative rounded-sm overflow-hidden">
          <img src={props.thumbnail} alt={props.title} className="w-full h-full object-cover" />
        </figure>
        <div className="absolute w-full h-full top-0 left-0 z-20 bg-black/20 p-6">
          {props.counter && (
            <div className="size-10 content-center text-center bg-yellow-500 text-black font-medium text-xl">
              {props.counter}
            </div>
          )}
        </div>
        <div className="absolute z-30 right-6 -bottom-6 h-12 flex justify-center items-center uppercase bg-dark text-yellow-500 px-6">
          {props.tag}
        </div>
      </header>
      <footer className="h-1/4 relative border-b border-dark py-6">
        <h4 className="text-2xl font-medium text-dark w-3/5">
          {props.title.length > 45 ? `${props.title.substring(0, 45)}...` : props.title}
        </h4>
        <div className="absolute right-6 bottom-6 text-sm hover:bg-dark/90 hover:text-yellow-400 transition-colors duration-200 font-medium  border border-dark w-fit px-2 py-1">
          <a href={`/projects/${props.slug}`} className="hover:underline flex gap-x-1 items-center">
            <span>Aller a</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
};
