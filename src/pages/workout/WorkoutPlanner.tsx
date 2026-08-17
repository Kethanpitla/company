import { useMemo } from "react";
import {
  FaDumbbell,
  FaFire,
  FaCalendarAlt,
  FaBullseye,
} from "react-icons/fa";

import { useUser } from "../../context/UserContext";
import generateWorkoutPlan from "../../ai/workoutGenerator";
import WorkoutCard from "../../components/workout/WorkoutCard";

const WorkoutPlanner = () => {
  const { user } = useUser();

  const workoutPlan = useMemo(() => {
    return generateWorkoutPlan({
      goal: user.goal,
      level: user.experience,
      workoutDays: user.workoutDays,
      workoutLocation: user.workoutLocation,
      gender: user.gender,
      age: user.age,
    });
  }, [
    user.goal,
    user.experience,
    user.workoutDays,
    user.workoutLocation,
    user.gender,
    user.age,
  ]);

  const totalExercises = workoutPlan.days.reduce(
    (total, day) => total + day.exercises.length,
    0
  );

  const totalCalories = workoutPlan.days.reduce(
    (total, day) =>
      total +
      day.exercises.reduce(
        (dayCalories, exercise) =>
          dayCalories + exercise.calories,
        0
      ),
    0
  );

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
              <FaDumbbell className="text-2xl text-yellow-400" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                AI Workout Planner
              </h1>

              <p className="mt-2 text-gray-400">
                Your personalized training plan
              </p>
            </div>
          </div>
        </div>

        {/* User Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Goal */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <FaBullseye className="text-xl text-yellow-400" />

              <span className="text-sm text-gray-400">
                Goal
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-white">
              {user.goal || "Not selected"}
            </h3>
          </div>

          {/* Level */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <FaDumbbell className="text-xl text-blue-400" />

              <span className="text-sm text-gray-400">
                Level
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-white">
              {user.experience || "Beginner"}
            </h3>
          </div>

          {/* Workout Days */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-xl text-green-400" />

              <span className="text-sm text-gray-400">
                Training Days
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-white">
              {user.workoutDays || 3} Days / Week
            </h3>
          </div>

          {/* Calories */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <FaFire className="text-xl text-orange-400" />

              <span className="text-sm text-gray-400">
                Weekly Calories
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-white">
              {totalCalories.toLocaleString()} kcal
            </h3>
          </div>
        </div>

        {/* Workout Stats */}
        <div className="mb-8 rounded-3xl border border-yellow-500/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Weekly Workout Plan
              </h2>

              <p className="mt-2 text-gray-400">
                Designed according to your fitness profile.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="rounded-xl bg-[#0F172A]/50 px-5 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Days
                </p>

                <p className="mt-1 text-xl font-bold text-yellow-400">
                  {workoutPlan.days.length}
                </p>
              </div>

              <div className="rounded-xl bg-[#0F172A]/50 px-5 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Exercises
                </p>

                <p className="mt-1 text-xl font-bold text-green-400">
                  {totalExercises}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* No Profile Information */}
        {!user.goal && (
          <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-center">
            <h2 className="text-xl font-bold text-yellow-400">
              Complete your fitness profile
            </h2>

            <p className="mt-2 text-gray-400">
              Complete onboarding to receive a personalized
              workout plan.
            </p>
          </div>
        )}

        {/* Workout Days */}
        <div className="space-y-8">
          {workoutPlan.days.map((day) => (
            <WorkoutCard
              key={`${day.day}-${day.focus}`}
              workout={day}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;