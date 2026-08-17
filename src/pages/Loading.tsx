import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaDumbbell,
  FaAppleAlt,
  FaChartLine,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    title: "Analyzing your profile...",
    icon: <FaBrain />,
  },
  {
    title: "Calculating BMI...",
    icon: <FaChartLine />,
  },
  {
    title: "Creating workout plan...",
    icon: <FaDumbbell />,
  },
  {
    title: "Generating diet plan...",
    icon: <FaAppleAlt />,
  },
  {
    title: "Preparing AI Coach...",
    icon: <FaRobot />,
  },
];

const Loading = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;

        if (next % 20 === 0 && currentStep < steps.length - 1) {
          setCurrentStep((s) => s + 1);
        }

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/dashboard");
          }, 800);

          return 100;
        }

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl rounded-3xl border border-yellow-500/20 bg-white/5 backdrop-blur-xl p-10"
      >

        <h1 className="text-4xl font-bold text-white text-center">
          Building Your Fitness Plan
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Our AI is creating a personalized experience just for you.
        </p>

        <div className="mt-12">

          <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">

            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
              animate={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-center text-yellow-400 mt-4 font-bold">
            {progress}%
          </p>

        </div>

        <div className="mt-12 space-y-5">

          {steps.map((step, index) => (

            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: index <= currentStep ? 1 : .3,
                x: 0,
              }}
              className="flex items-center justify-between rounded-xl bg-white/5 p-4"
            >

              <div className="flex items-center gap-4">

                <div className="text-yellow-400 text-xl">
                  {step.icon}
                </div>

                <span className="text-white">
                  {step.title}
                </span>

              </div>

              {index < currentStep ? (
                <FaCheckCircle className="text-green-400" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-yellow-400 animate-pulse" />
              )}

            </motion.div>

          ))}

        </div>

      </motion.div>

    </div>
  );
};

export default Loading;