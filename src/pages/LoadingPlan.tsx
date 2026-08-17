import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaAppleAlt } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const LoadingPlan = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const generatePlan = () => {
      /*
       * Collect the user's information.
       * The actual 7-day plan will be generated
       * inside DietPlanner using this information.
       */

      const profile = {
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        targetWeight: user.targetWeight,
        goal: user.goal,
        level: user.level,
        trainingYears: user.trainingYears,
        workoutDays: user.workoutDays,
        workoutLocation:
          user.workoutLocation,
        healthCondition:
          user.healthCondition,
        dietType: user.dietType,
        weeklyBudget:
          user.weeklyBudget,
      };

      localStorage.setItem(
        "dietProfile",
        JSON.stringify(profile)
      );

      const timer = setTimeout(() => {
        navigate("/diet-planner", {
          replace: true,
        });
      }, 1800);

      return () => clearTimeout(timer);
    };

    const cleanup = generatePlan();

    return cleanup;
  }, [navigate, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F172A] px-6 text-white">

      <div className="w-full max-w-xl text-center">

        {/* Icon */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-green-400/10">

          <FaAppleAlt className="animate-pulse text-4xl text-green-400" />

        </div>

        {/* Heading */}

        <h1 className="mt-8 text-3xl font-bold sm:text-4xl">
          Creating Your Diet Plan
        </h1>

        <p className="mt-3 text-gray-500">
          We're analyzing your body, goal,
          workouts, diet preference and budget.
        </p>

        {/* Loading */}

        <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">

          <div className="h-full w-1/2 animate-pulse rounded-full bg-green-400" />

        </div>

        {/* Analysis */}

        <div className="mt-10 space-y-4 text-left">

          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">

            <FaDumbbell className="text-xl text-yellow-400" />

            <div>

              <p className="font-semibold">
                Fitness Goal
              </p>

              <p className="text-sm text-gray-500">
                {user.goal || "Analyzing..."}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">

            <FaAppleAlt className="text-xl text-green-400" />

            <div>

              <p className="font-semibold">
                Diet Preference
              </p>

              <p className="text-sm text-gray-500">
                {user.dietType || "Analyzing..."}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">

            <span className="text-xl text-orange-400">
              ₹
            </span>

            <div>

              <p className="font-semibold">
                Weekly Food Budget
              </p>

              <p className="text-sm text-gray-500">
                ₹{user.weeklyBudget || 0}
              </p>

            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-gray-300">
          Building a 7-day personalized nutrition
          plan...
        </p>

      </div>

    </div>
  );
};

export default LoadingPlan;