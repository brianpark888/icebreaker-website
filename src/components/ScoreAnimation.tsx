import { motion } from "framer-motion";

interface ScoreAnimationProps {
  isVisible: boolean;
}

export default function ScoreAnimation({ isVisible }: ScoreAnimationProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [1, 0], y: -50 }}
      transition={{ duration: 1.5 }}
      className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-green-500"
    >
      +15
    </motion.div>
  );
} 