export const animationVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50, // Slide direction based on action
  }),
  visible: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50, // Slide opposite to entry
  }),
};
