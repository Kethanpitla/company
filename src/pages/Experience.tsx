import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSeedling,
  FaDumbbell,
  FaMedal,
} from "react-icons/fa";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import OptionCard from "../components/onboarding/OptionCard";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const Experience = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const [level, setLevel] = useState(user.level);
  const [years, setYears] = useState(
    user.trainingYears ? String(user.trainingYears) : ""
  );

  const valid =
    level === "Advanced"
      ? years.trim() !== ""
      : level !== "";

  const handleNext = () => {
    if (!valid) return;

    setUser({
      ...user,
      level,
      trainingYears:
        level === "Advanced"
          ? Number(years)
          : 0,
    });

    navigate("/workout-days");
  };

  return (
    <OnboardingLayout step={4} totalSteps={10}>
      <StepHeader
        title="Training Experience"
        subtitle="Select your current experience level."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        <OptionCard
          title="Beginner"
          icon={<FaSeedling />}
          selected={level === "Beginner"}
          onClick={() => setLevel("Beginner")}
        />

        <OptionCard
          title="Intermediate"
          icon={<FaDumbbell />}
          selected={level === "Intermediate"}
          onClick={() => setLevel("Intermediate")}
        />

        <OptionCard
          title="Advanced"
          icon={<FaMedal />}
          selected={level === "Advanced"}
          onClick={() => setLevel("Advanced")}
        />

      </div>

      {level === "Advanced" && (
        <div className="mt-10 max-w-md mx-auto">

          <label className="text-gray-300">
            Years of Training
          </label>

          <input
            type="number"
            min={1}
            placeholder="Enter years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none focus:border-yellow-400"
          />

        </div>
      )}

      <div className="mt-14 flex justify-between">

        <BackButton
          onClick={() => navigate("/goal")}
        />

        <NextButton
          onClick={handleNext}
          disabled={!valid}
        />

      </div>
    </OnboardingLayout>
  );
};

export default Experience;