import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaDumbbell,
  FaFire,
  FaPlay,
  FaPause,
  FaRedo,
  FaChevronRight,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: number;
  muscle: string;
}

interface SessionWorkout {
  title: string;
  description: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
}

const WorkoutSession = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  /* ==========================================
     USER DATA
  ========================================== */

  const goal = user.goal?.toLowerCase() || "";
  const level = user.level?.toLowerCase() || "";
  const location = user.workoutLocation?.toLowerCase() || "";

  const weight = Number(user.weight) || 70;

  const workoutDays = Math.min(
    Math.max(Number(user.workoutDays) || 3, 1),
    7
  );

  const isHome = location.includes("home");

  const isBeginner =
    level.includes("beginner") ||
    level.includes("novice") ||
    user.trainingYears === 0;

  const isAdvanced =
    level.includes("advanced") ||
    user.trainingYears >= 3;

  const isMuscleGain =
    goal.includes("gain") ||
    goal.includes("muscle") ||
    goal.includes("bulk");

  const isFatLoss =
    goal.includes("loss") ||
    goal.includes("lose") ||
    goal.includes("cut");

  const isPowerlifting = goal.includes("power");

  /* ==========================================
     WEEK DAYS
  ========================================== */

  const weeklyPlan = useMemo(
    () =>
      Array.from({ length: workoutDays }, (_, index) => ({
        day: index + 1,
        title: `Workout ${index + 1}`,
      })),
    [workoutDays]
  );

  const today = new Date().getDay();

  const initialWorkoutDay =
    ((today + 6) % 7) % workoutDays + 1;

  const [selectedDay, setSelectedDay] =
    useState(initialWorkoutDay);

  const workoutDay = selectedDay;

  /* ==========================================
     GYM EXERCISES
  ========================================== */

  const gymExercises = {
    chest: [
      {
        name: "Barbell Bench Press",
        sets: 4,
        reps: "8–10",
        rest: 90,
        muscle: "Chest",
      },
      {
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: "8–12",
        rest: 75,
        muscle: "Chest",
      },
      {
        name: "Cable Fly",
        sets: 3,
        reps: "12–15",
        rest: 60,
        muscle: "Chest",
      },
      {
        name: "Push Ups",
        sets: 3,
        reps: "12–15",
        rest: 60,
        muscle: "Chest",
      },
    ],

    back: [
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: "8–12",
        rest: 75,
        muscle: "Back",
      },
      {
        name: "Seated Cable Row",
        sets: 4,
        reps: "8–12",
        rest: 75,
        muscle: "Back",
      },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: "8–10",
        rest: 90,
        muscle: "Hamstrings",
      },
      {
        name: "Face Pull",
        sets: 3,
        reps: "12–15",
        rest: 60,
        muscle: "Shoulders",
      },
    ],

    legs: [
      {
        name: "Barbell Squat",
        sets: 4,
        reps: "8–10",
        rest: 90,
        muscle: "Legs",
      },
      {
        name: "Leg Press",
        sets: 4,
        reps: "10–12",
        rest: 90,
        muscle: "Legs",
      },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: "8–12",
        rest: 90,
        muscle: "Hamstrings",
      },
      {
        name: "Walking Lunges",
        sets: 3,
        reps: "10 each",
        rest: 60,
        muscle: "Legs",
      },
    ],

    shoulders: [
      {
        name: "Shoulder Press",
        sets: 4,
        reps: "8–12",
        rest: 75,
        muscle: "Shoulders",
      },
      {
        name: "Lateral Raise",
        sets: 3,
        reps: "12–15",
        rest: 60,
        muscle: "Shoulders",
      },
      {
        name: "Rear Delt Fly",
        sets: 3,
        reps: "12–15",
        rest: 60,
        muscle: "Shoulders",
      },
      {
        name: "Face Pull",
        sets: 3,
        reps: "12–15",
        rest: 60,
        muscle: "Shoulders",
      },
    ],

    arms: [
      {
        name: "Dumbbell Curl",
        sets: 3,
        reps: "10–12",
        rest: 60,
        muscle: "Biceps",
      },
      {
        name: "Hammer Curl",
        sets: 3,
        reps: "10–12",
        rest: 60,
        muscle: "Biceps",
      },
      {
        name: "Tricep Pushdown",
        sets: 3,
        reps: "10–15",
        rest: 60,
        muscle: "Triceps",
      },
      {
        name: "Overhead Tricep Extension",
        sets: 3,
        reps: "10–12",
        rest: 60,
        muscle: "Triceps",
      },
    ],

    core: [
      {
        name: "Plank",
        sets: 3,
        reps: "30–60 sec",
        rest: 45,
        muscle: "Core",
      },
      {
        name: "Hanging Knee Raise",
        sets: 3,
        reps: "10–15",
        rest: 45,
        muscle: "Core",
      },
      {
        name: "Cable Crunch",
        sets: 3,
        reps: "12–15",
        rest: 45,
        muscle: "Core",
      },
    ],
  };

  /* ==========================================
     HOME EXERCISES
  ========================================== */

  const homeExercises = {
    chest: [
      {
        name: "Push Ups",
        sets: 4,
        reps: "10–15",
        rest: 60,
        muscle: "Chest",
      },
      {
        name: "Wide Push Ups",
        sets: 3,
        reps: "10–15",
        rest: 60,
        muscle: "Chest",
      },
      {
        name: "Diamond Push Ups",
        sets: 3,
        reps: "8–12",
        rest: 60,
        muscle: "Chest",
      },
    ],

    legs: [
      {
        name: "Bodyweight Squat",
        sets: 4,
        reps: "15–20",
        rest: 60,
        muscle: "Legs",
      },
      {
        name: "Reverse Lunges",
        sets: 3,
        reps: "10 each",
        rest: 60,
        muscle: "Legs",
      },
      {
        name: "Glute Bridge",
        sets: 3,
        reps: "15–20",
        rest: 45,
        muscle: "Glutes",
      },
      {
        name: "Wall Sit",
        sets: 3,
        reps: "30–60 sec",
        rest: 45,
        muscle: "Legs",
      },
    ],

    shoulders: [
      {
        name: "Pike Push Ups",
        sets: 3,
        reps: "8–12",
        rest: 60,
        muscle: "Shoulders",
      },
      {
        name: "Arm Circles",
        sets: 3,
        reps: "30 sec",
        rest: 30,
        muscle: "Shoulders",
      },
    ],

    core: [
      {
        name: "Plank",
        sets: 3,
        reps: "30–60 sec",
        rest: 45,
        muscle: "Core",
      },
      {
        name: "Mountain Climbers",
        sets: 3,
        reps: "30 sec",
        rest: 45,
        muscle: "Core",
      },
      {
        name: "Leg Raises",
        sets: 3,
        reps: "10–15",
        rest: 45,
        muscle: "Core",
      },
    ],
  };

  /* ==========================================
     WORKOUT GENERATOR
  ========================================== */

  const workout = useMemo<SessionWorkout>(() => {
    const gym = gymExercises;
    const home = homeExercises;

    const chest = isHome ? home.chest : gym.chest;
    const legs = isHome ? home.legs : gym.legs;
    const shoulders = isHome
      ? home.shoulders
      : gym.shoulders;
    const core = isHome ? home.core : gym.core;

    /* POWERLIFTING */

    if (isPowerlifting && !isHome) {
      return {
        title: `Power & Strength — Day ${workoutDay}`,
        description:
          "Strength-focused training built around heavy compound movements.",
        duration: isAdvanced ? 75 : 60,
        calories: Math.round(weight * 5),
        exercises: [
          {
            name: "Barbell Squat",
            sets: isAdvanced ? 5 : 4,
            reps: "3–6",
            rest: 180,
            muscle: "Legs",
          },
          {
            name: "Bench Press",
            sets: isAdvanced ? 5 : 4,
            reps: "3–6",
            rest: 180,
            muscle: "Chest",
          },
          {
            name: "Deadlift",
            sets: isAdvanced ? 4 : 3,
            reps: "3–5",
            rest: 210,
            muscle: "Back",
          },
          {
            name: "Overhead Press",
            sets: 3,
            reps: "5–8",
            rest: 120,
            muscle: "Shoulders",
          },
        ],
      };
    }

    /* FAT LOSS */

    if (isFatLoss) {
      const plans: Exercise[][] = [
        [...legs, ...core],
        [...chest, ...shoulders, ...core],
        [...legs, ...chest],
        [...shoulders, ...core, ...legs],
        [...chest, ...legs, ...core],
        [...shoulders, ...chest],
        [...legs, ...core],
      ];

      const selected =
        plans[(workoutDay - 1) % plans.length];

      return {
        title: `Fat Loss & Conditioning — Day ${workoutDay}`,
        description:
          "Higher-volume training designed to support fat loss while maintaining muscle.",
        duration: isBeginner ? 40 : 55,
        calories: Math.round(
          weight * (isBeginner ? 5 : 6)
        ),
        exercises: selected
          .slice(0, 6)
          .map((exercise) => ({
            ...exercise,
            sets: isBeginner
              ? Math.min(exercise.sets, 3)
              : exercise.sets,
            reps:
              exercise.muscle === "Core"
                ? "30–45 sec"
                : "12–15",
            rest: 45,
          })),
      };
    }

    /* MUSCLE GAIN */

    if (isMuscleGain) {
      const plans: Exercise[][] = [
        chest,
        legs,
        shoulders,
        [...gym.back, ...gym.arms],
        [...chest, ...shoulders],
        [...legs, ...core],
        [...gym.back, ...gym.arms],
      ];

      const selected =
        plans[(workoutDay - 1) % plans.length];

      return {
        title: `Muscle Building — Day ${workoutDay}`,
        description:
          "Progressive resistance training designed to build muscle and strength.",
        duration: isAdvanced ? 70 : 55,
        calories: Math.round(weight * 4.5),
        exercises: selected
          .slice(0, 5)
          .map((exercise) => ({
            ...exercise,
            sets: isBeginner
              ? Math.min(exercise.sets, 3)
              : exercise.sets,
            reps: isBeginner
              ? "10–15"
              : exercise.reps,
          })),
      };
    }

    /* GENERAL FITNESS */

    const plans: Exercise[][] = [
      [...chest, ...core],
      [...legs, ...shoulders],
      [...chest, ...legs],
      [...shoulders, ...core],
      [...legs, ...chest],
      [...shoulders, ...core],
      [...legs, ...chest],
    ];

    const selected =
      plans[(workoutDay - 1) % plans.length];

    return {
      title: `Full Body Fitness — Day ${workoutDay}`,
      description:
        "A balanced workout designed around your fitness level and training schedule.",
      duration: isBeginner ? 40 : 50,
      calories: Math.round(weight * 4),
      exercises: selected
        .slice(0, 5)
        .map((exercise) => ({
          ...exercise,
          sets: isBeginner
            ? Math.min(exercise.sets, 3)
            : exercise.sets,
        })),
    };
  }, [
    weight,
    workoutDay,
    isHome,
    isBeginner,
    isAdvanced,
    isMuscleGain,
    isFatLoss,
    isPowerlifting,
  ]);

  /* ==========================================
     SESSION STATE
  ========================================== */

  const [completed, setCompleted] = useState<string[]>(
    []
  );

  const [activeExercise, setActiveExercise] =
    useState(0);

  const [timer, setTimer] = useState(0);

  const [isTimerRunning, setIsTimerRunning] =
    useState(false);

  /* ==========================================
     RESET SESSION WHEN DAY CHANGES
  ========================================== */

  useEffect(() => {
    setCompleted([]);
    setActiveExercise(0);
    setTimer(0);
    setIsTimerRunning(false);
  }, [selectedDay]);

  /* ==========================================
     TIMER
  ========================================== */

  useEffect(() => {
    if (!isTimerRunning || timer <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer <= 1) {
          setIsTimerRunning(false);
          return 0;
        }

        return currentTimer - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const startRestTimer = () => {
    const seconds =
      workout.exercises[activeExercise]?.rest || 60;

    setTimer(seconds);
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(
      2,
      "0"
    )}`;
  };

  /* ==========================================
     CURRENT EXERCISE
  ========================================== */

  const current =
    workout.exercises[activeExercise];

  const completedCount =
    workout.exercises.filter((exercise) =>
      completed.includes(exercise.name)
    ).length;

  const progress =
    workout.exercises.length > 0
      ? (completedCount /
          workout.exercises.length) *
        100
      : 0;

  /* ==========================================
     COMPLETE EXERCISE
  ========================================== */

  const toggleExercise = (
    exerciseName: string
  ) => {
    setCompleted((currentCompleted) => {
      if (currentCompleted.includes(exerciseName)) {
        return currentCompleted.filter(
          (name) => name !== exerciseName
        );
      }

      return [
        ...currentCompleted,
        exerciseName,
      ];
    });

    resetTimer();
  };

  /* ==========================================
     NEXT EXERCISE
  ========================================== */

  const nextExercise = () => {
    if (
      activeExercise <
      workout.exercises.length - 1
    ) {
      setActiveExercise(
        (currentIndex) => currentIndex + 1
      );

      resetTimer();
    }
  };

  /* ==========================================
     FINISH WORKOUT
  ========================================== */

  const finishWorkout = () => {
    const today = new Date().toISOString();

    updateUser({
      workoutHistory: [
        ...(user.workoutHistory || []),
        today,
      ],

completedExercises: completed,
      streak: (user.streak || 0) + 1,

      todayWorkout:
        workout.exercises.map(
          (exercise) => exercise.name
        ),
    });

    navigate("/dashboard");
  };

  /* ==========================================
     SAFETY
  ========================================== */

  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#15111C] text-[#F5F0E8]">
        <div className="text-center">
          <FaDumbbell className="mx-auto mb-4 text-4xl text-[#F2A93B]" />

          <h1 className="text-xl font-bold">
            No workout available
          </h1>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-5 rounded-xl bg-[#F2A93B] px-5 py-3 font-bold text-black"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15111C] text-[#F5F0E8]">
      <main className="mx-auto max-w-6xl p-5 sm:p-8">

        {/* ======================================
            BACK
        ====================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* ======================================
            DAY SELECTOR
        ====================================== */}

        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#F2A93B]">
                Training Plan
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Choose Workout Day
              </h2>
            </div>

            <span className="rounded-xl bg-white/5 px-3 py-2 text-xs text-gray-500">
              {workoutDays} days/week
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {weeklyPlan.map((day) => {
              const active =
                selectedDay === day.day;

              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => {
                    setSelectedDay(day.day);
                  }}
                  className={`group min-w-[110px] rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-[#F2A93B]/40 bg-[#F2A93B]/10"
                      : "border-white/10 bg-[#231C2E]/60 hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] uppercase tracking-wider ${
                        active
                          ? "text-[#F2A93B]"
                          : "text-gray-300"
                      }`}
                    >
                      Day
                    </span>

                    {active && (
                      <FaCheckCircle className="text-xs text-[#F2A93B]" />
                    )}
                  </div>

                  <p
                    className={`mt-1 text-xl font-bold ${
                      active
                        ? "text-[#F2A93B]"
                        : "text-white"
                    }`}
                  >
                    {day.day}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {day.title}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

          <div className="relative">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
                  <FaDumbbell />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
                    Day {workoutDay} • Today's Session
                  </p>

                  <h1 className="mt-1 text-2xl font-bold">
                    {workout.title}
                  </h1>

                  <p className="mt-1 max-w-xl text-xs text-gray-500">
                    {workout.description}
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaClock className="text-xs" />

                    <span className="text-xs">
                      Duration
                    </span>
                  </div>

                  <p className="mt-1 font-bold">
                    {workout.duration} min
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaFire className="text-xs" />

                    <span className="text-xs">
                      Calories
                    </span>
                  </div>

                  <p className="mt-1 font-bold">
                    ~{workout.calories}
                  </p>
                </div>

              </div>
            </div>

            {/* USER INFO */}

            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded-xl bg-[#F2A93B]/10 px-3 py-2 text-[10px] font-semibold text-[#F2A93B]">
                Goal:{" "}
                {user.goal || "General Fitness"}
              </span>

              <span className="rounded-xl bg-[#5B8DEF]/10 px-3 py-2 text-[10px] font-semibold text-[#5B8DEF]">
                Level:{" "}
                {user.level || "Beginner"}
              </span>

              <span className="rounded-xl bg-white/5 px-3 py-2 text-[10px] text-gray-500">
                {workoutDays} days/week
              </span>

              <span className="rounded-xl bg-white/5 px-3 py-2 text-[10px] text-gray-500">
                Day {workoutDay}
              </span>

            </div>

            {/* PROGRESS */}

            <div className="mt-6">

              <div className="flex justify-between text-xs">

                <span className="text-gray-500">
                  Day {workoutDay} progress
                </span>

                <span className="font-semibold text-[#5B8DEF]">
                  {completedCount}/
                  {workout.exercises.length}
                </span>

              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#5B8DEF] to-[#F2A93B] transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          </div>
        </div>

        {/* ======================================
            MAIN CONTENT
        ====================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* EXERCISE LIST */}

          <div>

            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-gray-300">
                Day {workoutDay} Exercises
              </p>

              <span className="text-[10px] text-gray-300">
                {completedCount}/{workout.exercises.length}
              </span>
            </div>

            <div className="space-y-3">

              {workout.exercises.map(
                (exercise, index) => {
                  const isCompleted =
                    completed.includes(
                      exercise.name
                    );

                  const isActive =
                    index === activeExercise;

                  return (
                    <button
                      key={`${workoutDay}-${exercise.name}`}
                      type="button"
                      onClick={() => {
                        setActiveExercise(index);
                        resetTimer();
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                        isActive
                          ? "border-[#5B8DEF]/30 bg-[#5B8DEF]/10"
                          : "border-white/5 bg-[#231C2E]/60 hover:bg-white/[0.05]"
                      }`}
                    >

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          isCompleted
                            ? "bg-green-400 text-black"
                            : isActive
                              ? "bg-[#5B8DEF] text-white"
                              : "bg-white/5 text-gray-300"
                        }`}
                      >
                        {isCompleted ? (
                          <FaCheckCircle />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-semibold">
                          {exercise.name}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-300">
                          {exercise.muscle} •{" "}
                          {exercise.sets} sets ×{" "}
                          {exercise.reps}
                        </p>

                      </div>

                      <FaChevronRight
                        className={`text-xs transition ${
                          isActive
                            ? "text-[#5B8DEF]"
                            : "text-gray-700"
                        }`}
                      />

                    </button>
                  );
                }
              )}

            </div>
          </div>

          {/* ACTIVE EXERCISE */}

          <div className="lg:col-span-2">

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

              <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#F2A93B]/10 blur-3xl" />

              <div className="relative">

                <p className="text-xs uppercase tracking-wider text-[#F2A93B]">
                  Exercise {activeExercise + 1}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {current.name}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Target: {current.muscle}
                </p>

                {/* DETAILS */}

                <div className="mt-6 grid grid-cols-3 gap-3">

                  <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                    <p className="text-[10px] text-gray-300">
                      Sets
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {current.sets}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                    <p className="text-[10px] text-gray-300">
                      Reps
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {current.reps}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                    <p className="text-[10px] text-gray-300">
                      Rest
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {current.rest}s
                    </p>
                  </div>

                </div>

                {/* TIMER */}

                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.03] p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs text-gray-300">
                        Rest Timer
                      </p>

                      <p
                        className={`mt-1 text-3xl font-bold ${
                          timer > 0
                            ? "text-[#F2A93B]"
                            : "text-white"
                        }`}
                      >
                        {formatTime(timer)}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() => {
                          if (timer <= 0) {
                            startRestTimer();
                          } else {
                            setIsTimerRunning(
                              (value) => !value
                            );
                          }
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5B8DEF] text-white transition hover:bg-[#6d9cff]"
                      >
                        {isTimerRunning ? (
                          <FaPause />
                        ) : (
                          <FaPlay />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={resetTimer}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10"
                      >
                        <FaRedo />
                      </button>

                    </div>

                  </div>

                  {timer > 0 && (
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#F2A93B] transition-all duration-1000"
                        style={{
                          width: `${Math.min(
                            100,
                            (timer /
                              current.rest) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  )}

                </div>

                {/* COMPLETE */}

                <button
                  type="button"
                  onClick={() =>
                    toggleExercise(
                      current.name
                    )
                  }
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-bold transition ${
                    completed.includes(
                      current.name
                    )
                      ? "bg-green-400/10 text-green-400"
                      : "bg-[#F2A93B] text-black hover:bg-[#ffc15b]"
                  }`}
                >

                  <FaCheckCircle />

                  {completed.includes(
                    current.name
                  )
                    ? "Exercise Completed"
                    : "Mark Exercise Complete"}

                </button>

                {/* NEXT */}

                {activeExercise <
                  workout.exercises.length - 1 && (
                  <button
                    type="button"
                    onClick={nextExercise}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Next Exercise
                    <FaChevronRight className="text-xs" />
                  </button>
                )}

                {/* FINISH */}

                {completedCount ===
                  workout.exercises.length && (
                  <button
                    type="button"
                    onClick={finishWorkout}
                    className="mt-5 w-full rounded-2xl bg-green-400 px-5 py-4 text-sm font-bold text-black transition hover:bg-green-300"
                  >
                    🎉 Finish Workout
                  </button>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WorkoutSession;