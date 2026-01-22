import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import React from "react";
import { Button } from "../button";
import { Minus, Plus } from "lucide-react";

export type AppCollapsibleProps = {
  label: React.ReactNode | string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const AppCollapsible = (props: AppCollapsibleProps) => {
  const [isOpen, setIsOpen] = React.useState(props.defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-between items-center hover:text-yellow-600 transition-colors duration-300">
        {typeof props.label == "string" ? (
          <h4 className="font-medium text-dark">{props.label}</h4>
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
