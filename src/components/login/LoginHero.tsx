import { motion } from "framer-motion";
import LoginStats from "./LoginStats";
import MotivationalQuote from "./MotivationalQuote";

const LoginHero = () => {
  return (
    <div className="hidden lg:flex w-1/2 relative z-20 flex-col justify-center px-20">

      <motion.h1
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: .8 }}
        className="text-7xl font-black text-white leading-tight"
      >
        FITNESS
        <span className="text-yellow-400"> AI</span>
      </motion.h1>

      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: .3 }}
        className="mt-8 text-3xl text-white font-semibold"
      >
        Train Smarter.
      </motion.h2>

      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: .5 }}
        className="text-3xl text-yellow-400 font-semibold"
      >
        Live Stronger.
      </motion.h2>

      <p className="mt-8 text-gray-400 text-lg leading-8 max-w-xl">

        Personalized AI workout plans,
        diet tracking,
        progress analytics,
        BMI analysis,
        and much more.

      </p>

      <div className="mt-12">

          <MotivationalQuote/>

      </div>

      <div className="mt-12">

          <LoginStats/>

      </div>

    </div>
  );
};

export default LoginHero;