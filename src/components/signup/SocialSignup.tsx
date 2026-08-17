import { motion } from "framer-motion";
import { FaApple, FaGoogle } from "react-icons/fa";

const SocialSignup = () => {
  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-white transition hover:border-yellow-400/40 hover:bg-white/10"
      >
        <FaGoogle className="text-red-400" />
        Continue with Google
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-medium text-white transition hover:border-yellow-400/40 hover:bg-white/10"
      >
        <FaApple />
        Continue with Apple
      </motion.button>
    </div>
  );
};

export default SocialSignup;