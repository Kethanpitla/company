import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login";
import Exercises from "../pages/Exercises";
import Signup from "../pages/Signup";
import Gender from "../pages/Gender";
import PhysicalInfo from "../pages/PhysicalInfo";
import Goal from "../pages/Goal";
import Experience from "../pages/Experience";
import WorkoutDays from "../pages/WorkoutDays";
import WorkoutLocation from "../pages/WorkoutLocation";
import Health from "../pages/Health";
import Diet from "../pages/Diet";
import Budget from "../pages/Budget";
import UploadPhoto from "../pages/UploadPhoto";
import LoadingPlan from "../pages/LoadingPlan";
import Dashboard from "../pages/Dashboard";
import Loading from "../pages/Loading";
import ExerciseLibrary from "../pages/ExerciseLibrary";
import WorkoutSession from "../pages/WorkoutSession";
import DietPlanner from "../pages/DietPlanner";
import ExerciseDetails from "../pages/ExerciseDetails";
import Progress from "../pages/Progress";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const AppRouter = () => {
  return (
    <Routes>

      {/* Default */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
      <Route
        path="/progress"
        element={<DashboardLayout><Progress /></DashboardLayout>}
      />
      <Route
        path="/exercises"
        element={<DashboardLayout><Exercises /></DashboardLayout>}
      />
<Route
  path="/exercise/:id"
  element={<ExerciseDetails />}
/>

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Onboarding */}

      <Route
        path="/gender"
        element={<Gender />}
      />

      <Route
        path="/physical-info"
        element={<PhysicalInfo />}
      />

      <Route
        path="/goal"
        element={<Goal />}
      />

      <Route
        path="/experience"
        element={<Experience />}
      />

      <Route
        path="/workout-days"
        element={<WorkoutDays />}
      />

      <Route
        path="/workout-location"
        element={<WorkoutLocation />}
      />

      <Route
        path="/health"
        element={<Health />}
      />

      <Route
        path="/diet"
        element={<Diet />}
      />

      <Route
        path="/budget"
        element={<Budget />}
      />

      <Route
        path="/upload-photo"
        element={<UploadPhoto />}
      />

      <Route
        path="/loading-plan"
        element={<LoadingPlan />}
      />

      <Route
        path="/loading"
        element={<Loading />}
      />

      {/* Main App */}

      <Route
        path="/dashboard"
        element={<DashboardLayout><Dashboard /></DashboardLayout>}
      />

      <Route
        path="/exercise-library"
        element={<DashboardLayout><ExerciseLibrary /></DashboardLayout>}
      />

      <Route
        path="/workout-session"
        element={<WorkoutSession />}
      />

      <Route
        path="/diet-planner"
        element={<DashboardLayout><DietPlanner /></DashboardLayout>}
      />

      {/* 404 */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRouter;