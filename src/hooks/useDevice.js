import { useMediaQuery } from "react-responsive";

export function useDevice() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  let deviceType = "unknown";
  if (isMobile) {
    deviceType = "mobile";
  } else if (isTablet) {
    deviceType = "tablet";
  } else if (isDesktop) {
    deviceType = "desktop";
  }
  return { isMobile, isTablet, isDesktop, deviceType };
}
