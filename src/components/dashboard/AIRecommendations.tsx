import {
  FaRobot,
  FaFire,
  FaDumbbell,
  FaTint,
  FaMoon,
  FaArrowRight,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const AIRecommendations = () => {
  const { user } = useUser();

  const recommendations = [
    {
      icon: <FaFire />,
      title: "Nutrition",
      text: `Increase your daily protein intake to support your ${user.goal || "fitness"} goal.`,
    },
    {
      icon: <FaDumbbell />,
      title: "Workout",
      text: `Train ${user.workoutDays || 4} days this week for the best progress.`,
    },
    {
      icon: <FaTint />,
      title: "Hydration",
      text: "Drink at least 4 litres of water today.",
    },
    {
      icon: <FaMoon />,
      title: "Recovery",
      text: "Aim for 8 hours of quality sleep tonight.",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black text-2xl">
          <FaRobot />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            AI Recommendations
          </h2>

          <p className="text-gray-400">
            Personalized suggestions for today
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-5">

        {recommendations.map((item) => (

          <div
            key={item.title}
            className="flex items-start justify-between rounded-2xl border border-white/10 bg-[#111] p-5 transition hover:border-yellow-400/40 hover:bg-white/5"
          >

            <div className="flex gap-4">

              <div className="mt-1 text-2xl text-yellow-400">
                {item.icon}
              </div>

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-gray-400">
                  {item.text}
                </p>

              </div>

            </div>

            <FaArrowRight className="text-gray-500" />

          </div>

        ))}

      </div>

    </div>
  );
};

export default AIRecommendations;