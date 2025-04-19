import { motion, AnimatePresence } from "framer-motion";

interface LeadershipPointsNotificationProps {
  isVisible: boolean;
  points: number;
}

export default function LeadershipPointsNotification({
  isVisible,
  points,
}: LeadershipPointsNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 100, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">+{points}</span>
            <span>Leadership Points!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 