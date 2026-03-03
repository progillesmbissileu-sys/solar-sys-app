'use client';

import { RiImageLine } from '@remixicon/react';
import Image, { ImageProps } from 'next/image';

export const AppImage = (props: Omit<ImageProps, 'src'> & { src: string }) => {
  if (props.src?.toString().length > 0) {
    return (
      <Image
        src={props.src}
        alt={props.alt?.toLowerCase()}
        width={props.width}
        height={props.height}
        unoptimized={props.unoptimized}
        preload={props.preload}
        className={props.className}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-md bg-gray-200"
      style={{ width: props.width, height: props.height }}
    >
      <RiImageLine className="size-5 text-gray-400" />
    </div>
  );
};
