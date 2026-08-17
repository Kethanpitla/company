import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaHandPaper,
  FaWalking,
} from "react-icons/fa";
import { MdAccessible } from "react-icons/md";

import { useUser } from "../context/UserContext";

import OnboardingLayout from "../components/onboarding/OnboardingLayout";
import StepHeader from "../components/onboarding/StepHeader";
import OptionCard from "../components/onboarding/OptionCard";
import BackButton from "../components/onboarding/BackButton";
import NextButton from "../components/onboarding/NextButton";

const Health = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const [condition, setCondition] = useState(user.healthCondition);

  const conditions = [
    {
      title: "None",
      icon: <FaHeartbeat />,
    },
    {
      title: "Shoulder Injury",
      icon: <FaHandPaper />,
    },
    {
      title: "Back Pain",
      icon: <MdAccessible />,
    },
    {
      title: "Knee Injury",
      icon: <FaWalking />,
    },
    {
      title: "Neck Pain",
      icon: <FaHeartbeat />,
    },
    {
      title: "Other",
      icon: <FaHeartbeat />,
    },
  ];

  const handleNext = () => {
    if (!condition) return;

    setUser({
      ...user,
      healthCondition: condition,
    });

    navigate("/diet");
  };

  return (
    <OnboardingLayout step={7} totalSteps={10}>
      <StepHeader
        title="Health Condition"
        subtitle="Do you have any injuries or medical conditions?"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conditions.map((item) => (
          <OptionCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            selected={condition === item.title}
            onClick={() => setCondition(item.title)}
          />
        ))}
      </div>

      <div className="mt-14 flex justify-between">
        <BackButton
          onClick={() => navigate("/workout-location")}
        />

        <NextButton
          onClick={handleNext}
          disabled={!condition}
        />
      </div>
    </OnboardingLayout>
  );
};

export default Health;