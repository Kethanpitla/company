import {
  FaWeight,
  FaFire,
  FaDumbbell,
  FaChartLine,
} from "react-icons/fa";

interface StatCardProps {
  title: string;
  value: string;
  color?: string;
}

const StatCard = ({
  title,
  value,
}: StatCardProps) => {
  const getIcon = () => {
    const text = title.toLowerCase();

    if (text.includes("weight")) {
      return <FaWeight />;
    }

    if (
      text.includes("calorie") ||
      text.includes("kcal")
    ) {
      return <FaFire />;
    }

    if (text.includes("protein")) {
      return <FaDumbbell />;
    }

    return <FaChartLine />;
  };

  const getAccent = () => {
    const text = title.toLowerCase();

    if (text.includes("weight")) {
      return {
        icon: "text-[#5B8DEF]",
        bg: "bg-[#5B8DEF]/10",
        glow: "group-hover:shadow-[#5B8DEF]/10",
      };
    }

    if (text.includes("calorie")) {
      return {
        icon: "text-[#F2A93B]",
        bg: "bg-[#F2A93B]/10",
        glow: "group-hover:shadow-[#F2A93B]/10",
      };
    }

    if (text.includes("protein")) {
      return {
        icon: "text-green-400",
        bg: "bg-green-400/10",
        glow: "group-hover:shadow-green-400/10",
      };
    }

    return {
      icon: "text-purple-400",
      bg: "bg-purple-400/10",
      glow: "group-hover:shadow-purple-400/10",
    };
  };

  const accent = getAccent();

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${accent.glow}`}
    >

      {/* AMBIENT GLOW */}

      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${accent.bg} opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-80`}
      />

      <div className="relative">

        {/* ICON */}

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg} ${accent.icon}`}
        >
          {getIcon()}
        </div>

        {/* TITLE */}

        <p className="mt-5 text-sm text-gray-500">
          {title}
        </p>

        {/* VALUE */}

        <div className="mt-1 flex items-end justify-between gap-3">

          <h3 className="text-2xl font-bold tracking-tight text-[#F5F0E8]">
            {value}
          </h3>

          <div
            className={`mb-1 h-2 w-2 rounded-full ${accent.bg} ${accent.icon}`}
          />

        </div>

        {/* BOTTOM LINE */}

        <div className="mt-5 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        <p className="mt-3 text-xs text-gray-300">
          Updated from your profile
        </p>

      </div>

    </div>
  );
};

export default StatCard;