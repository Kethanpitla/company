import { FaDumbbell, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


const DashboardWorkout = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const todayWorkout = user.todayWorkout || [];
  const completedExercises = user.completedExercises || [];

  const progress =
    todayWorkout.length > 0
      ? Math.round(
          (completedExercises.filter((exercise) =>
            todayWorkout.includes(exercise)
          ).length /
            todayWorkout.length) *
            100
        )
      : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-xl">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
            <FaDumbbell />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Today's Workout
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#F5F0E8]">
              {todayWorkout.length > 0
                ? `${todayWorkout.length} Exercises`
                : "No workout started"}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/workout-session")}
          className="flex items-center gap-2 rounded-xl bg-[#F2A93B] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#ffc15b]"
        >
          {todayWorkout.length > 0 ? "Continue" : "Start"}
          <FaArrowRight />
        </button>
      </div>

      {/* PROGRESS */}
      {todayWorkout.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">
              Workout Progress
            </span>

            <span className="font-semibold text-[#5B8DEF]">
              {progress}%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-[#F2A93B] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* EXERCISES */}
      {todayWorkout.length > 0 && (
        <div className="mt-5 space-y-2">
          {todayWorkout.slice(0, 5).map((exercise) => {
            const completed =
              completedExercises.includes(exercise);

            return (
              <div
                key={exercise}
                className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  {exercise}
                </span>

                {completed && (
                  <FaCheckCircle className="text-green-400" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {todayWorkout.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-6 text-center">
          <FaDumbbell className="mx-auto text-2xl text-gray-300" />

          <p className="mt-3 text-sm text-gray-400">
            Your workout is ready.
          </p>

          <p className="mt-1 text-xs text-gray-300">
            Start today's session and track every exercise.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardWorkout;