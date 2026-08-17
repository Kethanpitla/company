import { motion } from "framer-motion";
import {
  FaChartLine,
  FaDumbbell,
  FaUtensils,
} from "react-icons/fa";

const features = [
  {
    icon: <FaDumbbell />,
    title: "Personalized Workouts",
    description: "Training plans built around your body and goals.",
  },
  {
    icon: <FaUtensils />,
    title: "Smart Nutrition",
    description: "Track your meals and build better eating habits.",
  },
  {
    icon: <FaChartLine />,
    title: "Track Progress",
    description: "Monitor your weight, workouts and weekly performance.",
  },
];

const SignupHero = () => {
  return (
    <div className="hidden lg:flex w-1/2 relative z-20 flex-col justify-center px-16 xl:px-20">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
          Your fitness journey starts here
        </p>

        <h1 className="text-5xl xl:text-7xl font-black leading-[1.05] text-white">
          Build Your
          <br />
          <span className="text-yellow-400">Best Version.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 xl:text-lg">
          Create your account and get personalized workout,
          nutrition and progress recommendations designed around
          your goals.
        </p>
      </motion.div>

      <div className="mt-10 space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + index * 0.15,
            }}
            className="flex max-w-xl items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-xl"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
              {feature.icon}
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SignupHero;