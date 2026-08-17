import { FaFire, FaDrumstickBite, FaBreadSlice, FaTint } from "react-icons/fa";
import { GiAvocado } from "react-icons/gi";

interface DailySummaryProps {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
}

const DailySummary = ({
  calories,
  protein,
  carbs,
  fats,
  water,
}: DailySummaryProps) => {
  const calorieGoal = 2800;
  const proteinGoal = 180;
  const carbsGoal = 300;
  const fatsGoal = 70;
  const waterGoal = 4;

  const score = Math.round(
    ((calories / calorieGoal +
      protein / proteinGoal +
      carbs / carbsGoal +
      fats / fatsGoal +
      water / waterGoal) /
      5) *
      100
  );

  return (
    <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-8 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Daily Summary
          </h2>

          <p className="mt-2 text-gray-400">
            Nutrition overview for today
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-500/10 px-6 py-4">
          <h2 className="text-4xl font-bold text-yellow-400">
            {Math.min(score, 100)}%
          </h2>

          <p className="text-center text-gray-400">
            Score
          </p>
        </div>

      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        <SummaryCard
          icon={<FaFire />}
          title="Calories"
          remaining={Math.max(calorieGoal - calories, 0)}
          color="text-yellow-400"
        />

        <SummaryCard
          icon={<FaDrumstickBite />}
          title="Protein"
          remaining={Math.max(proteinGoal - protein, 0)}
          color="text-green-400"
        />

        <SummaryCard
          icon={<FaBreadSlice />}
          title="Carbs"
          remaining={Math.max(carbsGoal - carbs, 0)}
          color="text-blue-400"
        />

        <SummaryCard
          icon={<GiAvocado />}
          title="Fats"
          remaining={Math.max(fatsGoal - fats, 0)}
          color="text-orange-400"
        />

        <SummaryCard
          icon={<FaTint />}
          title="Water"
          remaining={Math.max(waterGoal - water, 0)}
          color="text-cyan-400"
        />

      </div>

      <div className="mt-10 rounded-2xl bg-[#0F172A]/50 p-6">

        <h3 className="text-xl font-bold text-yellow-400">
          🤖 AI Health Tips
        </h3>

        <ul className="mt-4 space-y-3 text-gray-300">

          <li>• Drink water before every meal.</li>

          <li>• Complete your protein intake today.</li>

          <li>• Sleep at least 7–8 hours for recovery.</li>

          <li>• Eat vegetables in at least two meals.</li>

          <li>• Walk for 10 minutes after lunch.</li>

        </ul>

      </div>

    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  remaining: number;
  color: string;
}

const SummaryCard = ({
  icon,
  title,
  remaining,
  color,
}: SummaryCardProps) => {
  return (
    <div className="rounded-2xl bg-[#0F172A]/50 p-5 text-center">

      <div className={`mx-auto mb-3 text-3xl ${color}`}>
        {icon}
      </div>

      <h3 className="text-gray-400">
        {title}
      </h3>

      <p className={`mt-2 text-3xl font-bold ${color}`}>
        {remaining}
      </p>

      <span className="text-sm text-gray-500">
        Remaining
      </span>

    </div>
  );
};

export default DailySummary;