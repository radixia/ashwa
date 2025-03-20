import { motion, type HTMLMotionProps } from "framer-motion";

const defaultAnimationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.2 },
};

export function MotionWrapper({ children, className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div {...defaultAnimationProps} className={className} {...props}>
      {children}
    </motion.div>
  );
}
