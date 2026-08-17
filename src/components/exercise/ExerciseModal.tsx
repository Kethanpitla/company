import { FaTimes, FaFire, FaDumbbell } from "react-icons/fa";
import  type { Exercise } from "../../types/exercise";

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const ExerciseModal = ({
  exercise,
  onClose,
}: ExerciseModalProps) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm p-6">

      <div className="relative w-full max-w-4xl rounded-3xl border border-yellow-500/20 bg-[#0b0b0b] p-8">

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h1 className="text-4xl font-bold text-white">
          {exercise.name}
        </h1>

        <div className="mt-6 grid grid-cols-4 gap-4">

          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-gray-400">Muscle</p>
            <h3 className="mt-2 text-xl font-bold text-yellow-400">
              {exercise.muscleGroup}
            </h3>
          </div>

          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-gray-400">Equipment</p>
            <h3 className="mt-2 text-xl font-bold text-white">
              {exercise.equipment}
            </h3>
          </div>

          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-gray-400">Difficulty</p>
            <h3 className="mt-2 text-xl font-bold text-green-400">
              {exercise.difficulty}
            </h3>
          </div>

          <div className="rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2 text-orange-400">
              <FaFire />
              Calories
            </div>

            <h3 className="mt-2 text-xl font-bold text-white">
              {exercise.calories}
            </h3>
          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-[#0F172A]/40 p-6">

          <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-yellow-400">
            <FaDumbbell />
            Instructions
          </h2>

          <ol className="list-decimal space-y-3 pl-6 text-gray-300">
            {(exercise.instructions || []).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-green-500/10 p-6">

            <h2 className="text-xl font-bold text-green-400">
              Tips
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-300">
              {(exercise.tips || []).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>

          </div>

          <div className="rounded-2xl bg-red-500/10 p-6">

            <h2 className="text-xl font-bold text-red-400">
              Common Mistakes
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-300">
              {(exercise.mistakes || []).map((mistake, index) => (
                <li key={index}>{mistake}</li>
              ))}
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExerciseModal;