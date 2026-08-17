import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaDumbbell,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const WorkoutCalendar = () => {
  const { user } = useUser();

  const workoutDays =
    Number(user.workoutDays) || 4;

  const [selectedDay, setSelectedDay] =
    useState(new Date().getDate());

  const today = new Date();

  const days = useMemo(() => {
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setDate(
        today.getDate() - i
      );

      result.push(date);
    }

    return result;
  }, []);

  /*
   * Demo completion data.
   * Later this can come directly
   * from your backend/workout history.
   */
  const completedDays = Math.min(
    workoutDays,
    5
  );

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#F2A93B]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2A93B]/10 text-[#F2A93B]">
              <FaCalendarAlt />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#F2A93B]">
                Consistency
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Workout Calendar
              </h2>

            </div>

          </div>

          <div className="rounded-xl bg-green-400/10 px-3 py-2">

            <p className="text-xs font-semibold text-green-400">
              {completedDays}/{workoutDays}
            </p>

          </div>

        </div>

        {/* WEEK */}

        <div className="mt-6 grid grid-cols-7 gap-2">

          {days.map((date, index) => {

            const isToday =
              date.toDateString() ===
              today.toDateString();

            const isSelected =
              selectedDay ===
              date.getDate();

            const isCompleted =
              index < completedDays;

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() =>
                  setSelectedDay(
                    date.getDate()
                  )
                }
                className={`flex flex-col items-center gap-2 rounded-2xl border p-2 transition-all duration-200 ${
                  isSelected
                    ? "border-[#F2A93B]/30 bg-[#F2A93B]/10"
                    : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >

                <span className="text-[9px] uppercase text-gray-300">
                  {date.toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                  )}
                </span>

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                    isToday
                      ? "bg-[#F2A93B] text-black"
                      : isCompleted
                        ? "bg-green-400/10 text-green-400"
                        : "bg-white/5 text-gray-500"
                  }`}
                >
                  {date.getDate()}
                </span>

                {isCompleted && (
                  <FaCheck className="text-[8px] text-green-400" />
                )}

              </button>
            );
          })}

        </div>

        {/* SELECTED DAY */}

        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
              <FaDumbbell />
            </div>

            <div className="flex-1">

              <p className="text-xs text-gray-300">
                Selected Day
              </p>

              <p className="mt-1 text-sm font-semibold">
                {new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  selectedDay
                ).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>

            </div>

            {selectedDay ===
              today.getDate() && (
              <span className="rounded-lg bg-[#F2A93B]/10 px-2 py-1 text-[9px] font-semibold text-[#F2A93B]">
                TODAY
              </span>
            )}

          </div>

        </div>

        {/* WEEKLY TARGET */}

        <div className="mt-5">

          <div className="flex justify-between">

            <p className="text-xs text-gray-300">
              Weekly target
            </p>

            <p className="text-xs font-semibold text-[#5B8DEF]">
              {completedDays}/{workoutDays}
            </p>

          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-[#F2A93B] transition-all"
              style={{
                width: `${Math.min(
                  (completedDays /
                    workoutDays) *
                    100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default WorkoutCalendar;