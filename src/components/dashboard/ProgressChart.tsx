import { useMemo, useState } from "react";
import {
  FaChartArea,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

type Period = "7D" | "30D" | "90D";

const ProgressChart = () => {
  const { user } = useUser();

  const currentWeight =
    Number(user.weight) || 70;

  const targetWeight =
    Number(user.targetWeight) ||
    currentWeight;

  const [period, setPeriod] =
    useState<Period>("7D");

  const data = useMemo(() => {
    if (period === "7D") {
      return [
        currentWeight + 1.2,
        currentWeight + 0.9,
        currentWeight + 0.7,
        currentWeight + 0.5,
        currentWeight + 0.4,
        currentWeight + 0.2,
        currentWeight,
      ];
    }

    if (period === "30D") {
      return [
        currentWeight + 2.4,
        currentWeight + 2.0,
        currentWeight + 1.8,
        currentWeight + 1.4,
        currentWeight + 1.1,
        currentWeight + 0.7,
        currentWeight + 0.4,
        currentWeight,
      ];
    }

    return [
      currentWeight + 5.2,
      currentWeight + 4.6,
      currentWeight + 4.0,
      currentWeight + 3.4,
      currentWeight + 2.9,
      currentWeight + 2.3,
      currentWeight + 1.7,
      currentWeight + 1.1,
      currentWeight + 0.5,
      currentWeight,
    ];
  }, [period, currentWeight]);

  const labels =
    period === "7D"
      ? [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Today",
        ]
      : period === "30D"
        ? [
            "Week 1",
            "",
            "Week 2",
            "",
            "Week 3",
            "",
            "Week 4",
            "Today",
          ]
        : [
            "Month 1",
            "",
            "Month 2",
            "",
            "Month 3",
            "",
            "",
            "",
            "",
            "Today",
          ];

  const first = data[0];
  const last = data[data.length - 1];

  const change =
    Number((last - first).toFixed(1));

  const min =
    Math.min(...data, targetWeight) - 1;

  const max =
    Math.max(...data, targetWeight) + 1;

  const getX = (index: number) =>
    (index / (data.length - 1)) * 100;

  const getY = (value: number) => {
    if (max === min) return 50;

    return (
      100 -
      ((value - min) /
        (max - min)) *
        100
    );
  };

  const points = data
    .map(
      (value, index) =>
        `${getX(index)},${getY(value)}`
    )
    .join(" ");

  const targetY = getY(targetWeight);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
              <FaChartArea />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
                Performance
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Weight Progress
              </h2>

            </div>

          </div>

          {/* PERIOD */}

          <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">

            {(["7D", "30D", "90D"] as Period[]).map(
              (item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setPeriod(item)
                  }
                  className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition ${
                    period === item
                      ? "bg-[#5B8DEF]/20 text-[#5B8DEF]"
                      : "text-gray-300 hover:text-gray-300"
                  }`}
                >
                  {item}
                </button>

              )
            )}

          </div>

        </div>

        {/* SUMMARY */}

        <div className="mt-6 flex items-end justify-between">

          <div>

            <p className="text-xs text-gray-300">
              Current weight
            </p>

            <div className="mt-1 flex items-end gap-2">

              <h3 className="text-3xl font-bold">
                {currentWeight}
              </h3>

              <span className="mb-1 text-xs text-gray-300">
                kg
              </span>

            </div>

          </div>

          <div
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
              change <= 0
                ? "bg-green-400/10 text-green-400"
                : "bg-[#F2A93B]/10 text-[#F2A93B]"
            }`}
          >
            {change <= 0 ? (
              <FaArrowDown />
            ) : (
              <FaArrowUp />
            )}

            {Math.abs(change)} kg
          </div>

        </div>

        {/* CHART */}

        <div className="mt-8">

          <div className="relative h-64">

            {/* GRID */}

            <div className="absolute inset-0 flex flex-col justify-between">

              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />

            </div>

            {/* TARGET LINE */}

            <div
              className="absolute left-0 right-0 border-t border-dashed border-[#F2A93B]/30"
              style={{
                top: `${targetY}%`,
              }}
            >

              <span className="absolute -top-5 right-0 rounded-md bg-[#F2A93B]/10 px-2 py-1 text-[9px] text-[#F2A93B]">
                Target {targetWeight} kg
              </span>

            </div>

            {/* SVG */}

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >

              <defs>

                <linearGradient
                  id="chartLine"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="#5B8DEF"
                  />

                  <stop
                    offset="100%"
                    stopColor="#F2A93B"
                  />
                </linearGradient>

                <linearGradient
                  id="chartArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#5B8DEF"
                    stopOpacity="0.18"
                  />

                  <stop
                    offset="100%"
                    stopColor="#5B8DEF"
                    stopOpacity="0"
                  />
                </linearGradient>

              </defs>

              <polygon
                points={`0,100 ${points} 100,100`}
                fill="url(#chartArea)"
              />

              <polyline
                points={points}
                fill="none"
                stroke="url(#chartLine)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

            {/* POINTS */}

            {data.map(
              (value, index) => (

                <div
                  key={index}
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#231C2E] bg-[#5B8DEF] shadow-lg shadow-[#5B8DEF]/30"
                  style={{
                    left: `${getX(index)}%`,
                    top: `${getY(value)}%`,
                  }}
                />

              )
            )}

          </div>

          {/* LABELS */}

          <div className="mt-3 flex justify-between text-[10px] text-gray-700">

            {labels.map(
              (label, index) => (
                <span key={index}>
                  {label}
                </span>
              )
            )}

          </div>

        </div>

        {/* FOOTER */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">

            <p className="text-[10px] uppercase tracking-wider text-gray-300">
              Goal
            </p>

            <p className="mt-1 text-sm font-bold">
              {user.goal || "Fitness"}
            </p>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">

            <p className="text-[10px] uppercase tracking-wider text-gray-300">
              Target
            </p>

            <p className="mt-1 text-sm font-bold text-[#F2A93B]">
              {targetWeight} kg
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProgressChart;