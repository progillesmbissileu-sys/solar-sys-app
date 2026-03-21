import React from 'react';

import { Checkbox } from '@/shared/ui/core/checkbox';

import { AppCollapsible } from '../../core/AppCollpasible/AppCollapsible';
import { CollectionFilterType } from './types';

export const CollectionFilterGroup = (props: CollectionFilterType & { defaultOpen?: boolean }) => {
  return (
    <AppCollapsible
      label={<span className="font-sans font-medium">{props.label}</span>}
      defaultOpen={props.defaultOpen}
    >
      <div className="space-y-2 border-t border-gray-200 pt-3 pl-3">
        {props.items.map((item, index) => (
          <div className="flex items-center gap-x-2" key={index}>
            <Checkbox className="size-[18px] rounded-xs data-[state=checked]:border-[#000090] data-[state=checked]:bg-[#000090]" />
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </AppCollapsible>
  );
};
