import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaDumbbell,
  FaFire,
  FaHeart,
} from "react-icons/fa";

interface Exercise {
  id: number;
  name: string;
  muscle: string;
  difficulty: string;
  equipment: string;
  calories: number;
  description: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: "Barbell Squat",
    muscle: "Legs",
    difficulty: "Intermediate",
    equipment: "Barbell",
    calories: 80,
    description:
      "A compound lower-body exercise targeting the quads, glutes and hamstrings.",
  },
  {
    id: 2,
    name: "Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    calories: 70,
    description:
      "A compound pushing movement focused on the chest, shoulders and triceps.",
  },
  {
    id: 3,
    name: "Deadlift",
    muscle: "Back",
    difficulty: "Advanced",
    equipment: "Barbell",
    calories: 100,
    description:
      "A powerful compound movement that trains the posterior chain and grip.",
  },
  {
    id: 4,
    name: "Lat Pulldown",
    muscle: "Back",
    difficulty: "Beginner",
    equipment: "Cable",
    calories: 55,
    description:
      "A controlled pulling exercise that targets the latissimus dorsi.",
  },
  {
    id: 5,
    name: "Shoulder Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    calories: 60,
    description:
      "An overhead pressing movement for the shoulders and triceps.",
  },
  {
    id: 6,
    name: "Dumbbell Curl",
    muscle: "Arms",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    calories: 40,
    description:
      "An isolation exercise designed to strengthen the biceps.",
  },
  {
    id: 7,
    name: "Tricep Pushdown",
    muscle: "Arms",
    difficulty: "Beginner",
    equipment: "Cable",
    calories: 40,
    description:
      "A cable isolation movement targeting the triceps.",
  },
  {
    id: 8,
    name: "Leg Press",
    muscle: "Legs",
    difficulty: "Beginner",
    equipment: "Machine",
    calories: 75,
    description:
      "A machine-based lower-body movement focusing on the quads and glutes.",
  },
  {
    id: 9,
    name: "Push Ups",
    muscle: "Chest",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    calories: 50,
    description:
      "A bodyweight pushing exercise for chest, shoulders and triceps.",
  },
  {
    id: 10,
    name: "Plank",
    muscle: "Core",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    calories: 35,
    description:
      "An isometric core exercise that develops stability and endurance.",
  },
];

const muscles = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
];

const Exercises = () => {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [muscle, setMuscle] =
    useState("All");

  const [favorites, setFavorites] =
    useState<number[]>([]);

  const filteredExercises =
    useMemo(() => {
      return exercises.filter(
        (exercise) => {
          const matchesSearch =
            exercise.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesMuscle =
            muscle === "All" ||
            exercise.muscle === muscle;

          return (
            matchesSearch &&
            matchesMuscle
          );
        }
      );
    }, [search, muscle]);

  const toggleFavorite = (
    id: number
  ) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#15111C] text-[#F5F0E8]">

      <main className="mx-auto max-w-7xl p-5 sm:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* HEADER */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

          <div className="relative">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
                <FaDumbbell />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-[#5B8DEF]">
                  Training
                </p>

                <h1 className="mt-1 text-2xl font-bold">
                  Exercise Library
                </h1>

                <p className="mt-1 text-sm text-gray-300">
                  Explore exercises and build
                  your perfect workout.
                </p>

              </div>

            </div>

            {/* SEARCH */}

            <div className="mt-6">

              <div className="relative">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search exercises..."
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-700 focus:border-[#5B8DEF]/30"
                />

              </div>

            </div>

          </div>

        </div>

        {/* FILTERS */}

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">

          {muscles.map((item) => (

            <button
              key={item}
              type="button"
              onClick={() =>
                setMuscle(item)
              }
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition ${
                muscle === item
                  ? "bg-[#F2A93B] text-black"
                  : "border border-white/10 bg-white/[0.03] text-gray-500 hover:bg-white/[0.06]"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* RESULTS */}

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {filteredExercises.map(
            (exercise) => {

              const favorite =
                favorites.includes(
                  exercise.id
                );

              return (
                <div
                  key={exercise.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-5 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-white/20"
                >

                  {/* ICON */}

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
                      <FaDumbbell />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite(
                          exercise.id
                        )
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                        favorite
                          ? "bg-red-400/10 text-red-400"
                          : "bg-white/5 text-gray-700 hover:text-red-400"
                      }`}
                    >
                      <FaHeart />
                    </button>

                  </div>

                  {/* INFO */}

                  <h2 className="mt-5 text-lg font-bold">
                    {exercise.name}
                  </h2>

                  <p className="mt-2 text-xs leading-relaxed text-gray-300">
                    {exercise.description}
                  </p>

                  {/* TAGS */}

                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="rounded-lg bg-[#5B8DEF]/10 px-2.5 py-1 text-[9px] font-semibold text-[#5B8DEF]">
                      {exercise.muscle}
                    </span>

                    <span className="rounded-lg bg-[#F2A93B]/10 px-2.5 py-1 text-[9px] font-semibold text-[#F2A93B]">
                      {exercise.difficulty}
                    </span>

                    <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[9px] text-gray-300">
                      {exercise.equipment}
                    </span>

                  </div>

                  {/* FOOTER */}

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

                    <div className="flex items-center gap-2 text-xs text-gray-300">

                      <FaFire className="text-[#F2A93B]" />

                      ~{exercise.calories} kcal

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/exercise/${exercise.id}`
                        )
                      }
                      className="rounded-xl bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-gray-400 transition hover:bg-[#5B8DEF]/10 hover:text-[#5B8DEF]"
                    >
                      View Exercise
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* EMPTY */}

        {filteredExercises.length ===
          0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#231C2E]/70 p-10 text-center">

            <FaSearch className="mx-auto text-2xl text-gray-700" />

            <h3 className="mt-4 font-semibold">
              No exercises found
            </h3>

            <p className="mt-1 text-xs text-gray-300">
              Try another exercise name or
              muscle group.
            </p>

          </div>
        )}

      </main>

    </div>
  );
};

export default Exercises;