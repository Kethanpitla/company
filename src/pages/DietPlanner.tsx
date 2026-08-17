import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAppleAlt,
  FaFire,
  FaClock,
  FaDumbbell,
  FaRupeeSign,
  FaChevronDown,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

type Meal = {
  time: string;
  type: string;
  name: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  cost: number;
};

type DayPlan = {
  day: number;
  name: string;
  workout: boolean;
  meals: Meal[];
};

const DietPlanner = () => {
  const { user } = useUser();

  const [selectedDay, setSelectedDay] = useState(1);
  const [openMeal, setOpenMeal] = useState<string | null>(null);

  const weight = Number(user.weight) || 70;
  const targetWeight = Number(user.targetWeight) || weight;

  /*
   * Calorie target
   */

  const calorieTarget = useMemo(() => {
    if (user.goal === "Lose Fat") {
      return Math.round(weight * 26);
    }

    if (user.goal === "Gain Muscle") {
      return Math.round(weight * 34);
    }

    if (user.goal === "Strength") {
      return Math.round(weight * 36);
    }

    return Math.round(weight * 30);
  }, [weight, user.goal]);

  /*
   * Protein target
   */

  const proteinTarget = useMemo(() => {
    if (user.goal === "Lose Fat") {
      return Math.round(weight * 1.8);
    }

    if (user.goal === "Gain Muscle") {
      return Math.round(weight * 2.0);
    }

    if (user.goal === "Strength") {
      return Math.round(weight * 2.0);
    }

    return Math.round(weight * 1.6);
  }, [weight, user.goal]);

  /*
   * Weekly budget
   */

  const weeklyBudget = Number(user.weeklyBudget) || 2500;

  const dailyBudget = Math.round(
    weeklyBudget / 7
  );

  /*
   * Diet type
   */

  const isVeg =
    user.dietType?.toLowerCase().includes("veg") &&
    !user.dietType
      ?.toLowerCase()
      .includes("non");

  /*
   * Workout days
   */

  const workoutDays = Number(user.workoutDays) || 4;

  /*
   * Foods based on budget
   */

  const cheapVegProtein = [
    "Soy chunks",
    "Dal",
    "Chana",
    "Rajma",
    "Peanuts",
    "Curd",
  ];

  const mediumVegProtein = [
    "Paneer",
    "Soy chunks",
    "Dal",
    "Curd",
    "Milk",
    "Chana",
  ];

  const premiumVegProtein = [
    "Paneer",
    "Tofu",
    "Greek yogurt",
    "Milk",
    "Dal",
    "Chana",
  ];

  const cheapNonVegProtein = [
    "Eggs",
    "Soy chunks",
    "Dal",
    "Chicken",
  ];

  const mediumNonVegProtein = [
    "Eggs",
    "Chicken",
    "Dal",
    "Curd",
  ];

  const premiumNonVegProtein = [
    "Eggs",
    "Chicken",
    "Fish",
    "Greek yogurt",
  ];

  const proteinFoods = isVeg
    ? weeklyBudget < 1800
      ? cheapVegProtein
      : weeklyBudget < 3000
        ? mediumVegProtein
        : premiumVegProtein
    : weeklyBudget < 1800
      ? cheapNonVegProtein
      : weeklyBudget < 3000
        ? mediumNonVegProtein
        : premiumNonVegProtein;

  /*
   * Generate 7 different days
   */

  const days: DayPlan[] = useMemo(() => {
    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const breakfastFoods = isVeg
      ? [
          [
            "Oats",
            "Milk",
            "Banana",
            proteinFoods[0],
          ],
          [
            "Paneer sandwich",
            "Whole wheat bread",
            "Apple",
          ],
          [
            "Vegetable poha",
            "Curd",
            "Banana",
          ],
          [
            "Oats",
            "Milk",
            "Peanuts",
            "Banana",
          ],
          [
            "Paneer paratha",
            "Curd",
            "Fruit",
          ],
          [
            "Upma",
            "Milk",
            "Banana",
          ],
          [
            "Oats",
            "Curd",
            "Peanuts",
            "Fruit",
          ],
        ]
      : [
          [
            "3 Eggs",
            "Oats",
            "Banana",
            "Milk",
          ],
          [
            "Egg omelette",
            "Whole wheat bread",
            "Fruit",
          ],
          [
            "Egg bhurji",
            "Roti",
            "Curd",
          ],
          [
            "Oats",
            "Milk",
            "2 Eggs",
            "Banana",
          ],
          [
            "Egg sandwich",
            "Fruit",
            "Milk",
          ],
          [
            "3 Eggs",
            "Poha",
            "Banana",
          ],
          [
            "Omelette",
            "Oats",
            "Milk",
          ],
        ];

    const lunchFoods = isVeg
      ? [
          [
            "Rice",
            "Dal",
            "Paneer",
            "Mixed vegetables",
          ],
          [
            "Roti",
            "Rajma",
            "Curd",
            "Salad",
          ],
          [
            "Rice",
            "Chole",
            "Paneer",
            "Vegetables",
          ],
          [
            "Roti",
            "Dal",
            "Soy chunks",
            "Salad",
          ],
          [
            "Rice",
            "Rajma",
            "Curd",
            "Vegetables",
          ],
          [
            "Roti",
            "Paneer",
            "Dal",
            "Salad",
          ],
          [
            "Rice",
            "Chole",
            "Curd",
            "Vegetables",
          ],
        ]
      : [
          [
            "Rice",
            "Chicken",
            "Dal",
            "Vegetables",
          ],
          [
            "Roti",
            "Chicken curry",
            "Curd",
            "Salad",
          ],
          [
            "Rice",
            "Egg curry",
            "Dal",
            "Vegetables",
          ],
          [
            "Roti",
            "Chicken",
            "Dal",
            "Salad",
          ],
          [
            "Rice",
            "Chicken",
            "Curd",
            "Vegetables",
          ],
          [
            "Roti",
            "Egg curry",
            "Dal",
            "Salad",
          ],
          [
            "Rice",
            "Chicken",
            "Vegetables",
            "Curd",
          ],
        ];

    const dinnerFoods = isVeg
      ? [
          [
            "Roti",
            "Paneer",
            "Vegetable curry",
            "Curd",
          ],
          [
            "Rice",
            "Dal",
            "Soy chunks",
            "Vegetables",
          ],
          [
            "Roti",
            "Paneer bhurji",
            "Salad",
          ],
          [
            "Khichdi",
            "Curd",
            "Vegetables",
          ],
          [
            "Roti",
            "Dal",
            "Paneer",
            "Salad",
          ],
          [
            "Rice",
            "Chole",
            "Curd",
            "Vegetables",
          ],
          [
            "Roti",
            "Soy chunks",
            "Vegetable curry",
            "Curd",
          ],
        ]
      : [
          [
            "Roti",
            "Chicken",
            "Vegetable curry",
            "Curd",
          ],
          [
            "Rice",
            "Chicken",
            "Salad",
            "Curd",
          ],
          [
            "Roti",
            "Egg curry",
            "Vegetables",
            "Curd",
          ],
          [
            "Rice",
            "Chicken",
            "Dal",
            "Vegetables",
          ],
          [
            "Roti",
            "Chicken",
            "Salad",
            "Curd",
          ],
          [
            "Rice",
            "Egg curry",
            "Vegetables",
            "Curd",
          ],
          [
            "Roti",
            "Chicken",
            "Vegetable curry",
            "Curd",
          ],
        ];

    return dayNames.map((dayName, index) => {
      const workout =
        index < workoutDays;

      const breakfastCalories = workout
        ? 500
        : 450;

      const lunchCalories = workout
        ? 650
        : 600;

      const snackCalories = workout
        ? 250
        : 200;

      const dinnerCalories = workout
        ? 550
        : 500;

      const breakfast: Meal = {
        time: "07:30 AM",
        type: "Breakfast",
        name: breakfastFoods[index].join(" + "),
        foods: breakfastFoods[index],
        calories: breakfastCalories,
        protein: isVeg ? 25 : 30,
        carbs: 60,
        fats: 15,
        cost: isVeg ? 45 : 55,
      };

      const snack: Meal = {
        time: workout ? "05:00 PM" : "04:30 PM",
        type: workout
          ? "Pre-Workout"
          : "Evening Snack",
        name: workout
          ? "Banana + Peanuts"
          : "Fruit + Peanuts",
        foods: workout
          ? ["Banana", "Peanuts"]
          : ["Seasonal fruit", "Peanuts"],
        calories: snackCalories,
        protein: 8,
        carbs: 35,
        fats: 8,
        cost: 20,
      };

      const lunch: Meal = {
        time: "01:30 PM",
        type: "Lunch",
        name: lunchFoods[index].join(" + "),
        foods: lunchFoods[index],
        calories: lunchCalories,
        protein: isVeg ? 32 : 42,
        carbs: 75,
        fats: 15,
        cost: isVeg ? 70 : 90,
      };

      const dinner: Meal = {
        time: workout ? "08:30 PM" : "08:00 PM",
        type: "Dinner",
        name: dinnerFoods[index].join(" + "),
        foods: dinnerFoods[index],
        calories: dinnerCalories,
        protein: isVeg ? 30 : 38,
        carbs: 55,
        fats: 15,
        cost: isVeg ? 65 : 80,
      };

      return {
        day: index + 1,
        name: dayName,
        workout,
        meals: [
          breakfast,
          snack,
          lunch,
          dinner,
        ],
      };
    });
  }, [
    isVeg,
    proteinFoods,
    workoutDays,
  ]);

  const currentDay =
    days[selectedDay - 1];

  const totalCalories =
    currentDay.meals.reduce(
      (sum, meal) =>
        sum + meal.calories,
      0
    );

  const totalProtein =
    currentDay.meals.reduce(
      (sum, meal) =>
        sum + meal.protein,
      0
    );

  const totalCarbs =
    currentDay.meals.reduce(
      (sum, meal) =>
        sum + meal.carbs,
      0
    );

  const totalFats =
    currentDay.meals.reduce(
      (sum, meal) =>
        sum + meal.fats,
      0
    );

  const totalCost =
    currentDay.meals.reduce(
      (sum, meal) =>
        sum + meal.cost,
      0
    );

  const weeklyCost = days.reduce(
    (total, day) =>
      total +
      day.meals.reduce(
        (sum, meal) =>
          sum + meal.cost,
        0
      ),
    0
  );

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-6 text-white sm:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10">

              <FaAppleAlt className="text-2xl text-green-400" />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Your 7-Day Diet Plan
              </h1>

              <p className="mt-1 text-gray-500">
                Personalized according to your body,
                goal, workout and budget.
              </p>

            </div>

          </div>

        </div>

        {/* PROFILE */}

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-gray-500">
              Weight
            </p>
            <p className="mt-2 text-xl font-bold">
              {weight} kg
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-gray-500">
              Target
            </p>
            <p className="mt-2 text-xl font-bold">
              {targetWeight} kg
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-gray-500">
              Goal
            </p>
            <p className="mt-2 text-sm font-bold text-yellow-400">
              {user.goal || "Fitness"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-gray-500">
              Weekly Budget
            </p>
            <p className="mt-2 text-xl font-bold text-green-400">
              ₹{weeklyBudget}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-gray-500">
              Diet
            </p>
            <p className="mt-2 text-sm font-bold">
              {user.dietType || "Not selected"}
            </p>
          </div>

        </div>

        {/* TARGETS */}

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-orange-400/10 p-6">

            <FaFire className="text-xl text-orange-400" />

            <p className="mt-4 text-sm text-gray-500">
              Daily Calorie Target
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-400">
              {calorieTarget}
              <span className="text-sm text-gray-500">
                {" "}kcal
              </span>
            </p>

          </div>

          <div className="rounded-2xl bg-green-400/10 p-6">

            <FaDumbbell className="text-xl text-green-400" />

            <p className="mt-4 text-sm text-gray-500">
              Daily Protein Target
            </p>

            <p className="mt-1 text-3xl font-bold text-green-400">
              {proteinTarget}
              <span className="text-sm text-gray-500">
                {" "}g
              </span>
            </p>

          </div>

          <div className="rounded-2xl bg-yellow-400/10 p-6">

            <FaRupeeSign className="text-xl text-yellow-400" />

            <p className="mt-4 text-sm text-gray-500">
              Daily Food Budget
            </p>

            <p className="mt-1 text-3xl font-bold text-yellow-400">
              ₹{dailyBudget}
            </p>

          </div>

        </div>

        {/* DAYS */}

        <div className="mt-8 overflow-x-auto">

          <div className="flex min-w-max gap-3">

            {days.map((day) => (

              <button
                type="button"
                key={day.day}
                onClick={() =>
                  setSelectedDay(day.day)
                }
                className={`rounded-xl px-6 py-4 transition ${
                  selectedDay === day.day
                    ? "bg-green-400 font-bold text-black"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >

                <p className="text-xs">
                  DAY
                </p>

                <p className="text-lg">
                  {day.day}
                </p>

                <p className="text-xs">
                  {day.name}
                </p>

              </button>

            ))}

          </div>

        </div>

        {/* DAY HEADER */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <p className="text-sm text-green-400">
                DAY {currentDay.day}
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {currentDay.name}
              </h2>

              <p className="mt-2 text-gray-500">
                {currentDay.workout
                  ? "🏋️ Workout Day"
                  : "🛌 Recovery Day"}
              </p>

            </div>

            <div className="text-left md:text-right">

              <p className="text-sm text-gray-500">
                Estimated Daily Cost
              </p>

              <p className="mt-1 text-2xl font-bold text-yellow-400">
                ₹{totalCost}
              </p>

            </div>

          </div>

        </div>

        {/* MEALS */}

        <div className="mt-6 space-y-5">

          {currentDay.meals.map(
            (meal, index) => {

              const mealId =
                `${currentDay.day}-${index}`;

              const isOpen =
                openMeal === mealId;

              return (
                <div
                  key={mealId}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMeal(
                        isOpen
                          ? null
                          : mealId
                      )
                    }
                    className="w-full p-6 text-left"
                  >

                    <div className="flex flex-col gap-5 md:flex-row md:items-center">

                      {/* TIME */}

                      <div className="flex items-center gap-3 md:w-32">

                        <FaClock className="text-green-400" />

                        <span className="font-bold">
                          {meal.time}
                        </span>

                      </div>

                      {/* MEAL */}

                      <div className="flex-1">

                        <p className="text-sm font-semibold text-green-400">
                          {meal.type}
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          {meal.name}
                        </h3>

                      </div>

                      {/* STATS */}

                      <div className="flex items-center gap-5">

                        <div>
                          <p className="text-xs text-gray-300">
                            Calories
                          </p>
                          <p className="font-bold">
                            {meal.calories}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-300">
                            Protein
                          </p>
                          <p className="font-bold text-green-400">
                            {meal.protein}g
                          </p>
                        </div>

                        <FaChevronDown
                          className={`transition ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }`}
                        />

                      </div>

                    </div>

                  </button>

                  {isOpen && (

                    <div className="border-t border-white/10 p-6">

                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                        {/* FOOD */}

                        <div>

                          <h4 className="font-bold">
                            What to eat
                          </h4>

                          <div className="mt-4 space-y-2">

                            {meal.foods.map(
                              (food) => (

                                <div
                                  key={food}
                                  className="rounded-xl bg-[#0F172A]/20 p-3 text-gray-300"
                                >
                                  ✓ {food}
                                </div>

                              )
                            )}

                          </div>

                        </div>

                        {/* NUTRITION */}

                        <div>

                          <h4 className="font-bold">
                            Nutrition
                          </h4>

                          <div className="mt-4 grid grid-cols-2 gap-3">

                            <div className="rounded-xl bg-orange-400/10 p-4">
                              <p className="text-xs text-gray-500">
                                Calories
                              </p>
                              <p className="mt-1 font-bold text-orange-400">
                                {meal.calories} kcal
                              </p>
                            </div>

                            <div className="rounded-xl bg-green-400/10 p-4">
                              <p className="text-xs text-gray-500">
                                Protein
                              </p>
                              <p className="mt-1 font-bold text-green-400">
                                {meal.protein} g
                              </p>
                            </div>

                            <div className="rounded-xl bg-blue-400/10 p-4">
                              <p className="text-xs text-gray-500">
                                Carbs
                              </p>
                              <p className="mt-1 font-bold text-blue-400">
                                {meal.carbs} g
                              </p>
                            </div>

                            <div className="rounded-xl bg-purple-400/10 p-4">
                              <p className="text-xs text-gray-500">
                                Fats
                              </p>
                              <p className="mt-1 font-bold text-purple-400">
                                {meal.fats} g
                              </p>
                            </div>

                          </div>

                          <div className="mt-3 flex items-center gap-2 rounded-xl bg-yellow-400/10 p-4">

                            <FaRupeeSign className="text-yellow-400" />

                            <span>
                              Estimated cost:
                            </span>

                            <strong className="text-yellow-400">
                              ₹{meal.cost}
                            </strong>

                          </div>

                        </div>

                      </div>

                    </div>

                  )}

                </div>
              );
            }
          )}

        </div>

        {/* DAY SUMMARY */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-2xl font-bold">
            Day {currentDay.day} Summary
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

            <div>
              <p className="text-sm text-gray-500">
                Calories
              </p>
              <p className="mt-1 text-xl font-bold">
                {totalCalories} kcal
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Protein
              </p>
              <p className="mt-1 text-xl font-bold text-green-400">
                {totalProtein} g
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Carbs
              </p>
              <p className="mt-1 text-xl font-bold text-blue-400">
                {totalCarbs} g
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Fats
              </p>
              <p className="mt-1 text-xl font-bold text-purple-400">
                {totalFats} g
              </p>
            </div>

          </div>

          <div className="mt-6">

            <div className="flex justify-between text-sm">

              <span className="text-gray-500">
                Daily budget
              </span>

              <span className="text-yellow-400">
                ₹{totalCost} / ₹{dailyBudget}
              </span>

            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-yellow-400"
                style={{
                  width: `${Math.min(
                    100,
                    (totalCost /
                      dailyBudget) *
                      100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* WEEK SUMMARY */}

        <div className="mt-8 rounded-3xl border border-green-400/20 bg-green-400/5 p-6">

          <h2 className="text-2xl font-bold">
            7-Day Budget Summary
          </h2>

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <p className="text-sm text-gray-500">
                Estimated weekly food cost
              </p>

              <p className="mt-1 text-3xl font-bold text-green-400">
                ₹{weeklyCost}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Your weekly budget
              </p>

              <p className="mt-1 text-3xl font-bold text-yellow-400">
                ₹{weeklyBudget}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Remaining
              </p>

              <p
                className={`mt-1 text-3xl font-bold ${
                  weeklyBudget - weeklyCost >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ₹
                {Math.max(
                  0,
                  weeklyBudget - weeklyCost
                )}
              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="mt-8 flex justify-center pb-8">
          <Link
            to="/dashboard"
            className="rounded-full bg-green-500 px-8 py-4 font-bold text-black transition hover:bg-green-400"
          >
            Go to Dashboard
          </Link>
        </div>

      </div>

    </div>
  );
};

export default DietPlanner;