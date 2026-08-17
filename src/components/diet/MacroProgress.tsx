import { motion } from "framer-motion";

interface MacroProgressProps {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
}

const MacroProgress = ({
  calories,
  protein,
  carbs,
  fats,
  water,
}: MacroProgressProps) => {
  const macros = [
    {
      name: "Calories",
      value: calories,
      goal: 3000,
      color: "from-yellow-400 to-orange-500",
      unit: "kcal",
    },
    {
      name: "Protein",
      value: protein,
      goal: 200,
      color: "from-green-400 to-emerald-600",
      unit: "g",
    },
    {
      name: "Carbs",
      value: carbs,
      goal: 350,
      color: "from-blue-400 to-cyan-500",
      unit: "g",
    },
    {
      name: "Fats",
      value: fats,
      goal: 80,
      color: "from-red-400 to-pink-500",
      unit: "g",
    },
    {
      name: "Water",
      value: water,
      goal: 5,
      color: "from-cyan-400 to-blue-500",
      unit: "L",
    },
  ];

  return (
    <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="text-3xl font-bold text-white">
        Daily Macro Progress
      </h2>

      <p className="mt-2 text-gray-400">
        Recommended nutrition goals
      </p>

      <div className="mt-8 space-y-8">

        {macros.map((macro) => {
          const percentage = Math.min(
            (macro.value / macro.goal) * 100,
            100
          );

          return (
            <div key={macro.name}>

              <div className="mb-3 flex items-center justify-between">

                <span className="text-lg font-semibold text-white">
                  {macro.name}
                </span>

                <span className="text-gray-300">
                  {macro.value}
                  {macro.unit}
                  {" / "}
                  {macro.goal}
                  {macro.unit}
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-[#0F172A]/40">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${macro.color}`}
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default MacroProgress;