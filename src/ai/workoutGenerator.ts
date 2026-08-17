import type {
  Exercise,
  WorkoutDay,
  WorkoutPlan,
} from "../types/workout";
import exercises from "../data/exercises";

type WorkoutGoal =
  | "Gain Muscle"
  | "Lose Fat"
  | "Strength"
  | "Maintain"
  | string;

type WorkoutLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | string;

interface WorkoutGeneratorInput {
  goal: WorkoutGoal;
  level: WorkoutLevel;
  workoutDays: number;
  workoutLocation: string;
  gender?: string;
  age?: number;
}

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const filterExercises = (
  muscleGroup: string,
  level: WorkoutLevel,
  location: string
): Exercise[] => {
  const locationLower = location.toLowerCase();

  let filtered = exercises.filter(
    (exercise) =>
      exercise.muscleGroup.toLowerCase() ===
      muscleGroup.toLowerCase()
  );

  // Home users should preferably get bodyweight exercises.
  if (
    locationLower.includes("home") &&
    filtered.length > 0
  ) {
    const homeExercises = filtered.filter(
      (exercise) =>
        exercise.equipment === "Bodyweight"
    );

    if (homeExercises.length > 0) {
      filtered = homeExercises;
    }
  }

  // Match difficulty when possible.
  const levelExercises = filtered.filter(
    (exercise) =>
      exercise.difficulty.toLowerCase() ===
      level.toLowerCase()
  );

  if (levelExercises.length > 0) {
    filtered = levelExercises;
  }

  return shuffle(filtered);
};

const getExercises = (
  muscleGroups: string[],
  level: WorkoutLevel,
  location: string,
  count = 5
): Exercise[] => {
  const result: Exercise[] = [];

  for (const muscle of muscleGroups) {
    const available = filterExercises(
      muscle,
      level,
      location
    );

    result.push(...available);
  }

  return shuffle(result).slice(0, count);
};

const createWorkoutDay = (
  day: string,
  focus: string,
  muscleGroups: string[],
  level: WorkoutLevel,
  location: string
): WorkoutDay => {
  return {
    day,
    focus,
    exercises: getExercises(
      muscleGroups,
      level,
      location
    ),
  };
};

export const generateWorkoutPlan = ({
  goal,
  level,
  workoutDays,
  workoutLocation,
}: WorkoutGeneratorInput): WorkoutPlan => {
  const days = Math.min(
    Math.max(workoutDays || 3, 1),
    7
  );

  /*
   * MUSCLE GAIN
   */
  if (goal === "Gain Muscle") {
    const splits: WorkoutDay[] = [
      createWorkoutDay(
        "Monday",
        "Chest & Triceps",
        ["Chest", "Triceps"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Tuesday",
        "Back & Biceps",
        ["Back", "Biceps"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Wednesday",
        "Legs",
        ["Legs", "Calves"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Thursday",
        "Shoulders & Core",
        ["Shoulders", "Core"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Friday",
        "Upper Body",
        ["Chest", "Back", "Shoulders"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Saturday",
        "Arms & Core",
        ["Biceps", "Triceps", "Core"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Sunday",
        "Recovery",
        ["Core"],
        level,
        workoutLocation
      ),
    ];

    return {
      days: splits.slice(0, days),
    };
  }

  /*
   * STRENGTH
   */
  if (goal === "Strength") {
    const splits: WorkoutDay[] = [
      createWorkoutDay(
        "Monday",
        "Squat & Legs",
        ["Legs"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Tuesday",
        "Bench & Chest",
        ["Chest"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Wednesday",
        "Back & Deadlift",
        ["Back"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Thursday",
        "Shoulders",
        ["Shoulders"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Friday",
        "Full Body Strength",
        ["Legs", "Chest", "Back"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Saturday",
        "Core & Accessories",
        ["Core", "Shoulders"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Sunday",
        "Recovery",
        ["Core"],
        level,
        workoutLocation
      ),
    ];

    return {
      days: splits.slice(0, days),
    };
  }

  /*
   * FAT LOSS
   */
  if (goal === "Lose Fat") {
    const splits: WorkoutDay[] = [
      createWorkoutDay(
        "Monday",
        "Full Body + Cardio",
        ["Legs", "Chest", "Core"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Tuesday",
        "Cardio & Core",
        ["Cardio", "Core"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Wednesday",
        "Upper Body",
        ["Chest", "Back", "Shoulders"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Thursday",
        "HIIT & Core",
        ["Cardio", "Core"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Friday",
        "Lower Body",
        ["Legs", "Calves"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Saturday",
        "Cardio",
        ["Cardio"],
        level,
        workoutLocation
      ),

      createWorkoutDay(
        "Sunday",
        "Active Recovery",
        ["Core"],
        level,
        workoutLocation
      ),
    ];

    return {
      days: splits.slice(0, days),
    };
  }

  /*
   * MAINTENANCE / DEFAULT
   */
  const splits: WorkoutDay[] = [
    createWorkoutDay(
      "Monday",
      "Full Body",
      ["Chest", "Back", "Legs"],
      level,
      workoutLocation
    ),

    createWorkoutDay(
      "Tuesday",
      "Upper Body",
      ["Chest", "Back", "Shoulders"],
      level,
      workoutLocation
    ),

    createWorkoutDay(
      "Wednesday",
      "Lower Body",
      ["Legs", "Calves"],
      level,
      workoutLocation
    ),

    createWorkoutDay(
      "Thursday",
      "Arms & Core",
      ["Biceps", "Triceps", "Core"],
      level,
      workoutLocation
    ),

    createWorkoutDay(
      "Friday",
      "Full Body",
      ["Legs", "Chest", "Back"],
      level,
      workoutLocation
    ),

    createWorkoutDay(
      "Saturday",
      "Cardio & Core",
      ["Cardio", "Core"],
      level,
      workoutLocation
    ),

    createWorkoutDay(
      "Sunday",
      "Recovery",
      ["Core"],
      level,
      workoutLocation
    ),
  ];

  return {
    days: splits.slice(0, days),
  };
};

export default generateWorkoutPlan;