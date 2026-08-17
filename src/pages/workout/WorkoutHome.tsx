import { motion } from "framer-motion";
import {
  FaPlay,
  FaFire,
  FaClock,
  FaDumbbell,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const todayWorkout = {
  muscle: "Chest & Triceps",
  duration: "75 mins",
  calories: 650,
  exercises: 8,
};

const weeklyPlan = [
  {
    day: "Mon",
    workout: "Chest",
    color: "from-red-500 to-red-700",
  },
  {
    day: "Tue",
    workout: "Back",
    color: "from-blue-500 to-blue-700",
  },
  {
    day: "Wed",
    workout: "Legs",
    color: "from-green-500 to-green-700",
  },
  {
    day: "Thu",
    workout: "Shoulders",
    color: "from-yellow-500 to-orange-500",
  },
  {
    day: "Fri",
    workout: "Arms",
    color: "from-pink-500 to-purple-600",
  },
  {
    day: "Sat",
    workout: "Cardio",
    color: "from-cyan-500 to-sky-700",
  },
  {
    day: "Sun",
    workout: "Rest",
    color: "from-gray-500 to-gray-700",
  },
];

const WorkoutHome = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] p-8">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl"
      >

        <h1 className="text-5xl font-bold text-white">
          Today's Workout
        </h1>

        <p className="mt-3 text-gray-400">
          Stay consistent. Build your dream physique.
        </p>

        {/* Hero */}

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 p-[2px]">

          <div className="rounded-3xl bg-[#111] p-10">

            <div className="flex flex-col justify-between gap-8 lg:flex-row">

              <div>

                <h2 className="text-5xl font-bold text-white">
                  {todayWorkout.muscle}
                </h2>

                <div className="mt-8 flex flex-wrap gap-5">

                  <div className="rounded-xl bg-white/5 px-6 py-4">
                    <FaClock className="mb-2 text-yellow-400" />
                    <p className="text-gray-400">Duration</p>
                    <h3 className="text-xl font-bold text-white">
                      {todayWorkout.duration}
                    </h3>
                  </div>

                  <div className="rounded-xl bg-white/5 px-6 py-4">
                    <FaFire className="mb-2 text-orange-400" />
                    <p className="text-gray-400">Calories</p>
                    <h3 className="text-xl font-bold text-white">
                      {todayWorkout.calories}
                    </h3>
                  </div>

                  <div className="rounded-xl bg-white/5 px-6 py-4">
                    <FaDumbbell className="mb-2 text-green-400" />
                    <p className="text-gray-400">Exercises</p>
                    <h3 className="text-xl font-bold text-white">
                      {todayWorkout.exercises}
                    </h3>
                  </div>

                </div>

                <Link to="/start-workout">

                  <button className="mt-10 flex items-center gap-3 rounded-xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-105">

                    <FaPlay />

                    Start Workout

                  </button>

                </Link>

              </div>

              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900"
                alt=""
                className="h-[350px] rounded-3xl object-cover lg:w-[420px]"
              />

            </div>

          </div>

        </div>

        {/* Weekly Plan */}

        <h2 className="mt-14 text-3xl font-bold text-white">
          Weekly Schedule
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {weeklyPlan.map((item) => (

            <motion.div
              whileHover={{ y: -8 }}
              key={item.day}
              className={`rounded-3xl bg-gradient-to-br ${item.color} p-[2px]`}
            >

              <div className="rounded-3xl bg-[#111] p-6">

                <p className="text-gray-400">
                  {item.day}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {item.workout}
                </h3>

                <button className="mt-8 flex items-center gap-2 text-yellow-400">

                  View

                  <FaArrowRight />

                </button>

              </div>

            </motion.div>

          ))}

        </div>

        {/* Quick Actions */}

        <h2 className="mt-14 text-3xl font-bold text-white">
          Quick Actions
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <Link to="/exercise-library">

            <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-8 transition hover:border-yellow-400">

              <FaDumbbell className="text-5xl text-yellow-400" />

              <h3 className="mt-5 text-2xl font-bold text-white">
                Exercise Library
              </h3>

              <p className="mt-3 text-gray-400">
                Browse hundreds of exercises.
              </p>

            </div>

          </Link>

          <Link to="/history">

            <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-8 transition hover:border-yellow-400">

              <FaClock className="text-5xl text-cyan-400" />

              <h3 className="mt-5 text-2xl font-bold text-white">
                Workout History
              </h3>

              <p className="mt-3 text-gray-400">
                View previous workouts.
              </p>

            </div>

          </Link>

          <Link to="/recovery">

            <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-8 transition hover:border-yellow-400">

              <FaFire className="text-5xl text-red-400" />

              <h3 className="mt-5 text-2xl font-bold text-white">
                Recovery
              </h3>

              <p className="mt-3 text-gray-400">
                Track muscle recovery.
              </p>

            </div>

          </Link>

        </div>

      </motion.div>

    </div>
  );
};

export default WorkoutHome;