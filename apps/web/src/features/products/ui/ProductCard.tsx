import React from "react";
import { ProductType } from "../model/ProductType";
import {cn} from "@/shared/lib/utils";

export const ProductCard = (props: ProductType & { color: "dark" | "primary" }) => {
  return (
    <div className=" cursor-pointer w-full h-full overflow-hidden">
      <header className="w-full h-4/5">
        <figure className="w-full h-full relative overflow-hidden rounded-md">
          <img src={props.thumbnail} alt={props.description} className="h-full aspect-video" />
          <div
            className={cn(
              "absolute text-center content-center xl:w-3/4 xl:h-1/5 bottom-0 right-0 z-30 rounded-tl-[44px] opacity-100",
              {
                "bg-yellow-500 text-dark": props.color === "primary",
                "bg-dark text-white": props.color === "dark",
              },
            )}
          >
            <span className="text-lg font-bold font-mono">
              {Number(props.price).toLocaleString("fr-FR", {
                style: "currency",
                currency: "XAF",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="absolute w-full h-full bg-black/5 z-20 top-0 left-0"></div>
        </figure>
      </header>
      <footer className="h-1/5 content-center">
        <div>
          <h4 className="font-semibold leading-[120%] text-lg   text-dark">{props.designation}</h4>
        </div>
      </footer>
    </div>
  );
};
