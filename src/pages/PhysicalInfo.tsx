import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Ruler, Weight, Target } from "lucide-react";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const PhysicalInfo = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [age, setAge] = useState(user.age ? String(user.age) : "");
  const [height, setHeight] = useState(user.height ? String(user.height) : "");
  const [weight, setWeight] = useState(user.weight ? String(user.weight) : "");
  const [targetWeight, setTargetWeight] = useState(
    user.targetWeight ? String(user.targetWeight) : ""
  );

  const isValid =
    age.trim() !== "" &&
    height.trim() !== "" &&
    weight.trim() !== "" &&
    targetWeight.trim() !== "";

  const handleNext = () => {
    if (!isValid) return;

    const ageNumber = Number(age);
    const heightNumber = Number(height);
    const weightNumber = Number(weight);
    const targetWeightNumber = Number(targetWeight);

    const bmi = Number(
      (weightNumber / Math.pow(heightNumber / 100, 2)).toFixed(1)
    );

    setUser({
      ...user,
      age: ageNumber,
      height: heightNumber,
      weight: weightNumber,
      targetWeight: targetWeightNumber,
      bmi,
    });

    navigate("/goal");
  };

  return (
    <OnboardingLayout step={2} totalSteps={10}>
      <StepHeader
        title="Physical Stats"
        subtitle="We need this to calculate your BMI and daily caloric needs."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* AGE */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }} 
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B8DEF]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-[#5B8DEF]/50 group-hover:bg-white/10 group-focus-within:border-[#5B8DEF] group-focus-within:shadow-[0_0_30px_rgba(91,141,239,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#5B8DEF]/20 rounded-2xl text-[#5B8DEF] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Calendar className="w-6 h-6" />
              </div>
              <label className="text-gray-300 font-medium text-lg">
                Age
              </label>
            </div>
            
            <div className="flex items-end gap-2 border-b-2 border-white/10 pb-2 transition-colors duration-300 group-focus-within:border-[#5B8DEF]/50">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                className="w-full bg-transparent text-5xl font-bold text-white outline-none placeholder:text-gray-600 transition-colors"
              />
              <span className="text-gray-400 font-medium text-xl mb-1">yrs</span>
            </div>
          </div>
        </motion.div>

        {/* HEIGHT */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }} 
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-[#5B8DEF]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-[#5B8DEF]/50 group-hover:bg-white/10 group-focus-within:border-[#5B8DEF] group-focus-within:shadow-[0_0_30px_rgba(91,141,239,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#5B8DEF]/20 rounded-2xl text-[#5B8DEF] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                <Ruler className="w-6 h-6" />
              </div>
              <label className="text-gray-300 font-medium text-lg">
                Height
              </label>
            </div>
            
            <div className="flex items-end gap-2 border-b-2 border-white/10 pb-2 transition-colors duration-300 group-focus-within:border-[#5B8DEF]/50">
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="w-full bg-transparent text-5xl font-bold text-white outline-none placeholder:text-gray-600 transition-colors"
              />
              <span className="text-gray-400 font-medium text-xl mb-1">cm</span>
            </div>
          </div>
        </motion.div>

        {/* WEIGHT */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }} 
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5B8DEF]/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-[#5B8DEF]/50 group-hover:bg-white/10 group-focus-within:border-[#5B8DEF] group-focus-within:shadow-[0_0_30px_rgba(91,141,239,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#5B8DEF]/20 rounded-2xl text-[#5B8DEF] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                <Weight className="w-6 h-6" />
              </div>
              <label className="text-gray-300 font-medium text-lg">
                Current Weight
              </label>
            </div>
            
            <div className="flex items-end gap-2 border-b-2 border-white/10 pb-2 transition-colors duration-300 group-focus-within:border-[#5B8DEF]/50">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full bg-transparent text-5xl font-bold text-white outline-none placeholder:text-gray-600 transition-colors"
              />
              <span className="text-gray-400 font-medium text-xl mb-1">kg</span>
            </div>
          </div>
        </motion.div>

        {/* TARGET WEIGHT */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }} 
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-white/10 group-focus-within:border-purple-400 group-focus-within:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Target className="w-6 h-6" />
              </div>
              <label className="text-gray-300 font-medium text-lg">
                Target Weight
              </label>
            </div>
            
            <div className="flex items-end gap-2 border-b-2 border-white/10 pb-2 transition-colors duration-300 group-focus-within:border-purple-400/50">
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="75"
                className="w-full bg-transparent text-5xl font-bold text-white outline-none placeholder:text-gray-600 transition-colors"
              />
              <span className="text-gray-400 font-medium text-xl mb-1">kg</span>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="mt-16 flex justify-between">
        <BackButton onClick={() => navigate("/gender")} />
        <NextButton onClick={handleNext} disabled={!isValid} />
      </div>
    </OnboardingLayout>
  );
};

export default PhysicalInfo;