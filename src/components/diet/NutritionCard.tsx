import { motion } from "framer-motion";
import {
  FaFire,
  FaDrumstickBite,
  FaBreadSlice,
  FaTint,
} from "react-icons/fa";
import { GiAvocado } from "react-icons/gi";
import type { DailyNutrition } from "../../types/diet";

interface NutritionCardProps {
  nutrition: DailyNutrition;
}

const NutritionCard = ({ nutrition }: NutritionCardProps) => {
  const cards = [
    {
      title: "Calories",
      value: `${nutrition.calories} kcal`,
      icon: <FaFire />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Protein",
      value: `${nutrition.protein} g`,
      icon: <FaDrumstickBite />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Carbs",
      value: `${nutrition.carbs} g`,
      icon: <FaBreadSlice />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Fats",
      value: `${nutrition.fats} g`,
      icon: <GiAvocado />,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Water",
      value: `${nutrition.water} L`,
      icon: <FaTint />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{ y: -5 }}
          className={`rounded-2xl border border-white/10 ${card.bg} p-6 backdrop-blur-xl`}
        >
          <div
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-2xl ${card.color}`}
          >
            {card.icon}
          </div>

          <p className="text-gray-400">{card.title}</p>

          <h2 className={`mt-2 text-2xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </motion.div>
      ))}
    </div>
  );
};

export default NutritionCard;