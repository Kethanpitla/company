import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaCheckCircle,
  FaClock,
  FaFire,
  FaArrowRight,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

const WorkoutTracker = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState<string[]>([]);

  const experience =
    user.level?.toLowerCase() || "beginner";

  const isBeginner = experience.includes("beginner");

  const workoutDays =
    Number(user.workoutDays) || 4;

  const today = new Date().getDay();

  const dayIndex =
    today === 0 ? 6 : today - 1;

  const workoutIndex =
    dayIndex % Math.min(workoutDays, 6);

  const workouts = useMemo(
    () => [
      {
        title: "Chest + Triceps",
        duration: 50,
        calories: 320,
        exercises: [
          {
            name: "Bench Press",
            sets: isBeginner ? 3 : 4,
            reps: "8–12",
          },
          {
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "Chest Fly",
            sets: 3,
            reps: "12–15",
          },
          {
            name: "Tricep Pushdown",
            sets: 3,
            reps: "10–15",
          },
        ],
      },
      {
        title: "Back + Biceps",
        duration: 55,
        calories: 350,
        exercises: [
          {
            name: "Lat Pulldown",
            sets: 3,
            reps: "8–12",
          },
          {
            name: "Seated Cable Row",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "One Arm Dumbbell Row",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "Hammer Curl",
            sets: 3,
            reps: "10–15",
          },
        ],
      },
      {
        title: "Legs",
        duration: 60,
        calories: 420,
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: "8–12",
          },
          {
            name: "Leg Press",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "Romanian Deadlift",
            sets: 3,
            reps: "8–12",
          },
          {
            name: "Calf Raises",
            sets: 4,
            reps: "12–15",
          },
        ],
      },
      {
        title: "Shoulders + Core",
        duration: 45,
        calories: 280,
        exercises: [
          {
            name: "Shoulder Press",
            sets: 3,
            reps: "8–12",
          },
          {
            name: "Lateral Raises",
            sets: 3,
            reps: "12–15",
          },
          {
            name: "Rear Delt Fly",
            sets: 3,
            reps: "12–15",
          },
          {
            name: "Plank",
            sets: 3,
            reps: "30–60 sec",
          },
        ],
      },
      {
        title: "Chest + Back",
        duration: 55,
        calories: 360,
        exercises: [
          {
            name: "Incline Bench Press",
            sets: 3,
            reps: "8–12",
          },
          {
            name: "Cable Fly",
            sets: 3,
            reps: "12–15",
          },
          {
            name: "Lat Pulldown",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "Seated Row",
            sets: 3,
            reps: "10–12",
          },
        ],
      },
      {
        title: "Full Body",
        duration: 50,
        calories: 380,
        exercises: [
          {
            name: "Goblet Squat",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "Push Ups",
            sets: 3,
            reps: "8–15",
          },
          {
            name: "Dumbbell Row",
            sets: 3,
            reps: "10–12",
          },
          {
            name: "Shoulder Press",
            sets: 3,
            reps: "10–12",
          },
        ],
      },
    ],
    [isBeginner]
  );

  const workout =
    workouts[workoutIndex] || workouts[0];

  const toggleExercise = (
    exercise: Exercise
  ) => {
    setCompleted((current) =>
      current.includes(exercise.name)
        ? current.filter(
            (item) => item !== exercise.name
          )
        : [...current, exercise.name]
    );
  };

  const completedCount =
    workout.exercises.filter((exercise) =>
      completed.includes(exercise.name)
    ).length;

  const progress =
    (completedCount /
      workout.exercises.length) *
    100;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
              <FaDumbbell />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
                Today's Workout
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {workout.title}
              </h2>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/workout-session")
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-[#F2A93B] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#ffc15b]"
          >
            Full Workout
            <FaArrowRight className="text-xs" />
          </button>

        </div>

        {/* STATS */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

            <div className="flex items-center gap-2 text-gray-500">
              <FaClock className="text-xs" />
              <span className="text-xs">
                Duration
              </span>
            </div>

            <p className="mt-2 font-bold">
              {workout.duration} min
            </p>

          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

            <div className="flex items-center gap-2 text-gray-500">
              <FaFire className="text-xs" />
              <span className="text-xs">
                Calories
              </span>
            </div>

            <p className="mt-2 font-bold">
              ~{workout.calories} kcal
            </p>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="mt-6">

          <div className="flex items-center justify-between">

            <p className="text-sm text-gray-400">
              Workout Progress
            </p>

            <p className="text-sm font-bold text-green-400">
              {completedCount}/
              {workout.exercises.length}
            </p>

          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-[#F2A93B] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* EXERCISES */}

        <div className="mt-6 space-y-3">

          {workout.exercises.map(
            (exercise, index) => {

              const isCompleted =
                completed.includes(
                  exercise.name
                );

              return (
                <button
                  key={exercise.name}
                  type="button"
                  onClick={() =>
                    toggleExercise(exercise)
                  }
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isCompleted
                      ? "border-green-400/20 bg-green-400/5"
                      : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      isCompleted
                        ? "bg-green-400 text-black"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheckCircle />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="flex-1">

                    <p
                      className={`text-sm font-semibold ${
                        isCompleted
                          ? "text-green-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {exercise.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-300">
                      {exercise.sets} sets ×{" "}
                      {exercise.reps} reps
                    </p>

                  </div>

                  <FaCheckCircle
                    className={
                      isCompleted
                        ? "text-green-400"
                        : "text-gray-700"
                    }
                  />

                </button>
              );
            }
          )}

        </div>

        {/* COMPLETE */}

        {completedCount ===
          workout.exercises.length && (

          <div className="mt-5 rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-center">

            <p className="font-bold text-green-400">
              🎉 Workout completed!
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Great job. Keep the streak alive.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default WorkoutTracker;