import { Minus, Plus } from 'lucide-react';
import React from 'react';

import { Button } from '../button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';

export type AppCollapsibleProps = {
  label: React.ReactNode | string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const AppCollapsible = (props: AppCollapsibleProps) => {
  const [isOpen, setIsOpen] = React.useState(props.defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between transition-colors duration-300 hover:text-yellow-600">
        {typeof props.label == 'string' ? (
          <h4 className="text-dark font-medium">{props.label}</h4>
        ) : (
          props.label
        )}
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 cursor-pointer text-yellow-600 hover:text-yellow-600"
          >
            {!isOpen && <Plus size={16} />}
            {isOpen && <Minus size={16} />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>{props.children}</CollapsibleContent>
    </Collapsible>
  );
};
