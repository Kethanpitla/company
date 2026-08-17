import { FaBullseye, FaWeight, FaDumbbell, FaFire } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const WelcomeCard = () => {
  const { user } = useUser();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-[#111111] via-[#171717] to-[#0b0b0b] p-8">

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10">

        <h1 className="text-4xl font-bold text-white">
          {greeting},{" "}
          <span className="text-yellow-400">
            {user.name || "Athlete"}
          </span>
          👋
        </h1>

        <p className="mt-3 max-w-2xl text-gray-400">
          Stay consistent. Every workout brings you one step closer to your goal.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">

          <div className="rounded-2xl bg-white/5 p-5">
            <FaWeight className="mb-3 text-2xl text-yellow-400" />
            <p className="text-gray-400 text-sm">Current Weight</p>
            <h2 className="text-2xl font-bold">
              {user.weight || 0} kg
            </h2>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <FaBullseye className="mb-3 text-2xl text-yellow-400" />
            <p className="text-gray-400 text-sm">Goal</p>
            <h2 className="text-xl font-bold">
              {user.goal || "-"}
            </h2>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <FaDumbbell className="mb-3 text-2xl text-yellow-400" />
            <p className="text-gray-400 text-sm">Workout Days</p>
            <h2 className="text-2xl font-bold">
              {user.workoutDays || 0}/Week
            </h2>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <FaFire className="mb-3 text-2xl text-yellow-400" />
            <p className="text-gray-400 text-sm">BMI</p>
            <h2 className="text-2xl font-bold">
              {user.bmi || 0}
            </h2>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WelcomeCard;