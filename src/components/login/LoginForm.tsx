import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail
} from "lucide-react";
import SocialLogin from "./SocialLogin";
import {Link, useNavigate} from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log(data);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/gender");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md rounded-3xl p-10 glass-panel glow-on-hover"
    >
      <h1 className="text-4xl font-bold text-white">
            Welcome Back 
      </h1>

      <p className="mt-2 text-gray-400">
        Login to continue your fitness journey.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-6"
      >
        {/* EMAIL */}

        <div>
          <label className="text-gray-300 text-sm">
            Email Address
          </label>

          <div className="mt-2 flex items-center rounded-xl px-4 glass-input transition">
            <Mail className="text-[#5B8DEF] w-5 h-5" />

            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full bg-transparent p-4 text-white outline-none"
            />
          </div>

          <p className="mt-1 text-red-400 text-sm">
            {errors.email?.message}
          </p>
        </div>

        {/* PASSWORD */}

        <div>
          <label className="text-gray-300 text-sm">
            Password
          </label>

          <div className="mt-2 flex items-center rounded-xl px-4 glass-input transition">
            <Lock className="text-[#5B8DEF] w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full bg-transparent p-4 text-white outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <p className="mt-1 text-red-400 text-sm">
            {errors.password?.message}
          </p>
        </div>

        {/* OPTIONS */}

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" />

            Remember Me
          </label>

          <button
            type="button"
            className="text-yellow-400 hover:text-yellow-300"
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: .97,
          }}
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5B8DEF] to-purple-500 py-4 font-bold text-white transition hover:shadow-[0_0_20px_rgba(91,141,239,0.4)]"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-black border-t-transparent" />
          ) : (
            <>
              LOGIN

              <ArrowRight className="transition group-hover:translate-x-2 w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-white/10" />

        <span className="px-4 text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      <SocialLogin />

      <p className="mt-8 text-center text-gray-400">
  Don't have an account?{" "}
  <Link
    to="/signup"
    className="font-semibold text-yellow-400 transition-colors duration-300 hover:text-yellow-300"
  >
    Create Account
  </Link>
</p>
    </motion.div>
  );
};

export default LoginForm;
