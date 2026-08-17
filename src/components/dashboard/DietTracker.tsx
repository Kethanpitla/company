import { useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaCircle,
  FaFire,
  FaUtensils,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

type Meal = {
  id: number;
  name: string;
  calories: number;
  protein: number;
};

const DietTracker = () => {
  const { user, updateUser } = useUser();

  const meals: Meal[] = useMemo(() => {
    const vegetarian =
      user.diet?.toLowerCase().includes("veget");

    if (vegetarian) {
      return [
        {
          id: 1,
          name: "Breakfast",
          calories: 450,
          protein: 25,
        },
        {
          id: 2,
          name: "Lunch",
          calories: 650,
          protein: 35,
        },
        {
          id: 3,
          name: "Snack",
          calories: 300,
          protein: 15,
        },
        {
          id: 4,
          name: "Dinner",
          calories: 550,
          protein: 30,
        },
      ];
    }

    return [
      {
        id: 1,
        name: "Breakfast",
        calories: 500,
        protein: 30,
      },
      {
        id: 2,
        name: "Lunch",
        calories: 700,
        protein: 45,
      },
      {
        id: 3,
        name: "Snack",
        calories: 300,
        protein: 20,
      },
      {
        id: 4,
        name: "Dinner",
        calories: 600,
        protein: 40,
      },
    ];
  }, [user.diet]);

  const [completedMeals, setCompletedMeals] =
    useState<number[]>([]);

  const toggleMeal = (id: number) => {
    const updated = completedMeals.includes(id)
      ? completedMeals.filter(
          (mealId) => mealId !== id
        )
      : [...completedMeals, id];

    setCompletedMeals(updated);

    updateUser({
      currentCalories: meals
        .filter((meal) =>
          updated.includes(meal.id)
        )
        .reduce(
          (total, meal) =>
            total + meal.calories,
          0
        ),

      currentProtein: meals
        .filter((meal) =>
          updated.includes(meal.id)
        )
        .reduce(
          (total, meal) =>
            total + meal.protein,
          0
        ),
    });
  };

  const caloriesConsumed = meals
    .filter((meal) =>
      completedMeals.includes(meal.id)
    )
    .reduce(
      (total, meal) => total + meal.calories,
      0
    );

  const proteinConsumed = meals
    .filter((meal) =>
      completedMeals.includes(meal.id)
    )
    .reduce(
      (total, meal) => total + meal.protein,
      0
    );

  const calorieTarget =
    user.goal === "Lose Fat"
      ? 1800
      : user.goal === "Gain Muscle"
        ? 2500
        : 2200;

  const proteinTarget =
    Number(user.weight || 0) > 0
      ? Math.round(Number(user.weight) * 2)
      : 120;

  const calorieProgress = Math.min(
    100,
    Math.round(
      (caloriesConsumed / calorieTarget) *
        100
    )
  );

  const proteinProgress = Math.min(
    100,
    Math.round(
      (proteinConsumed / proteinTarget) *
        100
    )
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Today's Diet
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your meals
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
          <FaUtensils className="text-xl text-orange-400" />
        </div>

      </div>

      {/* Calories */}

      <div className="mt-7 rounded-2xl bg-[#0F172A]/50 p-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FaFire className="text-orange-400" />

            <div>

              <p className="text-sm text-gray-500">
                Calories
              </p>

              <p className="font-bold text-white">
                {caloriesConsumed} /{" "}
                {calorieTarget} kcal
              </p>

            </div>

          </div>

          <span className="font-bold text-orange-400">
            {calorieProgress}%
          </span>

        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-orange-400 transition-all duration-500"
            style={{
              width: `${calorieProgress}%`,
            }}
          />

        </div>

      </div>

      {/* Protein */}

      <div className="mt-4 rounded-2xl bg-[#0F172A]/50 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Protein
            </p>

            <p className="font-bold text-white">
              {proteinConsumed} /{" "}
              {proteinTarget} g
            </p>

          </div>

          <span className="font-bold text-green-400">
            {proteinProgress}%
          </span>

        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-green-400 transition-all duration-500"
            style={{
              width: `${proteinProgress}%`,
            }}
          />

        </div>

      </div>

      {/* Meals */}

      <div className="mt-7 space-y-3">

        {meals.map((meal) => {

          const completed =
            completedMeals.includes(meal.id);

          return (
            <button
              key={meal.id}
              type="button"
              onClick={() =>
                toggleMeal(meal.id)
              }
              className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                completed
                  ? "border-green-500/20 bg-green-500/10"
                  : "border-white/5 bg-[#0F172A]/20 hover:border-orange-400/30"
              }`}
            >

              <div className="flex items-center gap-4">

                {completed ? (
                  <FaCheckCircle className="text-xl text-green-400" />
                ) : (
                  <FaCircle className="text-sm text-gray-300" />
                )}

                <div>

                  <p
                    className={`font-semibold ${
                      completed
                        ? "text-green-400 line-through"
                        : "text-white"
                    }`}
                  >
                    {meal.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {meal.calories} kcal •{" "}
                    {meal.protein}g protein
                  </p>

                </div>

              </div>

              <span className="text-xs text-gray-500">
                {completed
                  ? "Done"
                  : "Mark"}
              </span>

            </button>
          );
        })}

      </div>

      {/* Complete */}

      {completedMeals.length === meals.length && (

        <div className="mt-6 rounded-2xl bg-green-500/10 p-4 text-center">

          <p className="font-bold text-green-400">
            🎉 All meals completed!
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Great job staying on track today.
          </p>

        </div>

      )}

    </div>
  );
};

export default DietTracker;