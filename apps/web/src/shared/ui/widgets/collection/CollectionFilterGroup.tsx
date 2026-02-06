import React from "react";
import { CollectionFilterType } from "./types";
import { AppCollapsible } from "../../core/AppCollpasible/AppCollapsible";
import { Checkbox } from "@/shared/ui/core/checkbox";

export const CollectionFilterGroup = (
  props: CollectionFilterType & { defaultOpen?: boolean },
) => {
  return (
    <AppCollapsible
      label={<span className="font-sans font-medium">{props.label}</span>}
      defaultOpen={props.defaultOpen}
    >
      <div className="pl-3 border-t border-gray-200 pt-3 space-y-2">
        {props.items.map((item, index) => (
          <div className="flex gap-x-2 items-center" key={index}>
            <Checkbox className="data-[state=checked]:bg-[#000090] size-[18px] rounded-xs data-[state=checked]:border-[#000090]" />
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </AppCollapsible>
  );
};
