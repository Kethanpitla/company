import {
  FaDumbbell,
  FaWeight,
  FaTint,
  FaUtensils,
  FaFire,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaDumbbell />,
    title: "Completed Chest Workout",
    time: "Today • 8:15 AM",
    color: "text-yellow-400",
  },
  {
    icon: <FaWeight />,
    title: "Updated Weight to 72 kg",
    time: "Yesterday",
    color: "text-green-400",
  },
  {
    icon: <FaUtensils />,
    title: "Meal Plan Completed",
    time: "Yesterday",
    color: "text-orange-400",
  },
  {
    icon: <FaTint />,
    title: "Water Goal Achieved",
    time: "2 Days Ago",
    color: "text-cyan-400",
  },
  {
    icon: <FaFire />,
    title: "7 Day Workout Streak",
    time: "This Week",
    color: "text-red-400",
  },
];

const RecentActivity = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-[#111] p-5 transition hover:bg-white/5"
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-xl ${activity.color}`}
              >
                {activity.icon}
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {activity.time}
                </p>

              </div>

            </div>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
              Completed
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivity;