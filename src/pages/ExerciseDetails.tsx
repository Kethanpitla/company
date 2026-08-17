import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaDumbbell,
  FaCheckCircle,
  FaFire,
  FaClock,
  FaLayerGroup,
  FaInfoCircle,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

interface Exercise {
  id: number;
  name: string;
  muscle: string;
  difficulty: string;
  equipment: string;
  calories: number;
  description: string;
  sets: number;
  reps: string;
  rest: string;
  benefits: string[];
  instructions: string[];
  mistakes: string[];
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
    sets: 4,
    reps: "8–10",
    rest: "90 sec",
    benefits: [
      "Builds lower-body strength",
      "Targets quads and glutes",
      "Improves overall stability",
    ],
    instructions: [
      "Place the barbell securely across your upper back.",
      "Stand with your feet around shoulder-width apart.",
      "Brace your core and lower your body by bending your knees.",
      "Keep your chest up and knees tracking over your toes.",
      "Drive through your feet to return to the starting position.",
    ],
    mistakes: [
      "Allowing the knees to collapse inward",
      "Rounding the lower back",
      "Lifting the heels from the floor",
    ],
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
    sets: 4,
    reps: "8–10",
    rest: "90 sec",
    benefits: [
      "Builds chest strength",
      "Develops triceps",
      "Improves upper-body pushing power",
    ],
    instructions: [
      "Lie flat on the bench with your feet firmly planted.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower the bar toward the middle of your chest.",
      "Keep your elbows controlled throughout the movement.",
      "Press the bar back to the starting position.",
    ],
    mistakes: [
      "Bouncing the bar off the chest",
      "Lifting the hips from the bench",
      "Using uncontrolled movement",
    ],
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
    sets: 4,
    reps: "3–6",
    rest: "2–3 min",
    benefits: [
      "Builds posterior-chain strength",
      "Improves grip strength",
      "Trains multiple muscle groups",
    ],
    instructions: [
      "Stand with the bar over the middle of your feet.",
      "Hinge at the hips and grip the bar.",
      "Brace your core and keep your back neutral.",
      "Drive through your feet while extending your hips.",
      "Lower the bar under control.",
    ],
    mistakes: [
      "Rounding the back",
      "Starting with the bar too far away",
      "Jerking the bar from the floor",
    ],
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
    sets: 3,
    reps: "10–12",
    rest: "60 sec",
    benefits: [
      "Builds back width",
      "Strengthens the lats",
      "Improves pulling strength",
    ],
    instructions: [
      "Sit comfortably and secure your legs.",
      "Grip the bar slightly wider than shoulder width.",
      "Pull the bar toward your upper chest.",
      "Squeeze your shoulder blades together.",
      "Slowly return the bar to the starting position.",
    ],
    mistakes: [
      "Pulling behind the neck",
      "Using excessive momentum",
      "Shrugging the shoulders",
    ],
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
    sets: 3,
    reps: "8–12",
    rest: "75 sec",
    benefits: [
      "Builds shoulder strength",
      "Develops triceps",
      "Improves overhead pressing ability",
    ],
    instructions: [
      "Hold the dumbbells at shoulder height.",
      "Brace your core and keep your back stable.",
      "Press the dumbbells overhead.",
      "Avoid locking out aggressively.",
      "Lower the dumbbells slowly.",
    ],
    mistakes: [
      "Arching the lower back",
      "Using excessive weight",
      "Moving too quickly",
    ],
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
    sets: 3,
    reps: "10–12",
    rest: "60 sec",
    benefits: [
      "Builds biceps",
      "Improves arm strength",
      "Easy to perform with dumbbells",
    ],
    instructions: [
      "Stand upright holding dumbbells at your sides.",
      "Keep your elbows close to your body.",
      "Curl the dumbbells upward.",
      "Squeeze your biceps at the top.",
      "Lower the weights slowly.",
    ],
    mistakes: [
      "Swinging the body",
      "Moving the elbows forward",
      "Using momentum",
    ],
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
    sets: 3,
    reps: "10–15",
    rest: "60 sec",
    benefits: [
      "Builds triceps",
      "Improves arm strength",
      "Supports pressing movements",
    ],
    instructions: [
      "Stand facing the cable machine.",
      "Grip the attachment firmly.",
      "Keep your elbows close to your sides.",
      "Push the handle down until your arms extend.",
      "Return slowly to the starting position.",
    ],
    mistakes: [
      "Moving the elbows excessively",
      "Leaning too far forward",
      "Using momentum",
    ],
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
    sets: 4,
    reps: "10–12",
    rest: "90 sec",
    benefits: [
      "Builds leg strength",
      "Targets quads and glutes",
      "Easy to control for beginners",
    ],
    instructions: [
      "Sit securely in the machine.",
      "Place your feet comfortably on the platform.",
      "Lower the platform under control.",
      "Keep your knees aligned with your feet.",
      "Push the platform back without locking your knees aggressively.",
    ],
    mistakes: [
      "Allowing knees to collapse inward",
      "Lowering beyond comfortable range",
      "Locking the knees aggressively",
    ],
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
    sets: 3,
    reps: "10–15",
    rest: "60 sec",
    benefits: [
      "Builds upper-body strength",
      "Trains chest and triceps",
      "Requires no equipment",
    ],
    instructions: [
      "Place your hands slightly wider than shoulder width.",
      "Keep your body in a straight line.",
      "Lower your chest toward the floor.",
      "Keep your core engaged.",
      "Push back up to the starting position.",
    ],
    mistakes: [
      "Dropping the hips",
      "Flaring the elbows excessively",
      "Performing half repetitions",
    ],
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
    sets: 3,
    reps: "30–60 sec",
    rest: "45 sec",
    benefits: [
      "Strengthens the core",
      "Improves stability",
      "Supports posture",
    ],
    instructions: [
      "Place your forearms on the floor.",
      "Extend your legs behind you.",
      "Keep your body in a straight line.",
      "Brace your abdominal muscles.",
      "Hold the position while breathing normally.",
    ],
    mistakes: [
      "Dropping the hips",
      "Raising the hips too high",
      "Holding your breath",
    ],
  },
  {
    id: 11,
    name: "Romanian Deadlift",
    muscle: "Legs",
    difficulty: "Intermediate",
    equipment: "Barbell",
    calories: 85,
    description:
      "A hip-hinge movement emphasizing the hamstrings and glutes.",
    sets: 3,
    reps: "8–12",
    rest: "90 sec",
    benefits: [
      "Strengthens hamstrings",
      "Builds glutes",
      "Improves hip-hinge mechanics",
    ],
    instructions: [
      "Stand with the bar close to your legs.",
      "Push your hips backward.",
      "Keep a slight bend in your knees.",
      "Lower the bar while maintaining a neutral spine.",
      "Drive your hips forward to stand.",
    ],
    mistakes: [
      "Rounding the back",
      "Bending the knees too much",
      "Moving the bar away from the legs",
    ],
  },
  {
    id: 12,
    name: "Cable Row",
    muscle: "Back",
    difficulty: "Beginner",
    equipment: "Cable",
    calories: 60,
    description:
      "A horizontal pulling exercise that develops the back and biceps.",
    sets: 3,
    reps: "10–12",
    rest: "60 sec",
    benefits: [
      "Builds back thickness",
      "Strengthens biceps",
      "Improves pulling strength",
    ],
    instructions: [
      "Sit upright with your feet supported.",
      "Grip the cable attachment.",
      "Pull toward your lower ribs.",
      "Squeeze your shoulder blades together.",
      "Return the handle slowly.",
    ],
    mistakes: [
      "Rounding the back",
      "Using excessive momentum",
      "Shrugging the shoulders",
    ],
  },
  {
    id: 13,
    name: "Lateral Raise",
    muscle: "Shoulders",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    calories: 35,
    description:
      "An isolation exercise targeting the lateral deltoids.",
    sets: 3,
    reps: "12–15",
    rest: "60 sec",
    benefits: [
      "Builds shoulder width",
      "Targets lateral deltoids",
      "Improves shoulder appearance",
    ],
    instructions: [
      "Hold light dumbbells at your sides.",
      "Keep a slight bend in your elbows.",
      "Raise your arms out to the sides.",
      "Stop around shoulder height.",
      "Lower the dumbbells slowly.",
    ],
    mistakes: [
      "Using excessive weight",
      "Swinging the dumbbells",
      "Shrugging the shoulders",
    ],
  },
  {
    id: 14,
    name: "Cable Fly",
    muscle: "Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    calories: 45,
    description:
      "A controlled chest isolation exercise using a cable machine.",
    sets: 3,
    reps: "12–15",
    rest: "60 sec",
    benefits: [
      "Targets the chest",
      "Improves muscle control",
      "Provides constant cable tension",
    ],
    instructions: [
      "Set the cable handles around chest height.",
      "Stand in the center with a stable stance.",
      "Bring your hands together in front of your chest.",
      "Squeeze the chest at the center.",
      "Return slowly to the starting position.",
    ],
    mistakes: [
      "Using excessive weight",
      "Bending the elbows too much",
      "Moving too quickly",
    ],
  },
  {
    id: 15,
    name: "Walking Lunges",
    muscle: "Legs",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    calories: 70,
    description:
      "A unilateral lower-body movement targeting legs and glutes.",
    sets: 3,
    reps: "10 each",
    rest: "60 sec",
    benefits: [
      "Improves leg strength",
      "Builds glutes",
      "Improves balance",
    ],
    instructions: [
      "Stand tall with your feet together.",
      "Step forward with one leg.",
      "Lower your back knee toward the floor.",
      "Push through the front foot.",
      "Continue forward with the opposite leg.",
    ],
    mistakes: [
      "Allowing the front knee to collapse inward",
      "Taking unstable steps",
      "Leaning excessively forward",
    ],
  },
  {
    id: 16,
    name: "Mountain Climbers",
    muscle: "Core",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    calories: 65,
    description:
      "A dynamic conditioning exercise that challenges the core and cardio system.",
    sets: 3,
    reps: "30 sec",
    rest: "45 sec",
    benefits: [
      "Improves conditioning",
      "Strengthens the core",
      "Raises heart rate",
    ],
    instructions: [
      "Start in a high plank position.",
      "Bring one knee toward your chest.",
      "Return it while bringing the other knee forward.",
      "Continue alternating legs.",
      "Keep your core tight throughout.",
    ],
    mistakes: [
      "Raising the hips too high",
      "Losing core control",
      "Moving without control",
    ],
  },
];

const ExerciseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const [added, setAdded] = useState(
    user.todayWorkout?.includes(
      exercises.find(
        (exercise) => exercise.id === Number(id)
      )?.name || ""
    ) || false
  );

  const exercise = exercises.find(
    (item) => item.id === Number(id)
  );

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#15111C] px-5 py-8 text-[#F5F0E8]">
        <div className="mx-auto max-w-3xl">

          <button
            type="button"
            onClick={() => navigate("/exercises")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white"
          >
            <FaArrowLeft />
            Back to Exercise Library
          </button>

          <div className="mt-10 rounded-3xl border border-white/10 bg-[#231C2E]/70 p-10 text-center backdrop-blur-2xl">

            <FaDumbbell className="mx-auto text-3xl text-gray-300" />

            <h1 className="mt-4 text-xl font-bold">
              Exercise not found
            </h1>

            <p className="mt-2 text-sm text-gray-300">
              This exercise does not exist in the library.
            </p>

          </div>
        </div>
      </div>
    );
  }

  const toggleWorkout = () => {
    const currentWorkout =
      user.todayWorkout || [];

    if (currentWorkout.includes(exercise.name)) {
      updateUser({
        todayWorkout: currentWorkout.filter(
          (name) => name !== exercise.name
        ),
      });

      setAdded(false);
    } else {
      updateUser({
        todayWorkout: [
          ...currentWorkout,
          exercise.name,
        ],
      });

      setAdded(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#15111C] text-[#F5F0E8]">

      <main className="mx-auto max-w-6xl p-5 sm:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/exercises")}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
        >
          <FaArrowLeft />
          Exercise Library
        </button>

        {/* HERO */}

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl sm:p-8">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#5B8DEF]/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#F2A93B]/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5B8DEF]/10 text-2xl text-[#5B8DEF]">
                  <FaDumbbell />
                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-[#5B8DEF]">
                    Exercise Details
                  </p>

                  <h1 className="mt-1 text-3xl font-bold">
                    {exercise.name}
                  </h1>

                </div>

              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500">
                {exercise.description}
              </p>

              {/* TAGS */}

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-xl bg-[#5B8DEF]/10 px-3 py-2 text-xs font-semibold text-[#5B8DEF]">
                  {exercise.muscle}
                </span>

                <span className="rounded-xl bg-[#F2A93B]/10 px-3 py-2 text-xs font-semibold text-[#F2A93B]">
                  {exercise.difficulty}
                </span>

                <span className="rounded-xl bg-white/5 px-3 py-2 text-xs text-gray-500">
                  {exercise.equipment}
                </span>

              </div>

              {/* STATS */}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                  <FaLayerGroup className="text-[#5B8DEF]" />

                  <p className="mt-3 text-[10px] text-gray-300">
                    Sets
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {exercise.sets}
                  </p>

                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                  <FaDumbbell className="text-[#F2A93B]" />

                  <p className="mt-3 text-[10px] text-gray-300">
                    Reps
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {exercise.reps}
                  </p>

                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                  <FaClock className="text-[#5B8DEF]" />

                  <p className="mt-3 text-[10px] text-gray-300">
                    Rest
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {exercise.rest}
                  </p>

                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

                  <FaFire className="text-[#F2A93B]" />

                  <p className="mt-3 text-[10px] text-gray-300">
                    Calories
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    ~{exercise.calories}
                  </p>

                </div>

              </div>

            </div>

            {/* ACTION CARD */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">

              <p className="text-xs uppercase tracking-wider text-gray-300">
                Your Workout
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Add this exercise
              </h2>

              <p className="mt-2 text-xs leading-6 text-gray-300">
                Add {exercise.name} to your current workout plan.
                It will be saved to your profile.
              </p>

              <button
                type="button"
                onClick={toggleWorkout}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-bold transition ${
                  added
                    ? "bg-green-400/10 text-green-400"
                    : "bg-[#F2A93B] text-black hover:bg-[#ffc15b]"
                }`}
              >
                <FaCheckCircle />

                {added
                  ? "Added to Workout"
                  : "Add to Today's Workout"}
              </button>

              {user.todayWorkout &&
                user.todayWorkout.length > 0 && (
                  <p className="mt-4 text-center text-[10px] text-gray-300">
                    {user.todayWorkout.length} exercise
                    {user.todayWorkout.length !== 1
                      ? "s"
                      : ""}{" "}
                    in today's workout
                  </p>
                )}

            </div>

          </div>

        </section>

        {/* CONTENT */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* HOW TO PERFORM */}

          <section className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B8DEF]/10 text-[#5B8DEF]">
                <FaDumbbell />
              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider text-gray-300">
                  Technique
                </p>

                <h2 className="text-lg font-bold">
                  How to Perform
                </h2>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              {exercise.instructions.map(
                (instruction, index) => (
                  <div
                    key={instruction}
                    className="flex gap-4"
                  >

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#5B8DEF]/10 text-xs font-bold text-[#5B8DEF]">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-sm leading-6 text-gray-500">
                      {instruction}
                    </p>

                  </div>
                )
              )}

            </div>

          </section>

          {/* BENEFITS */}

          <section className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2A93B]/10 text-[#F2A93B]">
                <FaFire />
              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider text-gray-300">
                  Training Benefits
                </p>

                <h2 className="text-lg font-bold">
                  Why Do This Exercise?
                </h2>

              </div>

            </div>

            <div className="mt-6 space-y-3">

              {exercise.benefits.map(
                (benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3"
                  >

                    <FaCheckCircle className="shrink-0 text-green-400" />

                    <span className="text-sm text-gray-500">
                      {benefit}
                    </span>

                  </div>
                )
              )}

            </div>

          </section>

          {/* COMMON MISTAKES */}

          <section className="rounded-3xl border border-red-400/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
                <FaInfoCircle />
              </div>

              <div>

                <p className="text-[10px] uppercase tracking-wider text-gray-300">
                  Avoid These
                </p>

                <h2 className="text-lg font-bold">
                  Common Mistakes
                </h2>

              </div>

            </div>

            <div className="mt-6 space-y-3">

              {exercise.mistakes.map(
                (mistake) => (
                  <div
                    key={mistake}
                    className="rounded-2xl bg-red-400/[0.03] p-3 text-sm text-gray-500"
                  >
                    • {mistake}
                  </div>
                )
              )}

            </div>

          </section>

          {/* PERSONALIZATION */}

          <section className="rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 backdrop-blur-2xl">

            <p className="text-[10px] uppercase tracking-wider text-gray-300">
              Your Profile
            </p>

            <h2 className="mt-2 text-lg font-bold">
              Personalized Context
            </h2>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between rounded-2xl bg-white/[0.03] p-4">

                <span className="text-xs text-gray-300">
                  Goal
                </span>

                <span className="text-xs font-semibold text-[#F2A93B]">
                  {user.goal || "General Fitness"}
                </span>

              </div>

              <div className="flex justify-between rounded-2xl bg-white/[0.03] p-4">

                <span className="text-xs text-gray-300">
                  Experience
                </span>

                <span className="text-xs font-semibold text-[#5B8DEF]">
                  {user.level || "Beginner"}
                </span>

              </div>

              <div className="flex justify-between rounded-2xl bg-white/[0.03] p-4">

                <span className="text-xs text-gray-300">
                  Body Weight
                </span>

                <span className="text-xs font-semibold">
                  {user.weight || 0} kg
                </span>

              </div>

            </div>

          </section>

        </div>

        {/* BOTTOM CTA */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={() => navigate("/exercises")}
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.07] hover:text-white"
          >
            ← Back to Exercise Library
          </button>

          <button
            type="button"
            onClick={toggleWorkout}
            className={`flex-1 rounded-2xl px-5 py-4 text-sm font-bold transition ${
              added
                ? "bg-green-400/10 text-green-400"
                : "bg-[#F2A93B] text-black hover:bg-[#ffc15b]"
            }`}
          >
            {added
              ? "✓ Added to Today's Workout"
              : "+ Add to Today's Workout"}
          </button>

        </div>

      </main>

    </div>
  );
};

export default ExerciseDetails;