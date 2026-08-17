import { useMemo, useState } from "react";
import {
  FaDumbbell,
  FaSearch,
  FaPlay,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

type Exercise = {
  id: number;
  name: string;
  muscle: string;
  difficulty: string;
  equipment: string;
  description: string;
};

const exercises: Exercise[] = [
  {
    id: 1,
    name: "Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    description:
      "Build chest, shoulders and triceps strength.",
  },
  {
    id: 2,
    name: "Incline Dumbbell Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    description:
      "Targets the upper chest and front shoulders.",
  },
  {
    id: 3,
    name: "Squat",
    muscle: "Legs",
    difficulty: "Intermediate",
    equipment: "Barbell",
    description:
      "A compound movement for building lower-body strength.",
  },
  {
    id: 4,
    name: "Deadlift",
    muscle: "Back",
    difficulty: "Advanced",
    equipment: "Barbell",
    description:
      "Develops the posterior chain and overall strength.",
  },
  {
    id: 5,
    name: "Shoulder Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    description:
      "Build shoulder strength and upper-body stability.",
  },
  {
    id: 6,
    name: "Barbell Row",
    muscle: "Back",
    difficulty: "Intermediate",
    equipment: "Barbell",
    description:
      "Strengthens the upper back and lats.",
  },
  {
    id: 7,
    name: "Bicep Curl",
    muscle: "Biceps",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    description:
      "An isolation exercise for the biceps.",
  },
  {
    id: 8,
    name: "Tricep Pushdown",
    muscle: "Triceps",
    difficulty: "Beginner",
    equipment: "Cable",
    description:
      "Targets the triceps with controlled resistance.",
  },
  {
    id: 9,
    name: "Lateral Raise",
    muscle: "Shoulders",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    description:
      "Builds the lateral deltoids for wider shoulders.",
  },
  {
    id: 10,
    name: "Leg Press",
    muscle: "Legs",
    difficulty: "Beginner",
    equipment: "Machine",
    description:
      "A controlled machine exercise for the lower body.",
  },
  {
    id: 11,
    name: "Pull Ups",
    muscle: "Back",
    difficulty: "Advanced",
    equipment: "Bodyweight",
    description:
      "Excellent compound movement for the back and arms.",
  },
  {
    id: 12,
    name: "Push Ups",
    muscle: "Chest",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    description:
      "A simple bodyweight exercise for chest and triceps.",
  },
];

const ExerciseLibrary = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("All");
  const [difficulty, setDifficulty] =
    useState("All");

  const muscles = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Biceps",
    "Triceps",
  ];

  const difficulties = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch =
        exercise.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesMuscle =
        muscle === "All" ||
        exercise.muscle === muscle;

      const matchesDifficulty =
        difficulty === "All" ||
        exercise.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesMuscle &&
        matchesDifficulty
      );
    });
  }, [search, muscle, difficulty]);

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 text-white md:p-10">

      {/* Header */}

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Exercise Library
            </h1>

            <p className="mt-2 text-gray-400">
              Explore exercises and build your
              perfect workout.
            </p>

            {user.goal && (
              <p className="mt-3 text-sm text-yellow-400">
                Goal: {user.goal}
              </p>
            )}

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Back to Dashboard
          </button>

        </div>

        {/* Search */}

        <div className="mt-10">

          <div className="relative">

            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search exercises..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none transition placeholder:text-gray-300 focus:border-yellow-400"
            />

          </div>

        </div>

        {/* Filters */}

        <div className="mt-6 flex flex-wrap gap-3">

          {muscles.map((item) => (

            <button
              key={item}
              onClick={() => setMuscle(item)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                muscle === item
                  ? "bg-yellow-400 text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        <div className="mt-4 flex flex-wrap gap-3">

          {difficulties.map((item) => (

            <button
              key={item}
              onClick={() =>
                setDifficulty(item)
              }
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                difficulty === item
                  ? "bg-green-400 text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* Result Count */}

        <div className="mt-8">

          <p className="text-gray-500">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredExercises.length}
            </span>{" "}
            exercises
          </p>

        </div>

        {/* Exercise Grid */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredExercises.map(
            (exercise) => (

              <div
                key={exercise.id}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40"
              >

                {/* Icon */}

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
                    <FaDumbbell className="text-2xl text-yellow-400" />
                  </div>

                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                      exercise.difficulty ===
                      "Beginner"
                        ? "bg-green-500/10 text-green-400"
                        : exercise.difficulty ===
                            "Intermediate"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {exercise.difficulty}
                  </span>

                </div>

                {/* Content */}

                <h2 className="mt-6 text-2xl font-bold">
                  {exercise.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {exercise.description}
                </p>

                {/* Tags */}

                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="rounded-lg bg-white/5 px-3 py-1 text-xs text-gray-400">
                    {exercise.muscle}
                  </span>

                  <span className="rounded-lg bg-white/5 px-3 py-1 text-xs text-gray-400">
                    {exercise.equipment}
                  </span>

                </div>

                {/* Button */}

                <button
                  onClick={() =>
                    navigate(
                      `/workout-session?exercise=${exercise.id}`
                    )
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-300"
                >
                  <FaPlay />
                  Start Exercise
                </button>

              </div>

            )
          )}

        </div>

        {/* Empty State */}

        {filteredExercises.length === 0 && (

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

            <FaDumbbell className="mx-auto text-5xl text-gray-700" />

            <h2 className="mt-5 text-xl font-bold text-white">
              No exercises found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default ExerciseLibrary;