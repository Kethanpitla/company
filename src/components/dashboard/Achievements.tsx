import { useMemo } from "react";
import {
  FaTrophy,
  FaDumbbell,
  FaFire,
  FaWeight,
  FaTint,
  FaLock,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
}

const Achievements = () => {
  const { user } = useUser();

  const weight =
    Number(user.weight) || 0;

  const workoutDays =
    Number(user.workoutDays) || 4;

  const achievements =
    useMemo<Achievement[]>(
      () => [
        {
          title: "First Workout",
          description:
            "Complete your first workout",
          icon: <FaDumbbell />,
          unlocked: false,
          progress: 0,
        },
        {
          title: "7 Day Warrior",
          description:
            "Maintain a 7-day workout streak",
          icon: <FaFire />,
          unlocked: false,
          progress: 0,
        },
        {
          title: "Weight Goal",
          description:
            "Reach your target weight",
          icon: <FaWeight />,
          unlocked:
            weight > 0 &&
            Number(user.targetWeight) ===
              weight,
          progress:
            weight > 0 &&
            Number(user.targetWeight)
              ? 100
              : 0,
        },
        {
          title: "Hydration Hero",
          description:
            "Hit your hydration target",
          icon: <FaTint />,
          unlocked: false,
          progress: 0,
        },
        {
          title: "Consistency",
          description:
            `Train ${workoutDays} days every week`,
          icon: <FaTrophy />,
          unlocked: false,
          progress: 0,
        },
      ],
      [user, weight, workoutDays]
    );

  const unlockedCount =
    achievements.filter(
      (item) => item.unlocked
    ).length;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#231C2E]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">

      {/* GLOW */}

      <div className="absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-400">

              <FaTrophy />

            </div>

            <div>

              <p className="text-xs uppercase tracking-wider text-purple-400">
                Milestones
              </p>

              <h2 className="mt-1 text-lg font-bold">
                Achievements
              </h2>

            </div>

          </div>

          <div className="rounded-xl bg-purple-400/10 px-3 py-2">

            <p className="text-xs font-semibold text-purple-400">
              {unlockedCount}/
              {achievements.length}
            </p>

          </div>

        </div>

        {/* ACHIEVEMENTS */}

        <div className="mt-6 space-y-3">

          {achievements.map(
            (achievement) => (

              <div
                key={achievement.title}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                  achievement.unlocked
                    ? "border-purple-400/20 bg-purple-400/5"
                    : "border-white/5 bg-white/[0.03]"
                }`}
              >

                {/* ICON */}

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    achievement.unlocked
                      ? "bg-purple-400/10 text-purple-400"
                      : "bg-white/5 text-gray-700"
                  }`}
                >

                  {achievement.unlocked ? (
                    achievement.icon
                  ) : (
                    <FaLock className="text-xs" />
                  )}

                </div>

                {/* INFO */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <p
                      className={`text-sm font-semibold ${
                        achievement.unlocked
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {achievement.title}
                    </p>

                    {achievement.unlocked && (
                      <span className="text-[9px] font-semibold uppercase text-green-400">
                        Unlocked
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-xs text-gray-700">
                    {achievement.description}
                  </p>

                  {/* PROGRESS */}

                  {!achievement.unlocked &&
                    achievement.progress !==
                      undefined && (
                      <div className="mt-2">

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                          <div
                            className="h-full rounded-full bg-purple-400 transition-all"
                            style={{
                              width: `${achievement.progress}%`,
                            }}
                          />

                        </div>

                        <p className="mt-1 text-[9px] text-gray-700">
                          {achievement.progress}%
                        </p>

                      </div>
                    )}

                </div>

              </div>

            )
          )}

        </div>

        {/* FOOTER */}

        <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.03] p-4">

          <div className="flex items-center gap-3">

            <FaTrophy className="text-[#F2A93B]" />

            <div>

              <p className="text-xs font-semibold">
                Keep pushing
              </p>

              <p className="mt-1 text-[10px] text-gray-300">
                More achievements unlock as
                you complete your workouts and
                hit your goals.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Achievements;