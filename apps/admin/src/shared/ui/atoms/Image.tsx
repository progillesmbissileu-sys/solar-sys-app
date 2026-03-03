"use client";

import { RiImageLine } from "@remixicon/react"
import Image, { ImageProps } from "next/image"

export const AppImage = (props: Omit<ImageProps, 'src'> & { src: string }) => {
    if(props.src?.toString().length > 0) {
        return <Image src={props.src} alt={props.alt?.toLowerCase()} width={props.width} height={props.height}/>
    }

    return <div className="bg-gray-200 rounded-md flex items-center justify-center" style={{width: props.width, height: props.height}}>
        <RiImageLine className="size-5 text-gray-400" />
    </div>
}