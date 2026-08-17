import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import OptionCard from "../components/onboarding/OptionCard";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const WorkoutDays = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const [days, setDays] = useState<number | null>(
    user.workoutDays || null
  );

  const workoutDays = [2, 3, 4, 5, 6, 7];

  const handleNext = () => {
    if (days === null) return;

    setUser({
      ...user,
      workoutDays: days,
    });

    navigate("/workout-location");
  };

  return (
    <OnboardingLayout step={5} totalSteps={10}>
      <StepHeader
        title="Workout Schedule"
        subtitle="How many days can you train every week?"
      />

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
        {workoutDays.map((day) => (
          <OptionCard
            key={day}
            title={`${day} Days`}
            icon={
              <span className="text-5xl font-bold">
                {day}
              </span>
            }
            selected={days === day}
            onClick={() => setDays(day)}
          />
        ))}
      </div>

      <div className="mt-14 flex justify-between">

        <BackButton
          onClick={() => navigate("/experience")}
        />

        <NextButton
          onClick={handleNext}
          disabled={days === null}
        />

      </div>
    </OnboardingLayout>
  );
};

export default WorkoutDays;