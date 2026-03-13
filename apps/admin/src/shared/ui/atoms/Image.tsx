'use client';

import { RiImageLine } from '@remixicon/react';
import Image, { ImageProps } from 'next/image';

export const AppImage = ({
  src,
  alt,
  unoptimized,
  className,
  ...props
}: Omit<ImageProps, 'src'> & { src: string }) => {
  if (src?.toString().length > 0) {
    return (
      <Image
        src={src}
        alt={alt?.toLowerCase()}
        unoptimized={unoptimized}
        className={className}
        {...props}
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
