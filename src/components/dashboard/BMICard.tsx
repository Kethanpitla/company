import { FaHeartbeat, FaInfoCircle } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const BMICard = () => {
  const { user } = useUser();

  const weight = Number(user.weight) || 0;
  const height = Number(user.height) || 0;

  const bmi =
    Number(user.bmi) ||
    (height > 0
      ? Number(
          (
            weight /
            Math.pow(height / 100, 2)
          ).toFixed(1)
        )
      : 0);

  const getStatus = () => {
    if (!bmi) {
      return {
        label: "Not available",
        color: "text-gray-400",
        bg: "bg-white/5",
      };
    }

    if (bmi < 18.5) {
      return {
        label: "Underweight",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
      };
    }

    if (bmi < 25) {
      return {
        label: "Healthy",
        color: "text-green-400",
        bg: "bg-green-400/10",
      };
    }

    if (bmi < 30) {
      return {
        label: "Overweight",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
      };
    }

    return {
      label: "Obesity range",
      color: "text-red-400",
      bg: "bg-red-400/10",
    };
  };

  const status = getStatus();

  const percentage = Math.min(
    Math.max((bmi / 40) * 100, 0),
    100
  );

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
              <FaHeartbeat />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-green-400">
                Body Health
              </p>

              <h2 className="mt-1 text-lg font-bold">
                BMI
              </h2>

            </div>

          </div>

          <FaInfoCircle className="text-sm text-gray-300" />

        </div>

        {/* BMI */}

        <div className="mt-7 flex items-end justify-between">

          <div>

            <p className="text-5xl font-bold">
              {bmi || "--"}
            </p>

            <p className="mt-2 text-xs text-gray-300">
              Body Mass Index
            </p>

          </div>

          <div
            className={`rounded-xl px-3 py-2 ${status.bg}`}
          >
            <p
              className={`text-xs font-semibold ${status.color}`}
            >
              {status.label}
            </p>
          </div>

        </div>

        {/* SCALE */}

        <div className="mt-7">

          <div className="relative h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

          <div className="mt-2 flex justify-between text-[10px] text-gray-300">
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40+</span>
          </div>

        </div>

        {/* INFO */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-3">

            <p className="text-[10px] text-gray-300">
              Weight
            </p>

            <p className="mt-1 text-sm font-bold">
              {weight} kg
            </p>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-3">

            <p className="text-[10px] text-gray-300">
              Height
            </p>

            <p className="mt-1 text-sm font-bold">
              {height} cm
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BMICard;