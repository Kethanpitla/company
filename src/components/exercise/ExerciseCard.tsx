import type { Exercise } from "../../types/exercise";
import { FaFire, FaPlay } from "react-icons/fa";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

const ExerciseCard = ({
  exercise,
  onClick,
}: ExerciseCardProps) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-yellow-400/40 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {exercise.name}
        </h2>

        <span className="rounded-lg bg-yellow-500/20 px-3 py-1 text-yellow-400">
          {exercise.difficulty}
        </span>
      </div>

      <p className="mt-3 text-gray-400">
        {exercise.muscleGroup}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-400">
          <FaFire />
          {exercise.calories} kcal
        </div>

        <button
          onClick={onClick}
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black"
        >
          <FaPlay />
          View
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;