import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import NextButton from "../components/onboarding/NextButton";
import BackButton from "../components/onboarding/BackButton";

const Gender = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const [gender, setGender] = useState(user.gender);

  const handleNext = () => {
    if (!gender) return;

    setUser({
      ...user,
      gender,
    });

    navigate("/physical-info");
  };

  return (
    <OnboardingLayout
      step={1}
      totalSteps={10}
    >
      <StepHeader
        title="Select Your Gender"
        subtitle="This helps us personalize your workout and diet plans."
      />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setGender("Male")}
          className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all glass-panel glow-on-hover aspect-[3/4] flex flex-col justify-end
          ${
            gender === "Male"
              ? "border-[#5B8DEF] shadow-[0_0_20px_rgba(91,141,239,0.3)] ring-2 ring-[#5B8DEF]"
              : "border-white/10"
          }`}
        >
          <img 
            src="/images/male.png" 
            alt="Male" 
            className="absolute inset-0 h-full w-full object-cover object-center mix-blend-overlay opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />
          
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
              Male
            </h2>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setGender("Female")}
          className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all glass-panel glow-on-hover aspect-[3/4] flex flex-col justify-end
          ${
            gender === "Female"
              ? "border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.3)] ring-2 ring-purple-400"
              : "border-white/10"
          }`}
        >
          <img 
            src="/images/female.png" 
            alt="Female" 
            className="absolute inset-0 h-full w-full object-cover object-center mix-blend-overlay opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />
          
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
              Female
            </h2>
          </div>
        </motion.div>

      </div>

      <div className="mt-14 flex justify-between">

        <BackButton
          onClick={() => navigate("/signup")}
        />

        <NextButton
          onClick={handleNext}
          disabled={!gender}
        />

      </div>
    </OnboardingLayout>
  );
};

export default Gender;