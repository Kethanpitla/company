import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface User {
  // Authentication
  name: string;
  email: string;

  // Onboarding
  gender: string;
  age: number;
  height: number;
  weight: number;
  targetWeight: number;

  // Fitness
  goal: string;
  level: string;
  experience: string;
  trainingYears: number;
  workoutDays: number;
  workoutLocation: string;

  // Health
  healthCondition: string;

  // Diet
  diet: string;
  dietType: string;
  weeklyBudget: string;

  // Calculated data
  bmi: number;

  // Progress
  weightHistory: number[];
  workoutHistory: string[];
  completedExercises: string[];

  // Dashboard tracking
  waterIntake: number;
  currentCalories: number;
  currentProtein: number;
  streak: number;

  // Progress photo
  progressPhoto: string;

  // Optional additional data
  sleepHours: number;
  todayWorkout: string[];
}

const defaultUser: User = {
  name: "",
  email: "",

  gender: "",
  age: 0,
  height: 0,
  weight: 0,
  targetWeight: 0,

  goal: "",
  level: "",
  experience: "",
  trainingYears: 0,
  workoutDays: 0,
  workoutLocation: "",

  healthCondition: "",

  diet: "",
  dietType: "",
  weeklyBudget: "",

  bmi: 0,

  weightHistory: [],
  workoutHistory: [],
  completedExercises: [],

  waterIntake: 0,
  currentCalories: 0,
  currentProtein: 0,
  streak: 0,

  progressPhoto: "",

  sleepHours: 0,
  todayWorkout: [],
};

interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;

  updateUser: (
    data: Partial<User>
  ) => void;

  resetUser: () => void;
}

const UserContext =
  createContext<UserContextType | undefined>(
    undefined
  );

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const savedUser =
        localStorage.getItem("gymUser");

      if (savedUser) {
        return {
          ...defaultUser,
          ...JSON.parse(savedUser),
        };
      }
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );
    }

    return defaultUser;
  });

  useEffect(() => {
    localStorage.setItem(
      "gymUser",
      JSON.stringify(user)
    );
  }, [user]);

  const updateUser = (
    data: Partial<User>
  ) => {
    setUser((previousUser) => ({
      ...previousUser,
      ...data,
    }));
  };

  const resetUser = () => {
    setUser(defaultUser);
    localStorage.removeItem("gymUser");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
};