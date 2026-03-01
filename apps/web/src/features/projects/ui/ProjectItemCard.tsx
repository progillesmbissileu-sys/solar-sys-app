import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { generateHundred } from '@/shared/lib';

export type ProjectItemType = {
  title: string;
  slug: string;
  thumbnail: string;
  tag: string;
  counter?: number;
};

export const ProjectItemCard = (props: ProjectItemType) => {
  const random = generateHundred();

  return (
    <div className="relative w-full xl:h-[700px]">
      <header className="relative h-3/4 w-full">
        <figure className="relative h-full w-full overflow-hidden rounded-sm">
          <img
            src={`https://picsum.photos/${random}/${random}`}
            alt={props.title}
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="absolute top-0 left-0 z-20 h-full w-full bg-black/20 p-6">
          {props.counter && (
            <div className="size-10 content-center bg-yellow-500 text-center text-xl font-medium text-black">
              {props.counter}
            </div>
          )}
        </div>
        <div className="bg-dark absolute right-6 -bottom-6 z-30 flex h-12 items-center justify-center px-6 text-yellow-500 uppercase">
          {props.tag}
        </div>
      </header>
      <footer className="border-dark relative h-1/4 border-b py-6">
        <h4 className="text-dark w-3/5 text-2xl font-medium">
          {props.title.length > 45 ? `${props.title.substring(0, 45)}...` : props.title}
        </h4>
        <div className="hover:bg-dark/90 border-dark absolute right-6 bottom-6 w-fit border px-2 py-1 text-sm font-medium transition-colors duration-200 hover:text-yellow-400">
          <a href={`/projects/${props.slug}`} className="flex items-center gap-x-1 hover:underline">
            <span>Aller a</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
};
