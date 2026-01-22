import React from "react";

export enum SCREEN_SIZE {
  MOBILE = 576,
  TABLET = 1279,
  DESKTOP = 1800,
}

type ScreenType = {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
};

export const useViewPort = () => {
  const [screenType, setScreenType] = React.useState<ScreenType>();

  const assertScreenType = React.useCallback(
    (event: MediaQueryListEvent, type: "isMobile" | "isTablet" | "isDesktop") => {
      if (event.matches) {
        setScreenType((prevState: any) => ({ ...prevState, [type]: true }));
      } else {
        setScreenType((prevState: any) => ({ ...prevState, [type]: false }));
      }
    },
    [],
  );

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mobile = window.matchMedia(`(max-width: ${SCREEN_SIZE.MOBILE}px)`);
    const tablet = window.matchMedia(
      `(min-width: ${SCREEN_SIZE.MOBILE + 1}px) and (max-width: ${SCREEN_SIZE.TABLET}px)`,
    );
    const desktop = window.matchMedia(`(min-width: ${SCREEN_SIZE.TABLET + 1}px)`);

    setScreenType(() => ({
      isMobile: mobile.matches,
      isTablet: tablet.matches,
      isDesktop: desktop.matches,
    }));

    mobile.addEventListener("change", (evt) => assertScreenType(evt, "isMobile"));
    tablet.addEventListener("change", (evt) => assertScreenType(evt, "isTablet"));
    desktop.addEventListener("change", (evt) => assertScreenType(evt, "isDesktop"));

    return () => {
      mobile.removeEventListener("change", (evt) => assertScreenType(evt, "isMobile"));
      tablet.removeEventListener("change", (evt) => assertScreenType(evt, "isTablet"));
      desktop.removeEventListener("change", (evt) => assertScreenType(evt, "isDesktop"));
    };
  }, [assertScreenType]);

  return screenType;
};
