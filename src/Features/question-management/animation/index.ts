// Define shared animation properties
export const opacityAnimationProps = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
};
export const opcityHightanimationProps = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const hightAnimationProps = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
};
