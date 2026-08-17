export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  id: number;
  title: string;
  time: string;
  foods: FoodItem[];
}

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
}

export interface DietPlan {
  meals: Meal[];
  nutrition: DailyNutrition;
}