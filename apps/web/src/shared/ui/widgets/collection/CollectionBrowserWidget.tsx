import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../core/select";
import { Input } from "../../core/input";
import { CollectionBrowserWidgetProps } from "./types";
import { CollectionFilterGroup } from "./CollectionFilterGroup";
import { cn } from "@/shared/lib/utils";
import { products } from "@/shared/assets/data/products";
import AppPagination from "@/shared/ui/core/AppPagination";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CollectionBrowserWidget<T>(props: CollectionBrowserWidgetProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="grid grid-cols-4 gap-4">
      <aside className="xl:col-span-1 space-y-6">
        {props.groupFilters?.map((filter,index) => (
          <div className="space-y-6" key={index}>
            <h3 className="text-xl font-medium relative h-14 content-center">
              {filter.groupTitle}
              <div className="h-1 w-10 absolute left-0 bottom-0 bg-dark"></div>
            </h3>
            <div className="xl:pr-6">
              {filter.groupItems.map((item, index) => (
                <div className={cn("border-b border-gray-200 pb-3", { "pt-3": index != 0 })} key={index}>
                  <CollectionFilterGroup
                    label={item.label}
                    items={item.items}
                    defaultOpen={index == 0}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>
      <aside className="xl:col-span-3">
        <header className="grid grid-cols-4 gap-4 h-14">
          <div className="flex items-center">Afficher 10 sur 10 resultats</div>
          <div className="col-span-2 flex items-center gap-x-2">
            <div>Rechercher: </div>
            <Input placeholder="Type something ..." className="!h-12 rounded-sm" />
          </div>
          <div className="flex gap-x-2 items-center">
            <div>Filtres: </div>
            <Select>
              <SelectTrigger className="w-[200px] !h-12 rounded-sm">
                <SelectValue placeholder="Afficher 16 par page" />
              </SelectTrigger>
              <SelectContent className="rounded-sm shadow-none">
                <SelectGroup>
                  <SelectItem value="16">Afficher 16 par page</SelectItem>
                  <SelectItem value="48">Afficher 48 par page</SelectItem>
                  <SelectItem value="96">Afficher 96 par page</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <main className="pt-3">
          <div className="border-gray-200 border-t mb-6"></div>
          <div className=" grid xl:grid-cols-4 xl:gap-9">
            {products.map((item: any, index: number) => (
              <div key={index}>{props.renderItem(item, index)}</div>
            ))}
          </div>
        </main>
        <footer className="pt-3">
          <AppPagination
            className="-mr-0 !w-fit"
            currentPage={currentPage}
            totalPages={5}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </footer>
      </aside>
    </div>
  );
}
