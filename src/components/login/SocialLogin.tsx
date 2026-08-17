import { motion } from "framer-motion";
import { FaGoogle, FaApple } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="space-y-4">

      <motion.button

        whileHover={{
          scale: 1.04,
        }}

        whileTap={{
          scale: .96,
        }}

        className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl py-4 flex justify-center items-center gap-3 text-white hover:border-yellow-400 transition"

      >

        <FaGoogle className="text-red-400" />

        Continue with Google

      </motion.button>

      <motion.button

        whileHover={{
          scale: 1.04,
        }}

        whileTap={{
          scale: .96,
        }}

        className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl py-4 flex justify-center items-center gap-3 text-white hover:border-yellow-400 transition"

      >

        <FaApple />

        Continue with Apple

      </motion.button>

    </div>
  );
};

export default SocialLogin;