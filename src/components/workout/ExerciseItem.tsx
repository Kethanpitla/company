import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

interface ExerciseItemProps {
  name: string;
  sets: number;
  reps: string;
  completed: boolean;
  active: boolean;
  onComplete: () => void;
}

const ExerciseItem = ({
  name,
  sets,
  reps,
  completed,
  active,
  onComplete,
}: ExerciseItemProps) => {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        active
          ? "border-yellow-400 bg-yellow-400/10"
          : completed
          ? "border-green-500/30 bg-green-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-xl font-bold ${
              completed ? "text-green-400" : "text-white"
            }`}
          >
            {name}
          </h3>

          <p className="mt-2 text-gray-400">
            {sets} Sets × {reps} Reps
          </p>
        </div>

        <button
          onClick={onComplete}
          className="text-3xl transition hover:scale-110"
        >
          {completed ? (
            <FaCheckCircle className="text-green-400" />
          ) : (
            <FaRegCircle className="text-gray-500 hover:text-yellow-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ExerciseItem;