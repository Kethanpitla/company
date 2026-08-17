import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Scale,
  Zap,
  Trophy,
  Activity,
} from "lucide-react";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const Goal = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [goal, setGoal] = useState(user.goal);

  const goals = [
    {
      title: "Gain Muscle",
      desc: "Build mass and increase muscle size.",
      icon: <Dumbbell className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Lose Fat",
      desc: "Shred body fat and get completely lean.",
      icon: <Flame className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Recomposition",
      desc: "Build muscle while losing fat simultaneously.",
      icon: <Scale className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Strength",
      desc: "Lift heavier and build raw physical power.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "Powerlifting",
      desc: "Focus on Squat, Bench, and Deadlift maxes.",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-[#F2A93B] to-yellow-600",
    },
    {
      title: "Athleticism",
      desc: "Enhance speed, agility, and endurance.",
      icon: <Activity className="w-8 h-8" />,
      color: "from-green-400 to-emerald-600",
    },
  ];

  const handleNext = () => {
    if (!goal) return;
    updateUser({ goal });
    navigate("/experience");
  };

  return (
    <OnboardingLayout step={3} totalSteps={10}>
      <StepHeader
        title="Choose Your Goal"
        subtitle="Your entire workout and nutrition protocol will be optimized for this."
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((item) => {
          const isSelected = goal === item.title;

          return (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setGoal(item.title)}
              className={`relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-300 glass-panel glow-on-hover flex flex-col justify-between min-h-[200px]
              ${
                isSelected
                  ? "border-[#5B8DEF] shadow-[0_0_25px_rgba(91,141,239,0.2)] bg-white/5 ring-1 ring-[#5B8DEF]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                >
                  {item.icon}
                </div>
                
                {/* Checkmark Circle */}
                <div
                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-[#5B8DEF] bg-[#5B8DEF]"
                      : "border-gray-500"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2.5 w-2.5 rounded-full bg-white"
                    />
                  )}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 flex justify-between">
        <BackButton onClick={() => navigate("/physical-info")} />
        <NextButton onClick={handleNext} disabled={!goal} />
      </div>
    </OnboardingLayout>
  );
};

export default Goal;