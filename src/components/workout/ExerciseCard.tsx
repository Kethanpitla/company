import {
  FaCheckCircle,
  FaRegCircle,
  FaDumbbell,
  FaClock,
  FaFire,
} from "react-icons/fa";
import type { Exercise } from "../../types/workout";

interface ExerciseCardProps {
  exercise: Exercise;
  completed?: boolean;
  onToggle?: () => void;
}

const ExerciseCard = ({
  exercise,
  completed = false,
  onToggle,
}: ExerciseCardProps) => {
  return (
    <div
      className={`group rounded-2xl border p-5 transition-all duration-300 ${
        completed
          ? "border-green-500/30 bg-green-500/10"
          : "border-white/10 bg-[#0F172A]/50 hover:border-yellow-400/30 hover:bg-white/5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Exercise Info */}
        <div className="flex min-w-0 items-start gap-4">
          <button
            type="button"
            onClick={onToggle}
            disabled={!onToggle}
            className="mt-1 shrink-0 transition-transform duration-200 hover:scale-110 disabled:cursor-default"
            aria-label={
              completed
                ? `Mark ${exercise.name} as incomplete`
                : `Mark ${exercise.name} as completed`
            }
          >
            {completed ? (
              <FaCheckCircle className="text-3xl text-green-400" />
            ) : (
              <FaRegCircle className="text-3xl text-gray-500 transition-colors hover:text-yellow-400" />
            )}
          </button>

          <div>
            <h3
              className={`text-xl font-bold ${
                completed
                  ? "text-green-400 line-through"
                  : "text-white"
              }`}
            >
              {exercise.name}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {exercise.muscleGroup}
            </p>
          </div>
        </div>

        {/* Difficulty */}
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            exercise.difficulty === "Beginner"
              ? "bg-green-500/10 text-green-400"
              : exercise.difficulty === "Intermediate"
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {exercise.difficulty}
        </span>
      </div>

      {/* Exercise Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-xs text-gray-500">Sets</p>
          <p className="mt-1 font-bold text-white">
            {exercise.sets}
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-xs text-gray-500">Reps</p>
          <p className="mt-1 font-bold text-white">
            {exercise.reps}
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <FaClock className="text-yellow-400" />
            <p className="text-xs text-gray-500">
              Rest
            </p>
          </div>

          <p className="mt-1 font-bold text-white">
            {exercise.rest}
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="flex items-center gap-2">
            <FaFire className="text-orange-400" />
            <p className="text-xs text-gray-500">
              Calories
            </p>
          </div>

          <p className="mt-1 font-bold text-white">
            {exercise.calories} kcal
          </p>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FaDumbbell className="text-yellow-400" />
          <span>{exercise.equipment}</span>
        </div>

        <span className="text-sm text-gray-500">
          Estimated time: {exercise.duration}
        </span>
      </div>
    </div>
  );
};

export default ExerciseCard;