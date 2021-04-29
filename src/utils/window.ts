export const isMobile = (width = "768px"): boolean => {
  return window.matchMedia(`(max-width: ${width})`).matches;
};
