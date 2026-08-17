export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  sets: number;
  reps: string;
  rest: string;
  calories: number;
  image: string;
  duration?: string;
  instructions?: string[];
  tips?: string[];
  mistakes?: string[];
}