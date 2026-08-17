import {
  FaArrowLeft,
  FaDumbbell,
  FaFire,
  FaWeight,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Progress = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const weightHistory = user.weightHistory || [];
  const workoutHistory = user.workoutHistory || [];

  const currentWeight = Number(user.weight) || 0;
  const targetWeight = Number(user.targetWeight) || 0;

  const startingWeight =
    weightHistory.length > 0
      ? weightHistory[0]
      : currentWeight;

  const weightChange =
    currentWeight - startingWeight;

  const workoutsCompleted =
    workoutHistory.length;

  const weeklyWorkoutGoal =
    Number(user.workoutDays) || 3;

  const weeklyProgress = Math.min(
    Math.round(
      (workoutsCompleted / weeklyWorkoutGoal) * 100
    ),
    100
  );

  const maxWeight =
    weightHistory.length > 0
      ? Math.max(...weightHistory, currentWeight)
      : currentWeight;

  const minWeight =
    weightHistory.length > 0
      ? Math.min(...weightHistory, currentWeight)
      : currentWeight;

  const weightRange =
    Math.max(maxWeight - minWeight, 1);

  return (
    <div className="min-h-screen bg-[#15111C] text-[#F5F0E8]">
      <main className="mx-auto max-w-6xl p-5 sm:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* HEADER */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-xl">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

          <div className="relative">

            <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
              Your Journey
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Progress
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Track your workouts, body weight and
              consistency over time.
            </p>

          </div>
        </div>

        {/* STATS */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* WEIGHT */}

          <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Current Weight
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {currentWeight || "--"}
                  <span className="ml-1 text-sm text-gray-500">
                    kg
                  </span>
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2A93B]/10 text-[#F2A93B]">
                <FaWeight />
              </div>

            </div>

          </div>

          {/* TARGET */}

          <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Target Weight
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {targetWeight || "--"}
                  <span className="ml-1 text-sm text-gray-500">
                    kg
                  </span>
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
                <FaChartLine />
              </div>

            </div>

          </div>

          {/* WORKOUTS */}

          <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Workouts
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {workoutsCompleted}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
                <FaDumbbell />
              </div>

            </div>

          </div>

          {/* STREAK */}

          <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Current Streak
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {user.streak || 0}
                  <span className="ml-1 text-sm text-gray-500">
                    days
                  </span>
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2A93B]/10 text-[#F2A93B]">
                <FaFire />
              </div>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* WEIGHT PROGRESS */}

          <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Weight Progress
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Body Weight
                </h2>
              </div>

              <FaWeight className="text-[#F2A93B]" />

            </div>

            {/* CHANGE */}

            <div className="mt-6 rounded-2xl bg-white/[0.03] p-4">

              <p className="text-xs text-gray-500">
                Change since tracking started
              </p>

              <p
                className={`mt-2 text-2xl font-bold ${
                  weightChange < 0
                    ? "text-green-400"
                    : weightChange > 0
                      ? "text-[#F2A93B]"
                      : "text-gray-300"
                }`}
              >
                {weightChange > 0 ? "+" : ""}
                {weightChange.toFixed(1)} kg
              </p>

            </div>

            {/* SIMPLE GRAPH */}

            <div className="mt-6">

              {weightHistory.length > 1 ? (

                <div className="relative h-52">

                  <div className="absolute inset-0 flex flex-col justify-between">

                    {[0, 1, 2, 3].map((line) => (
                      <div
                        key={line}
                        className="border-t border-white/5"
                      />
                    ))}

                  </div>

                  <div className="absolute inset-0 flex items-end gap-2 px-2">

                    {weightHistory.map(
                      (weightValue, index) => {

                        const height =
                          ((weightValue -
                            minWeight) /
                            weightRange) *
                            75 +
                          20;

                        return (
                          <div
                            key={index}
                            className="group flex h-full flex-1 items-end justify-center"
                          >

                            <div
                              className="relative w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-[#5B8DEF] to-[#F2A93B] transition-all"
                              style={{
                                height: `${height}%`,
                              }}
                            >

                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 opacity-0 transition group-hover:opacity-100">
                                {weightValue}kg
                              </span>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

              ) : (

                <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-white/10">

                  <div className="text-center">

                    <FaChartLine className="mx-auto text-2xl text-gray-300" />

                    <p className="mt-3 text-sm text-gray-500">
                      Not enough data yet
                    </p>

                    <p className="mt-1 text-xs text-gray-300">
                      Keep tracking your weight to see progress.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* WORKOUT CONSISTENCY */}

          <div className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Consistency
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Workout Performance
                </h2>
              </div>

              <FaDumbbell className="text-[#5B8DEF]" />

            </div>

            {/* WEEKLY TARGET */}

            <div className="mt-6">

              <div className="flex justify-between text-xs">

                <span className="text-gray-500">
                  Weekly target
                </span>

                <span className="font-semibold text-[#5B8DEF]">
                  {workoutsCompleted}/
                  {weeklyWorkoutGoal}
                </span>

              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-[#F2A93B] transition-all"
                  style={{
                    width: `${weeklyProgress}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-right text-xs text-gray-300">
                {weeklyProgress}% complete
              </p>

            </div>

            {/* ACHIEVEMENT */}

            <div className="mt-6 rounded-2xl border border-[#F2A93B]/10 bg-[#F2A93B]/5 p-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2A93B]/10 text-[#F2A93B]">
                  <FaTrophy />
                </div>

                <div>

                  <p className="text-sm font-bold">
                    {user.streak > 0
                      ? "Keep the streak alive!"
                      : "Start your journey"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {user.streak > 0
                      ? `${user.streak} consecutive workout days`
                      : "Complete your first workout to begin."}
                  </p>

                </div>

              </div>

            </div>

            {/* HISTORY */}

            <div className="mt-6">

              <p className="mb-3 text-xs uppercase tracking-wider text-gray-300">
                Recent Workouts
              </p>

              {workoutHistory.length > 0 ? (

                <div className="space-y-2">

                  {workoutHistory
                    .slice(-5)
                    .reverse()
                    .map((date, index) => (

                      <div
                        key={`${date}-${index}`}
                        className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3"
                      >

                        <div className="flex items-center gap-3">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-400/10 text-green-400">
                            <FaCheckCircle />
                          </div>

                          <span className="text-sm text-gray-300">
                            Workout completed
                          </span>

                        </div>

                        <span className="text-[10px] text-gray-300">
                          {new Date(date).toLocaleDateString()}
                        </span>

                      </div>

                    ))}

                </div>

              ) : (

                <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center">

                  <p className="text-xs text-gray-300">
                    No completed workouts yet.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Progress;