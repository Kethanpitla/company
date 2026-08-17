import { useMemo, useState } from "react";
import {
  FaWeight,
  FaArrowDown,
  FaArrowUp,
  FaMinus,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const WeightTracker = () => {
  const { user } = useUser();

  const currentWeight = Number(user.weight) || 0;
  const targetWeight = Number(user.targetWeight) || currentWeight;

  const [weight, setWeight] =
    useState(currentWeight);

  const difference =
    Number((weight - targetWeight).toFixed(1));

  const isAtTarget =
    Math.abs(difference) < 0.1;

  const progress = useMemo(() => {
    if (!currentWeight || !targetWeight) {
      return 0;
    }

    const goal = user.goal?.toLowerCase() || "";

    if (
      goal.includes("gain") ||
      goal.includes("muscle") ||
      goal.includes("bulk")
    ) {
      return Math.min(
        Math.max(
          ((weight - currentWeight) /
            (targetWeight - currentWeight || 1)) *
            100,
          0
        ),
        100
      );
    }

    return Math.min(
      Math.max(
        ((currentWeight - weight) /
          (currentWeight - targetWeight || 1)) *
          100,
        0
      ),
      100
    );
  }, [
    currentWeight,
    targetWeight,
    weight,
    user.goal,
  ]);

  const weeklyData = [
    currentWeight + 1.2,
    currentWeight + 0.8,
    currentWeight + 0.6,
    currentWeight + 0.3,
    currentWeight + 0.2,
    currentWeight,
    weight,
  ];

  const minWeight =
    Math.min(...weeklyData) - 1;

  const maxWeight =
    Math.max(...weeklyData) + 1;

  const getPointPosition = (
    value: number
  ) => {
    if (maxWeight === minWeight) {
      return 50;
    }

    return (
      100 -
      ((value - minWeight) /
        (maxWeight - minWeight)) *
        100
    );
  };

  const getTrendIcon = () => {
    if (difference === 0) {
      return <FaMinus />;
    }

    const goal =
      user.goal?.toLowerCase() || "";

    if (
      goal.includes("gain") ||
      goal.includes("muscle") ||
      goal.includes("bulk")
    ) {
      return difference > 0 ? (
        <FaArrowUp />
      ) : (
        <FaArrowDown />
      );
    }

    return difference < 0 ? (
      <FaArrowDown />
    ) : (
      <FaArrowUp />
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
              <FaWeight />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
                Body Progress
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Weight Tracker
              </h2>

            </div>

          </div>

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              difference === 0
                ? "bg-white/5 text-gray-400"
                : difference < 0
                  ? "bg-green-400/10 text-green-400"
                  : "bg-[#F2A93B]/10 text-[#F2A93B]"
            }`}
          >
            {getTrendIcon()}
          </div>

        </div>

        {/* CURRENT / TARGET */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

            <p className="text-xs text-gray-300">
              Current
            </p>

            <p className="mt-1 text-2xl font-bold">
              {weight}
              <span className="ml-1 text-xs font-normal text-gray-300">
                kg
              </span>
            </p>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

            <p className="text-xs text-gray-300">
              Target
            </p>

            <p className="mt-1 text-2xl font-bold">
              {targetWeight}
              <span className="ml-1 text-xs font-normal text-gray-300">
                kg
              </span>
            </p>

          </div>

        </div>

        {/* DIFFERENCE */}

        <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-gray-300">
                Remaining
              </p>

              <p className="mt-1 text-sm font-semibold">
                {isAtTarget
                  ? "Goal reached 🎉"
                  : `${Math.abs(
                      difference
                    )} kg to target`}
              </p>

            </div>

            <p className="text-sm font-bold text-[#5B8DEF]">
              {Math.round(progress)}%
            </p>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-[#F2A93B] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* CHART */}

        <div className="mt-6">

          <div className="flex items-center justify-between">

            <p className="text-xs text-gray-300">
              Last 7 entries
            </p>

            <p className="text-xs text-gray-300">
              kg
            </p>

          </div>

          <div className="relative mt-4 h-28">

            {/* GRID */}

            <div className="absolute inset-0 flex flex-col justify-between">

              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />

            </div>

            {/* POINTS */}

            <div className="absolute inset-0 flex items-center justify-between px-1">

              {weeklyData.map(
                (value, index) => {

                  const position =
                    getPointPosition(value);

                  return (
                    <div
                      key={index}
                      className="relative h-full w-3"
                    >

                      <div
                        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[#231C2E] bg-[#5B8DEF] shadow-lg shadow-[#5B8DEF]/30"
                        style={{
                          top: `${position}%`,
                        }}
                      />

                    </div>
                  );
                }
              )}

            </div>

          </div>

          <div className="mt-2 flex justify-between text-[10px] text-gray-700">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Today</span>
          </div>

        </div>

        {/* DEMO UPDATE */}

        <div className="mt-6">

          <label
            htmlFor="weight-input"
            className="text-xs text-gray-300"
          >
            Update today's weight
          </label>

          <div className="mt-2 flex gap-2">

            <input
              id="weight-input"
              type="number"
              min="1"
              step="0.1"
              value={weight}
              onChange={(e) =>
                setWeight(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-[#5B8DEF]/40"
            />

            <button
              type="button"
              onClick={() =>
                setWeight(currentWeight)
              }
              className="rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              Reset
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default WeightTracker;