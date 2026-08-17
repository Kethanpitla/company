interface WorkoutSummaryProps {
  exercises: number;
  calories: number;
  duration: string;
}

const WorkoutSummary = ({
  exercises,
  calories,
  duration,
}: WorkoutSummaryProps) => {
  return (
    <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8">

      <h2 className="text-3xl font-bold text-green-400">
        🎉 Workout Complete
      </h2>

      <div className="mt-8 grid grid-cols-3 gap-6">

        <div className="rounded-xl bg-[#0F172A]/50 p-5 text-center">
          <p className="text-gray-400">Exercises</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {exercises}
          </h3>
        </div>

        <div className="rounded-xl bg-[#0F172A]/50 p-5 text-center">
          <p className="text-gray-400">Calories</p>
          <h3 className="mt-2 text-3xl font-bold text-yellow-400">
            {calories}
          </h3>
        </div>

        <div className="rounded-xl bg-[#0F172A]/50 p-5 text-center">
          <p className="text-gray-400">Duration</p>
          <h3 className="mt-2 text-3xl font-bold text-blue-400">
            {duration}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default WorkoutSummary;