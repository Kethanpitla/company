import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCoins,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProgressBar from "../components/onboarding/ProgressBar";

const Budget = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const [budget, setBudget] = useState(
    user.weeklyBudget || 2500
  );

  const budgetOptions = [
    {
      amount: 1500,
      title: "Budget",
      description:
        "Affordable foods with high nutrition",
    },
    {
      amount: 2500,
      title: "Balanced",
      description:
        "Good variety and high-protein foods",
    },
    {
      amount: 3500,
      title: "Premium",
      description:
        "More variety and premium protein sources",
    },
    {
      amount: 5000,
      title: "Flexible",
      description:
        "Maximum food variety and flexibility",
    },
  ];

  const handleContinue = () => {
    updateUser({
      weeklyBudget: budget.toString(),
    });

    navigate("/upload-photo");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-8 text-white sm:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="text-center w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 mb-8">
          <ProgressBar step={9} totalSteps={10} />
          
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10 mt-6">
            <FaCoins className="text-3xl text-yellow-400" />
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            What's your weekly food budget?
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Your budget helps us create a realistic
            7-day meal plan using foods you can
            actually afford.
          </p>
        </div>

        {/* Budget Options */}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">

          {budgetOptions.map((option) => {

            const selected =
              budget === option.amount;

            return (
              <button
                type="button"
                key={option.amount}
                onClick={() =>
                  setBudget(option.amount)
                }
                className={`relative rounded-3xl border p-6 text-left transition ${
                  selected
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-white/10 bg-white/5 hover:border-yellow-400/40"
                }`}
              >

                {selected && (
                  <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-black">
                    <FaCheck />
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  {option.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                  ₹{option.amount}
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    / week
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {option.description}
                </p>

              </button>
            );
          })}

        </div>

        {/* Custom Budget */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-bold">
            Custom Weekly Budget
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the amount you can spend on food
            each week.
          </p>

          <div className="mt-5 flex items-center rounded-xl border border-white/10 bg-[#0F172A]/50 px-4">

            <span className="text-xl font-bold text-yellow-400">
              ₹
            </span>

            <input
              type="number"
              min="500"
              value={budget}
              onChange={(e) =>
                setBudget(
                  Number(e.target.value)
                )
              }
              className="w-full bg-transparent px-3 py-4 text-xl font-semibold outline-none"
              placeholder="2500"
            />

            <span className="text-sm text-gray-300">
              / week
            </span>

          </div>

        </div>

        {/* Daily Budget */}

        <div className="mt-6 rounded-2xl bg-green-400/5 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Approximate daily food budget
              </p>

              <p className="mt-1 text-2xl font-bold text-green-400">
                ₹{Math.round(Number(budget) / 7)}
              </p>

            </div>

            <FaCoins className="text-3xl text-green-400" />

          </div>

        </div>

        {/* Diet Summary */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-xs text-gray-500">
              Diet
            </p>

            <p className="mt-1 font-bold">
              {user.dietType || "Not selected"}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <p className="text-xs text-gray-500">
              Goal
            </p>

            <p className="mt-1 font-bold">
              {user.goal || "Not selected"}
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="mt-10 flex items-center justify-between">

          <button
            type="button"
            onClick={() =>
              navigate("/diet")
            }
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            type="button"
            disabled={Number(budget) < 500}
            onClick={handleContinue}
            className="flex items-center gap-3 rounded-xl bg-yellow-400 px-7 py-4 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Generate My Plan
            <FaArrowRight />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Budget;