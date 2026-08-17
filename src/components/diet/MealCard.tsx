import { motion } from "framer-motion";
import { FaClock, FaFire, FaDrumstickBite } from "react-icons/fa";
import type { Meal } from "../../types/diet";

interface MealCardProps {
  meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
  const totalCalories = meal.foods.reduce(
    (sum, food) => sum + food.calories,
    0
  );

  const totalProtein = meal.foods.reduce(
    (sum, food) => sum + food.protein,
    0
  );

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-yellow-500/20 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            {meal.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-gray-400">
            <FaClock />
            <span>{meal.time}</span>
          </div>
        </div>

        <div className="rounded-xl bg-yellow-500/20 px-4 py-2">
          <p className="font-bold text-yellow-400">
            {totalCalories} kcal
          </p>
        </div>

      </div>

      <div className="mt-6 space-y-4">

        {meal.foods.map((food) => (
          <div
            key={food.name}
            className="flex items-center justify-between rounded-xl bg-[#0F172A]/50 p-4"
          >
            <div>
              <h3 className="font-semibold text-white">
                {food.name}
              </h3>

              <p className="text-gray-500">
                {food.quantity}
              </p>
            </div>

            <div className="text-right">

              <div className="flex items-center justify-end gap-2 text-yellow-400">
                <FaFire />
                {food.calories}
              </div>

              <div className="mt-2 flex items-center justify-end gap-2 text-green-400">
                <FaDrumstickBite />
                {food.protein}g
              </div>

            </div>

          </div>
        ))}

      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">

        <div className="rounded-xl bg-[#0F172A]/50 p-3 text-center">
          <p className="text-gray-400 text-sm">
            Calories
          </p>

          <h3 className="mt-2 font-bold text-yellow-400">
            {totalCalories}
          </h3>
        </div>

        <div className="rounded-xl bg-[#0F172A]/50 p-3 text-center">
          <p className="text-gray-400 text-sm">
            Protein
          </p>

          <h3 className="mt-2 font-bold text-green-400">
            {totalProtein}g
          </h3>
        </div>

        <div className="rounded-xl bg-[#0F172A]/50 p-3 text-center">
          <p className="text-gray-400 text-sm">
            Foods
          </p>

          <h3 className="mt-2 font-bold text-blue-400">
            {meal.foods.length}
          </h3>
        </div>

        <div className="rounded-xl bg-[#0F172A]/50 p-3 text-center">
          <p className="text-gray-400 text-sm">
            Status
          </p>

          <h3 className="mt-2 font-bold text-orange-400">
            Planned
          </h3>
        </div>

      </div>

    </motion.div>
  );
};

export default MealCard;