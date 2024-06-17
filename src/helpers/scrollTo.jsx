export const scrollTo = (top = 0, behavior = "instant") => {
  window.scrollTo({
    top: top,
    behavior: behavior,
  });
};
