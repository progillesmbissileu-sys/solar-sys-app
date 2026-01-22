import React from "react";

export function HTMLMarkupRender(props: { rawContent?: string; classKey?: string; ref?: any }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      props.rawContent !== undefined &&
      containerRef.current !== null &&
      containerRef.current.innerHTML == ""
    ) {
      containerRef.current.insertAdjacentHTML("afterbegin", props.rawContent);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [props.rawContent]);

  return <div className={props.classKey} ref={containerRef}></div>;
}
