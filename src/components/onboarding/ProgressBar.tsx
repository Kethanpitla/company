import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaDumbbell } from "react-icons/fa";

type ProgressBarProps = {
  step: number;
  totalSteps: number;
};

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const [prevStep, setPrevStep] = useState(step);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("onboarding_step");
    if (saved) {
      setPrevStep(Number(saved));
    } else {
      setPrevStep(1); // Default to start if no history
    }
    
    sessionStorage.setItem("onboarding_step", step.toString());
    
    // Trigger animation after mount
    setTimeout(() => setIsMounted(true), 50);
  }, [step]);

  const progress = totalSteps > 1 ? ((step - 1) / (totalSteps - 1)) * 100 : 0;
  const prevProgress = totalSteps > 1 ? ((prevStep - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="relative flex w-full items-center justify-between py-12">
      {/* Background Line */}
      <div className="absolute left-0 top-1/2 z-0 h-[2px] w-full -translate-y-1/2 bg-white/10" />

      {/* Active Animated Line */}
      <motion.div
        className="absolute left-0 top-1/2 z-30 h-[2px] -translate-y-1/2 bg-gradient-to-r from-purple-500 via-[#5B8DEF] to-cyan-400"
        initial={{ width: `${prevProgress}%` }}
        animate={{ width: isMounted ? `${progress}%` : `${prevProgress}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-xl z-30 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          animate={{ rotate: isMounted ? [0, -45, 45, -45, 45, 0] : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="rounded-full bg-[#0F172A] p-1 border border-cyan-400/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <FaDumbbell size={14} />
          </div>
        </motion.div>
      </motion.div>

      {/* Steps */}
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const stepNum = idx + 1;
        const isActive = isMounted ? stepNum <= step : stepNum <= prevStep;
        
        return (
          <div key={idx} className="relative z-20 flex flex-col items-center">
            {/* Pill Label */}
            <div
              className={`absolute whitespace-nowrap rounded-xl px-4 py-1.5 text-[10px] font-extrabold tracking-widest shadow-lg transition-all duration-300 ${
                isActive
                  ? "bg-[#5B8DEF] text-white shadow-[#5B8DEF]/20 delay-[500ms]"
                  : "bg-white/5 text-gray-500 delay-0"
              } ${stepNum % 2 !== 0 ? "bottom-[28px]" : "top-[28px]"}`}
            >
              STEP {stepNum < 10 ? `0${stepNum}` : stepNum}
            </div>

            {/* Dot */}
            <div
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                isActive ? "bg-[#5B8DEF] shadow-[0_0_10px_rgba(91,141,239,0.8)] delay-[500ms]" : "bg-white/20 delay-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;