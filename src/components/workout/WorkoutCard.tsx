import { useState } from "react";
import {
  FaCalendarDay,
  FaDumbbell,
  FaCheckCircle,
} from "react-icons/fa";
import type { WorkoutDay } from "../../types/workout";
import ExerciseCard from "./ExerciseCard";

interface WorkoutCardProps {
  workout: WorkoutDay;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const [completedExercises, setCompletedExercises] = useState<
    number[]
  >([]);

  const toggleExercise = (id: number) => {
    setCompletedExercises((prev) =>
      prev.includes(id)
        ? prev.filter((exerciseId) => exerciseId !== id)
        : [...prev, id]
    );
  };

  const completedCount = completedExercises.length;

  const totalExercises = workout.exercises.length;

  const progress =
    totalExercises === 0
      ? 0
      : (completedCount / totalExercises) * 100;

  const workoutCompleted =
    totalExercises > 0 &&
    completedCount === totalExercises;

  return (
    <div
      className={`rounded-3xl border p-6 transition-all duration-300 ${
        workoutCompleted
          ? "border-green-500/30 bg-green-500/5"
          : "border-white/10 bg-white/5"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10">
            <FaCalendarDay className="text-2xl text-yellow-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {workout.day}
            </h2>

            <p className="mt-1 text-gray-400">
              {workout.focus}
            </p>
          </div>
        </div>

        {/* Completion */}
        <div
          className={`rounded-xl px-4 py-3 ${
            workoutCompleted
              ? "bg-green-500/10"
              : "bg-[#0F172A]/50"
          }`}
        >
          <div className="flex items-center gap-2">
            {workoutCompleted && (
              <FaCheckCircle className="text-green-400" />
            )}

            <span
              className={`font-semibold ${
                workoutCompleted
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {completedCount}/{totalExercises} completed
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Workout Progress
          </span>

          <span className="text-sm font-semibold text-yellow-400">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Exercises */}
      <div className="mt-8 space-y-4">
        {workout.exercises.length > 0 ? (
          workout.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              completed={completedExercises.includes(
                exercise.id
              )}
              onToggle={() =>
                toggleExercise(exercise.id)
              }
            />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#0F172A]/50 p-8 text-center">
            <FaDumbbell className="mx-auto text-4xl text-gray-300" />

            <p className="mt-4 text-gray-400">
              No exercises available for this workout.
            </p>
          </div>
        )}
      </div>

      {/* Completed Message */}
      {workoutCompleted && (
        <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-center">
          <FaCheckCircle className="mx-auto text-3xl text-green-400" />

          <h3 className="mt-3 text-xl font-bold text-green-400">
            Workout Completed 🎉
          </h3>

          <p className="mt-2 text-gray-400">
            Great work! Keep building your consistency.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;