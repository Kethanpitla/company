import { useMemo } from "react";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const ProgressGraph = () => {
  const { user } = useUser();

  const currentWeight =
    Number(user.weight) || 70;

  const targetWeight =
    Number(user.targetWeight) || currentWeight;

  const points = useMemo(() => {
    const difference =
      targetWeight - currentWeight;

    return [
      currentWeight - difference * 0.85,
      currentWeight - difference * 0.65,
      currentWeight - difference * 0.5,
      currentWeight - difference * 0.35,
      currentWeight - difference * 0.2,
      currentWeight - difference * 0.08,
      currentWeight,
    ];
  }, [currentWeight, targetWeight]);

  const first = points[0];
  const latest = points[points.length - 1];

  const change =
    Number((latest - first).toFixed(1));

  const min = Math.min(...points) - 1;
  const max = Math.max(...points) + 1;

  const getY = (value: number) => {
    if (max === min) return 50;

    return (
      100 -
      ((value - min) /
        (max - min)) *
        100
    );
  };

  const getX = (index: number) => {
    return (index / (points.length - 1)) * 100;
  };

  const path = points
    .map(
      (point, index) =>
        `${getX(index)},${getY(point)}`
    )
    .join(" ");

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-20 -bottom-20 h-52 w-52 rounded-full bg-[#F2A93B]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2A93B]/10 text-[#F2A93B]">
              <FaChartLine />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#F2A93B]">
                Analytics
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Progress Graph
              </h2>

            </div>

          </div>

          <div
            className={`flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold ${
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

        {/* VALUE */}

        <div className="mt-6">

          <p className="text-xs text-gray-300">
            Current progress
          </p>

          <div className="mt-1 flex items-end gap-2">

            <h3 className="text-3xl font-bold">
              {currentWeight}
            </h3>

            <span className="mb-1 text-sm text-gray-300">
              kg
            </span>

          </div>

        </div>

        {/* GRAPH */}

        <div className="mt-7">

          <div className="relative h-44">

            {/* GRID */}

            <div className="absolute inset-0 flex flex-col justify-between">

              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />
              <div className="border-t border-white/5" />

            </div>

            {/* SVG */}

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >

              <defs>

                <linearGradient
                  id="progressGradient"
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
                  id="progressFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#5B8DEF"
                    stopOpacity="0.25"
                  />

                  <stop
                    offset="100%"
                    stopColor="#5B8DEF"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* AREA */}

              <polygon
                points={`0,100 ${path} 100,100`}
                fill="url(#progressFill)"
              />

              {/* LINE */}

              <polyline
                points={path}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

            {/* POINTS */}

            {points.map(
              (point, index) => (

                <div
                  key={index}
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#231C2E] bg-[#F2A93B] shadow-lg shadow-[#F2A93B]/30"
                  style={{
                    left: `${getX(index)}%`,
                    top: `${getY(point)}%`,
                  }}
                />

              )
            )}

          </div>

          {/* DAYS */}

          <div className="mt-3 flex justify-between text-[10px] text-gray-700">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Today</span>
          </div>

        </div>

        {/* TARGET */}

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-4">

          <div>

            <p className="text-[10px] uppercase tracking-wider text-gray-300">
              Target Weight
            </p>

            <p className="mt-1 text-sm font-bold">
              {targetWeight} kg
            </p>

          </div>

          <div className="text-right">

            <p className="text-[10px] uppercase tracking-wider text-gray-300">
              Remaining
            </p>

            <p className="mt-1 text-sm font-bold text-[#5B8DEF]">
              {Math.abs(
                currentWeight -
                  targetWeight
              ).toFixed(1)}{" "}
              kg
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProgressGraph;