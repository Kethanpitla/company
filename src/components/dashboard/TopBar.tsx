import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useUser } from "../../context/UserContext";

const TopBar = () => {
  const { user } = useUser();

  const firstName =
    user.name?.split(" ")[0] || "Athlete";

  return (
    <header className="relative z-30">

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#231C2E]/70 p-4 shadow-xl shadow-black/20 backdrop-blur-2xl sm:p-5 lg:flex-row lg:items-center lg:justify-between">

        {/* GREETING */}

        <div className="pl-12 lg:pl-0">

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#F2A93B]">
            Fitness Dashboard
          </p>

          <h2 className="mt-1 text-xl font-bold sm:text-2xl">
            Good to see you, {firstName} 👋
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Let's make today count.
          </p>

        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-3">

          {/* SEARCH */}

          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl md:flex">

            <Search className="w-4 h-4 text-gray-300" />

            <input
              type="text"
              placeholder="Search..."
              className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-gray-300"
            />

          </div>

          {/* MOBILE SEARCH */}

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-[#5B8DEF]/30 hover:bg-[#5B8DEF]/10 hover:text-[#5B8DEF] md:hidden"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* NOTIFICATION */}

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-400 backdrop-blur-xl transition hover:border-[#F2A93B]/30 hover:bg-[#F2A93B]/10 hover:text-[#F2A93B]"
          >

            <Bell className="w-5 h-5" />

            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#F2A93B] shadow-lg shadow-[#F2A93B]/50" />

          </button>

          {/* PROFILE */}

          <button
            type="button"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-xl transition hover:bg-white/[0.08]"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B8DEF] to-purple-500 text-sm font-bold text-white">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left sm:block">

              <p className="max-w-24 truncate text-sm font-semibold">
                {user.name || "Athlete"}
              </p>

              <p className="text-[10px] text-gray-300">
                {user.goal || "Fitness"}
              </p>

            </div>

            <ChevronDown className="hidden w-3 h-3 text-gray-300 sm:block" />

          </button>

        </div>

      </div>

    </header>
  );
};

export default TopBar;