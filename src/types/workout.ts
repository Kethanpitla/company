export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  sets: number;
  reps: string;
  rest: string;
  difficulty: string;
  calories: number;
  duration?: string;
  image: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  days: WorkoutDay[];
}