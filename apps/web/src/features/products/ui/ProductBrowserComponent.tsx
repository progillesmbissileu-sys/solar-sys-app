'use client'

import React from "react";
import { ProductCard2 } from "./ProductCard2";
import {ProductType} from "../model/ProductType";
import {CollectionBrowserWidget} from "@/shared/ui/widgets/collection/CollectionBrowserWidget";

export const ProductBrowserComponent = (props: { path?: string }) => {
  return (
    <CollectionBrowserWidget<ProductType>
      collection={function (params?: any): Promise<any> {
        throw new Error("Function not implemented.");
      }}
      renderItem={(product: ProductType, index?: number) => (
        <a className="block" href={`${props.path}/${product.slug}`} key={product.id}>
          <ProductCard2 {...product} color={(index || 0) % 2 === 0 ? "dark" : "primary"} />
        </a>
      )}
      groupFilters={[
        {
          groupTitle: "Categories",
          groupItems: [
            {
              label: "Equipements solaires",
              items: [
                {
                  label: "Tous",
                  value: "cat-0",
                },
                {
                  label: "Panneaux solaire geant",
                  value: "cat-1",
                },
                {
                  label: "Lampes",
                  value: "cat-4",
                },
                {
                  label: "Accumulateurs solaires",
                  value: "cat-5",
                },
              ],
            },
            {
              label: "Equipements electriques",
              items: [
                {
                  label: "Tous",
                  value: "cat-0",
                },
                {
                  label: "Generateurs",
                  value: "cat-2",
                },
                {
                  label: "Pompes",
                  value: "cat-3",
                },
              ],
            },
          ],
        },
        {
          groupTitle: "Prix",
          groupItems: [
            {
              label: "Intervalles de prix",
              items: [
                {
                  label: "0 - 10 000 FCFA",
                  value: "price-0",
                },
                {
                  label: "10 000 FCFA - 100 000 FCFA",
                  value: "price-1",
                },
                {
                  label: "100 000 FCFA - 1 000 000 FCFA",
                  value: "price-4",
                },
                {
                  label: "+1 000 000 FCFA",
                  value: "price-4",
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};
