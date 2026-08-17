import {
  FaClock,
  FaFire,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const WorkoutCard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const exercises = [
    "Bench Press - 4 x 10",
    "Incline Dumbbell Press - 3 x 12",
    "Cable Fly - 3 x 15",
    "Push Ups - 3 Sets",
    "Chest Dips - 3 x 12",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Today's Workout
          </h2>

          <p className="mt-2 text-gray-400">
            {user.goal || "Workout Plan"}
          </p>
        </div>

        <button 
          onClick={() => navigate('/workout-session')}
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >

          <FaPlay />

          Start Workout

        </button>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-white/5 p-5">

          <FaClock className="text-2xl text-yellow-400" />

          <p className="mt-3 text-gray-400">
            Duration
          </p>

          <h3 className="text-2xl font-bold text-white">
            75 min
          </h3>

        </div>

        <div className="rounded-2xl bg-white/5 p-5">

          <FaFire className="text-2xl text-orange-400" />

          <p className="mt-3 text-gray-400">
            Calories
          </p>

          <h3 className="text-2xl font-bold text-white">
            520 kcal
          </h3>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-xl font-semibold text-white">
          Exercises
        </h3>

        <div className="space-y-4">

          {exercises.map((exercise) => (

            <div
              key={exercise}
              className="flex items-center justify-between rounded-xl bg-white/5 p-4 hover:bg-white/10 transition"
            >

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-green-400" />

                <span className="text-white">
                  {exercise}
                </span>

              </div>

              <input
                type="checkbox"
                className="h-5 w-5 accent-yellow-400"
              />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default WorkoutCard;