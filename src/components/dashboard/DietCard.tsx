import { useNavigate } from "react-router-dom";
import {
  FaAppleAlt,
  FaFire,
  FaDrumstickBite,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const DietTracker = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const weight = Number(user.weight) || 0;

  const calories =
    user.goal === "Lose Fat"
      ? Math.round(weight * 26)
      : user.goal === "Gain Muscle"
        ? Math.round(weight * 34)
        : Math.round(weight * 30);

  const protein = Math.round(weight * 2);

  const meals = [
    {
      name: "Breakfast",
      time: "8:00 AM",
      meal:
        user.dietType === "Non-Vegetarian"
          ? "Eggs + Oats + Banana"
          : "Oats + Milk + Banana",
      calories: Math.round(calories * 0.25),
    },
    {
      name: "Lunch",
      time: "1:00 PM",
      meal:
        user.dietType === "Non-Vegetarian"
          ? "Chicken + Rice + Vegetables"
          : "Paneer + Rice + Vegetables",
      calories: Math.round(calories * 0.35),
    },
    {
      name: "Snack",
      time: "5:00 PM",
      meal:
        user.dietType === "Non-Vegetarian"
          ? "Greek Yogurt + Eggs"
          : "Greek Yogurt + Nuts",
      calories: Math.round(calories * 0.15),
    },
    {
      name: "Dinner",
      time: "8:30 PM",
      meal:
        user.dietType === "Non-Vegetarian"
          ? "Chicken + Roti + Salad"
          : "Paneer + Roti + Salad",
      calories: Math.round(calories * 0.25),
    },
  ];

  const handlePlanner = () => {
    navigate("/diet-planner");
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#F2A93B]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2A93B]/10 text-[#F2A93B]">
              <FaAppleAlt />
            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-[#F2A93B]">
                Today's Diet
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Nutrition Plan
              </h2>

            </div>

          </div>

          <button
            type="button"
            onClick={handlePlanner}
            className="flex h-9 items-center gap-2 rounded-xl bg-white/5 px-3 text-xs font-semibold text-gray-400 transition hover:bg-[#F2A93B]/10 hover:text-[#F2A93B]"
          >
            Full Plan
            <FaArrowRight className="text-[10px]" />
          </button>

        </div>

        {/* DAILY TARGET */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

            <div className="flex items-center gap-2 text-gray-500">
              <FaFire className="text-xs" />
              <span className="text-xs">
                Calories
              </span>
            </div>

            <p className="mt-2 text-lg font-bold">
              {calories}
              <span className="ml-1 text-xs font-normal text-gray-300">
                kcal
              </span>
            </p>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

            <div className="flex items-center gap-2 text-gray-500">
              <FaDrumstickBite className="text-xs" />
              <span className="text-xs">
                Protein
              </span>
            </div>

            <p className="mt-2 text-lg font-bold">
              {protein}
              <span className="ml-1 text-xs font-normal text-gray-300">
                g
              </span>
            </p>

          </div>

        </div>

        {/* MEALS */}

        <div className="mt-5 space-y-2">

          {meals.map((meal) => (

            <div
              key={meal.name}
              className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3"
            >

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F2A93B]/10 text-xs text-[#F2A93B]">
                <FaAppleAlt />
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-2">

                  <p className="text-xs font-semibold">
                    {meal.name}
                  </p>

                  <p className="text-[10px] text-gray-300">
                    {meal.time}
                  </p>

                </div>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {meal.meal}
                </p>

              </div>

              <p className="hidden text-[10px] text-gray-300 sm:block">
                {meal.calories} kcal
              </p>

            </div>

          ))}

        </div>

        {/* STATUS */}

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-green-400/10 bg-green-400/5 px-4 py-3">

          <FaCheckCircle className="text-sm text-green-400" />

          <p className="text-xs text-gray-500">
            Stay within your daily calorie and
            protein targets.
          </p>

        </div>

      </div>

    </div>
  );
};

export default DietTracker;