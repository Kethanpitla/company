import { useState } from "react";
import { motion } from "framer-motion";
import { FaTint, FaPlus, FaMinus } from "react-icons/fa";

interface WaterGoalProps {
  goal: number;
}

const WaterGoal = ({ goal }: WaterGoalProps) => {
  const [currentWater, setCurrentWater] = useState(0);

  const addWater = () => {
    if (currentWater < goal) {
      setCurrentWater((prev) =>
        Number((prev + 0.25).toFixed(2))
      );
    }
  };

  const removeWater = () => {
    if (currentWater > 0) {
      setCurrentWater((prev) =>
        Number(Math.max(0, prev - 0.25).toFixed(2))
      );
    }
  };

  const progress = Math.min(
    (currentWater / goal) * 100,
    100
  );

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Water Intake
          </h2>

          <p className="mt-2 text-gray-400">
            Stay hydrated throughout the day
          </p>

        </div>

        <FaTint className="text-5xl text-cyan-400" />

      </div>

      <div className="mt-10 flex justify-center">

        <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[14px] border-cyan-400">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-cyan-400">
              {currentWater.toFixed(2)}L
            </h1>

            <p className="mt-2 text-gray-400">
              of {goal}L
            </p>

            <p className="mt-4 text-lg font-bold text-white">
              {Math.round(progress)}%
            </p>
          </motion.div>

        </div>

      </div>

      <div className="mt-10 h-4 overflow-hidden rounded-full bg-[#0F172A]/40">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        />

      </div>

      <div className="mt-10 flex justify-center gap-6">

        <button
          onClick={removeWater}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          <FaMinus />
          250 ml
        </button>

        <button
          onClick={addWater}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          <FaPlus />
          250 ml
        </button>

      </div>

      {progress >= 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 rounded-2xl bg-green-500/10 p-5 text-center"
        >
          <h2 className="text-2xl font-bold text-green-400">
            🎉 Water Goal Completed
          </h2>

          <p className="mt-2 text-gray-300">
            Excellent! Your hydration goal has been achieved.
          </p>
        </motion.div>
      )}

    </div>
  );
};

export default WaterGoal;