import { useState } from "react";
import {
  FaTint,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const WaterTracker = () => {
  const { user } = useUser();

  const weight = Number(user.weight) || 60;

  // Approximate daily target: 35 ml per kg
  const targetLiters = Math.max(
    2,
    Math.round(((weight * 0.035) * 10)) / 10
  );

  const targetGlasses = Math.ceil(
    targetLiters / 0.25
  );

  const [glasses, setGlasses] = useState(0);

  const progress = Math.min(
    (glasses / targetGlasses) * 100,
    100
  );

  const addGlass = () => {
    setGlasses((current) =>
      Math.min(current + 1, targetGlasses)
    );
  };

  const removeGlass = () => {
    setGlasses((current) =>
      Math.max(current - 1, 0)
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
              <FaTint />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
                Hydration
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Water Intake
              </h2>

            </div>

          </div>

          <p className="text-xs text-gray-300">
            {targetLiters} L target
          </p>

        </div>

        {/* MAIN */}

        <div className="mt-6 flex items-center gap-5">

          {/* WATER CIRCLE */}

          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white/5">

            <div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                borderTopColor:
                  "#5B8DEF",
                borderRightColor:
                  progress >= 50
                    ? "#5B8DEF"
                    : "transparent",
                borderBottomColor:
                  progress >= 75
                    ? "#5B8DEF"
                    : "transparent",
                borderLeftColor:
                  progress >= 25
                    ? "#5B8DEF"
                    : "transparent",
                transform:
                  "rotate(-45deg)",
              }}
            />

            <div className="text-center">

              <p className="text-2xl font-bold">
                {glasses}
              </p>

              <p className="text-[10px] text-gray-300">
                / {targetGlasses} glasses
              </p>

            </div>

          </div>

          {/* CONTROLS */}

          <div className="flex-1">

            <p className="text-sm text-gray-400">
              {glasses * 0.25} L consumed
            </p>

            <p className="mt-1 text-xs text-gray-300">
              One glass = 250 ml
            </p>

            <div className="mt-4 flex gap-2">

              <button
                type="button"
                onClick={removeGlass}
                disabled={glasses === 0}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FaMinus />
              </button>

              <button
                type="button"
                onClick={addGlass}
                disabled={
                  glasses >= targetGlasses
                }
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#5B8DEF] text-sm font-bold text-white transition hover:bg-[#6d9cff] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <FaPlus />
                Add Water
              </button>

            </div>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="mt-6">

          <div className="flex justify-between text-xs">

            <span className="text-gray-300">
              Daily progress
            </span>

            <span className="font-semibold text-[#5B8DEF]">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-cyan-400 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* COMPLETED */}

        {glasses >= targetGlasses && (

          <div className="mt-4 rounded-xl bg-[#5B8DEF]/10 px-4 py-3 text-center">

            <p className="text-xs font-semibold text-[#5B8DEF]">
              💧 Daily hydration goal reached!
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default WaterTracker;