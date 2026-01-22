import React from "react";
import { ProductCard } from "./ProductCard";
import { ProductType } from "../model/ProductType";
import {CarouselComponent} from "@/shared/ui/widgets/CarouselComponent";

export const ProductPreviewComponent = (props: { previewList: ProductType[], path?: string }) => {
  return (
    <CarouselComponent<ProductType>
      items={props.previewList.map((item) => ({ ...item, key: item.id }))}
      config={{
        type: "slide",
        gap: "1.5rem",
        autoplay: true,
        perPage: 5,
        height: "340px",
        perMove: 1,
        wheel: false,
        interval: 3000,
        rewind: true,
      }}
      renderItem={(item, index) => (
        <a className="block w-full h-full" href={`${props.path}/${item.slug}`} key={item.slug}>
          <ProductCard {...item} color={index % 2 === 0 ? "dark" : "primary"} />
        </a>
      )}
    />
  );
};
