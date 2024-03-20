import { useEffect, useState } from "react";

interface UseShouldRenderComponentsOnResizeProps {
  minWidth: number;
  maxWidth: number;
}

export const useShouldRenderComponentOnResize = ({ minWidth, maxWidth }: UseShouldRenderComponentsOnResizeProps) => {
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const shouldRenderBar = window.innerWidth <= maxWidth && window.innerWidth >= minWidth;
      setShouldRender(shouldRenderBar);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return shouldRender;
}