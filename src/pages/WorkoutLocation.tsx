import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaHome } from "react-icons/fa";
import { MdFitnessCenter } from "react-icons/md";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import OptionCard from "../components/onboarding/OptionCard";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const WorkoutLocation = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const [location, setLocation] = useState(user.workoutLocation);

  const handleNext = () => {
    if (!location) return;

    setUser({
      ...user,
      workoutLocation: location,
    });

    navigate("/health");
  };

  return (
    <OnboardingLayout step={6} totalSteps={10}>
      <StepHeader
        title="Workout Location"
        subtitle="Where will you usually train?"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

        <OptionCard
          title="Gym"
          icon={<FaDumbbell />}
          selected={location === "Gym"}
          onClick={() => setLocation("Gym")}
        />

        <OptionCard
          title="Home"
          icon={<FaHome />}
          selected={location === "Home"}
          onClick={() => setLocation("Home")}
        />

        <OptionCard
          title="Both"
          icon={<MdFitnessCenter />}
          selected={location === "Both"}
          onClick={() => setLocation("Both")}
        />

      </div>

      <div className="mt-14 flex justify-between">

        <BackButton
          onClick={() => navigate("/workout-days")}
        />

        <NextButton
          onClick={handleNext}
          disabled={!location}
        />

      </div>
    </OnboardingLayout>
  );
};

export default WorkoutLocation;