import { useState } from "react";
import {
  FaCheck,
  FaLeaf,
  FaDrumstickBite,
  FaAppleAlt,
  FaFire,
  FaDumbbell,
  FaUtensils,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProgressBar from "../components/onboarding/ProgressBar";

const Diet = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const [diet, setDiet] = useState(
    user.dietType || ""
  );

  const [caloriePreference, setCaloriePreference] =
    useState("Balanced");

  const [mealsPerDay, setMealsPerDay] =
    useState(4);

  const [selectedFoods, setSelectedFoods] =
    useState<string[]>([]);

  const vegetarianFoods = [
    "Paneer",
    "Milk",
    "Curd",
    "Greek Yogurt",
    "Dal",
    "Rajma",
    "Chole",
    "Tofu",
    "Soy Chunks",
    "Oats",
    "Rice",
    "Roti",
    "Vegetables",
    "Fruits",
    "Nuts",
  ];

  const nonVegetarianFoods = [
    "Chicken",
    "Eggs",
    "Fish",
    "Turkey",
    "Paneer",
    "Milk",
    "Curd",
    "Greek Yogurt",
    "Dal",
    "Rice",
    "Roti",
    "Vegetables",
    "Fruits",
    "Nuts",
  ];

  const foods =
    diet === "Vegetarian"
      ? vegetarianFoods
      : nonVegetarianFoods;

  const toggleFood = (food: string) => {
    setSelectedFoods((previous) =>
      previous.includes(food)
        ? previous.filter(
            (item) => item !== food
          )
        : [...previous, food]
    );
  };

  const handleContinue = () => {
    if (!diet) return;

    updateUser({
      dietType: diet,
      diet: diet,
    });

    navigate("/budget");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-8 text-white sm:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="text-center w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 mb-8">
          <ProgressBar step={8} totalSteps={10} />
          
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 mt-6">
            <FaAppleAlt className="text-3xl text-green-400" />
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Tell us about your diet
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Choose your diet preference and we'll
            create a personalized nutrition plan based
            on your goal, weight and lifestyle.
          </p>
        </div>

        {/* Diet Type */}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Vegetarian */}

          <button
            type="button"
            onClick={() =>
              setDiet("Vegetarian")
            }
            className={`relative rounded-3xl border p-6 text-left transition ${
              diet === "Vegetarian"
                ? "border-green-400 bg-green-400/10"
                : "border-white/10 bg-white/5 hover:border-green-400/40"
            }`}
          >

            {diet === "Vegetarian" && (
              <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-black">
                <FaCheck />
              </div>
            )}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
              <FaLeaf className="text-2xl text-green-400" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Vegetarian
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              A plant-focused diet including dairy,
              grains, legumes, vegetables, fruits and
              other vegetarian protein sources.
            </p>

            <div className="mt-5 space-y-2">

              {[
                "Paneer & tofu",
                "Dal, rajma & chole",
                "Milk & curd",
                "Fruits & vegetables",
                "Nuts & seeds",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <FaCheck className="text-xs text-green-400" />
                  {item}
                </div>
              ))}

            </div>

          </button>

          {/* Non Vegetarian */}

          <button
            type="button"
            onClick={() =>
              setDiet("Non-Vegetarian")
            }
            className={`relative rounded-3xl border p-6 text-left transition ${
              diet === "Non-Vegetarian"
                ? "border-orange-400 bg-orange-400/10"
                : "border-white/10 bg-white/5 hover:border-orange-400/40"
            }`}
          >

            {diet === "Non-Vegetarian" && (
              <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-black">
                <FaCheck />
              </div>
            )}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
              <FaDrumstickBite className="text-2xl text-orange-400" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Non-Vegetarian
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              A flexible diet containing meat,
              poultry, fish and eggs along with
              vegetables, grains and dairy.
            </p>

            <div className="mt-5 space-y-2">

              {[
                "Chicken & lean meat",
                "Eggs",
                "Fish",
                "Milk & curd",
                "Fruits & vegetables",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <FaCheck className="text-xs text-orange-400" />
                  {item}
                </div>
              ))}

            </div>

          </button>

        </div>

        {/* Additional Preferences */}

        {diet && (
          <div className="mt-8 space-y-6">

            {/* Calorie Preference */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

              <div className="flex items-center gap-3">

                <FaFire className="text-xl text-orange-400" />

                <div>

                  <h2 className="text-xl font-bold">
                    Calorie Preference
                  </h2>

                  <p className="text-sm text-gray-500">
                    We'll adjust this based on your
                    fitness goal.
                  </p>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                {[
                  "Lower Calories",
                  "Balanced",
                  "Higher Calories",
                ].map((option) => (

                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setCaloriePreference(
                        option
                      )
                    }
                    className={`rounded-xl border p-4 text-sm font-semibold transition ${
                      caloriePreference === option
                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                        : "border-white/10 text-gray-500 hover:bg-white/5"
                    }`}
                  >
                    {option}
                  </button>

                ))}

              </div>

            </div>

            {/* Meals */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

              <div className="flex items-center gap-3">

                <FaUtensils className="text-xl text-blue-400" />

                <div>

                  <h2 className="text-xl font-bold">
                    Meals Per Day
                  </h2>

                  <p className="text-sm text-gray-500">
                    How many meals do you prefer?
                  </p>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">

                {[3, 4, 5].map((number) => (

                  <button
                    key={number}
                    type="button"
                    onClick={() =>
                      setMealsPerDay(number)
                    }
                    className={`rounded-xl border p-4 text-center transition ${
                      mealsPerDay === number
                        ? "border-blue-400 bg-blue-400/10 text-blue-400"
                        : "border-white/10 text-gray-500 hover:bg-white/5"
                    }`}
                  >

                    <p className="text-xl font-bold">
                      {number}
                    </p>

                    <p className="mt-1 text-xs">
                      meals
                    </p>

                  </button>

                ))}

              </div>

            </div>

            {/* Food Preferences */}

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

              <div className="flex items-center gap-3">

                <FaDumbbell className="text-xl text-purple-400" />

                <div>

                  <h2 className="text-xl font-bold">
                    Preferred Foods
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select foods you enjoy eating.
                  </p>

                </div>

              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                {foods.map((food) => {

                  const selected =
                    selectedFoods.includes(food);

                  return (
                    <button
                      key={food}
                      type="button"
                      onClick={() =>
                        toggleFood(food)
                      }
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selected
                          ? "border-green-400 bg-green-400/10 text-green-400"
                          : "border-white/10 text-gray-500 hover:border-white/30"
                      }`}
                    >
                      {selected && "✓ "}
                      {food}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* Preview */}

            <div className="rounded-3xl border border-green-400/20 bg-green-400/5 p-6">

              <h2 className="text-xl font-bold text-green-400">
                Your Diet Plan Preview
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Diet
                  </p>

                  <p className="mt-1 font-semibold">
                    {diet}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Meals
                  </p>

                  <p className="mt-1 font-semibold">
                    {mealsPerDay}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Calories
                  </p>

                  <p className="mt-1 font-semibold">
                    {caloriePreference}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Foods
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedFoods.length}
                    {" "}selected
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Continue */}

        <div className="mt-10 flex justify-end">

          <button
            type="button"
            disabled={!diet}
            onClick={handleContinue}
            className="flex items-center gap-3 rounded-xl bg-green-400 px-8 py-4 font-bold text-black transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue

            <span>→</span>

          </button>

        </div>

      </div>

    </div>
  );
};

export default Diet;