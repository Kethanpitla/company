import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  LineChart,
  BookOpen,
  User,
  Settings,
  LogOut,
  X,
  Menu
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Workout",
      path: "/workout-session",
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      name: "Diet",
      path: "/diet-planner",
      icon: <Apple className="w-5 h-5" />,
    },
    {
      name: "Progress",
      path: "/dashboard",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      name: "Exercise Library",
      path: "/exercises",
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* MOBILE BUTTON */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(!mobileOpen)
        }
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#231C2E]/80 text-white backdrop-blur-xl lg:hidden"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[#0F172A]/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#15111C]/90 px-5 py-6 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* LOGO */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F2A93B] to-orange-600 shadow-lg shadow-[#F2A93B]/20">

              <Dumbbell className="text-xl text-black" />

            </div>

            <div>

              <h1 className="text-lg font-bold">
                GYM<span className="text-[#F2A93B]">.</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                Fitness OS
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="text-gray-500 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* PROFILE */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#5B8DEF] to-purple-500 font-bold">
              K
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold">
                Fitness Member
              </p>

              <p className="text-xs text-gray-500">
                Stay consistent
              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="mt-8">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-300">
            Main Menu
          </p>

          <nav className="space-y-2">

            {links.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#F2A93B]/10 text-[#F2A93B] shadow-lg shadow-[#F2A93B]/5"
                      : "text-gray-500 hover:bg-white/[0.05] hover:text-white"
                  }`
                }
              >

                <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </span>

                <span>
                  {link.name}
                </span>

              </NavLink>

            ))}

          </nav>

        </div>

        {/* BOTTOM */}

        <div className="mt-auto space-y-2">

          <NavLink
            to="/profile"
            onClick={() =>
              setMobileOpen(false)
            }
            className="flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <User className="w-5 h-5" />
            Profile
          </NavLink>

          <button
            type="button"
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm text-gray-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>

          <div className="my-3 border-t border-white/10" />

          <button
            type="button"
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm text-red-400/70 transition hover:bg-red-400/10 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

          {/* GLASS FOOTER */}

          <div className="mt-4 rounded-2xl border border-[#F2A93B]/10 bg-gradient-to-br from-[#F2A93B]/10 to-[#5B8DEF]/5 p-4">

            <p className="text-xs text-gray-500">
              Keep pushing.
            </p>

            <p className="mt-1 text-sm font-semibold">
              Your future self
              <span className="text-[#F2A93B]">
                {" "}will thank you.
              </span>
            </p>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;