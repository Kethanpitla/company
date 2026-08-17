import { useState } from "react";
import {
  FaFire,
  FaCheck,
  FaLock,
} from "react-icons/fa";

const StreakCard = () => {
  const [streak] = useState(0);

  const week = [
    {
      day: "M",
      completed: false,
    },
    {
      day: "T",
      completed: false,
    },
    {
      day: "W",
      completed: false,
    },
    {
      day: "T",
      completed: false,
    },
    {
      day: "F",
      completed: false,
    },
    {
      day: "S",
      completed: false,
    },
    {
      day: "S",
      completed: false,
    },
  ];

  const completedDays =
    week.filter(
      (day) => day.completed
    ).length;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#F2A93B]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2A93B]/10 text-[#F2A93B]">

              <FaFire />

            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#F2A93B]">
                Consistency
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Workout Streak
              </h2>

            </div>

          </div>

          <div className="text-right">

            <p className="text-3xl font-bold text-[#F2A93B]">
              {streak}
            </p>

            <p className="text-[10px] text-gray-300">
              days
            </p>

          </div>

        </div>

        {/* WEEK */}

        <div className="mt-7 grid grid-cols-7 gap-2">

          {week.map(
            (day, index) => (

              <div
                key={`${day.day}-${index}`}
                className="flex flex-col items-center gap-2"
              >

                <span className="text-[9px] text-gray-700">
                  {day.day}
                </span>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                    day.completed
                      ? "border-green-400/20 bg-green-400/10 text-green-400"
                      : "border-white/5 bg-white/[0.03] text-gray-700"
                  }`}
                >

                  {day.completed ? (
                    <FaCheck className="text-xs" />
                  ) : (
                    <FaLock className="text-[9px]" />
                  )}

                </div>

              </div>

            )
          )}

        </div>

        {/* PROGRESS */}

        <div className="mt-7">

          <div className="flex justify-between">

            <p className="text-xs text-gray-300">
              This week's workouts
            </p>

            <p className="text-xs font-semibold text-[#F2A93B]">
              {completedDays}/7
            </p>

          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F2A93B] to-orange-400 transition-all"
              style={{
                width: `${
                  (completedDays / 7) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

        {/* MESSAGE */}

        <div className="mt-6 rounded-2xl border border-[#F2A93B]/10 bg-[#F2A93B]/5 p-4">

          <p className="text-sm font-semibold text-[#F2A93B]">
            Start your streak 🔥
          </p>

          <p className="mt-1 text-xs leading-relaxed text-gray-300">
            Complete today's workout to
            begin building your consistency.
          </p>

        </div>

      </div>

    </div>
  );
};

export default StreakCard;