import React from "react";
import { ProductType } from "../model/ProductType";
import { cn } from "@/shared/lib/utils";
import { generateHundred } from "@/shared/lib";
export const ProductCard2 = (
  props: ProductType & { color?: "dark" | "primary" },
) => {
  const random = generateHundred();

  return (
    <div className=" cursor-pointer w-full h-full overflow-hidden">
      <header className="w-full h-4/5">
        <figure className="w-full h-full relative overflow-hidden rounded-md">
          <img
            src={`https://picsum.photos/${random}/${random}`}
            alt={props.description}
            className="w-full aspect-square"
          />
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
                minimumFractionDigits: 1,
              })}
            </span>
          </div>
          <div className="absolute w-full h-full bg-black/5 hover:bg-white/10 transition-colors duration-200 ease-in z-20 top-0 left-0"></div>
        </figure>
      </header>
      <footer className="py-3">
        <h4 className="font-semibold text-center font-mono leading-[120%] text-lg   text-dark">
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
