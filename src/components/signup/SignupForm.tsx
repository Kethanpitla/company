import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  User,
  Mail
} from "lucide-react";
import SocialSignup from "./SocialSignup";

type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupData>();

  const password = watch("password");

const navigate = useNavigate();

const onSubmit = (data: SignupData) => {
  console.log(data);

  setLoading(true);

  setTimeout(() => {
    setLoading(false);

    navigate("/gender");

  }, 1500);
};
  

  return (
    <motion.div
      initial={{ opacity: 0, x: 70, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-lg rounded-3xl p-7 glass-panel glow-on-hover sm:p-9"
    >
      {/* Heading */}

      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-yellow-400">
          Get started
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Create Account
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Create your account and start building a stronger version
          of yourself.
        </p>
      </div>

      {/* Form */}

      <form
        
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-4"
      >
        {/* Name */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Full Name
          </label>

          <div className="flex items-center rounded-xl px-4 glass-input transition">
            <User className="text-sm text-[#5B8DEF] w-5 h-5" />

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must contain at least 2 characters",
                },
              })}
              className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-300"
            />
          </div>

          {errors.name && (
            <p className="mt-1 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Email Address
          </label>

          <div className="flex items-center rounded-xl px-4 glass-input transition">
            <Mail className="text-lg text-[#5B8DEF] w-5 h-5" />

            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-300"
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Password
          </label>

          <div className="flex items-center rounded-xl px-4 glass-input transition">
            <Lock className="text-sm text-[#5B8DEF] w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
              className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-500 transition hover:text-yellow-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl px-4 glass-input transition">
            <Lock className="text-sm text-[#5B8DEF] w-5 h-5" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-300"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="text-gray-500 transition hover:text-yellow-400"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}

        <label className="flex cursor-pointer items-start gap-3 pt-1 text-xs leading-5 text-gray-400">
          <input
            type="checkbox"
            required
            className="mt-1 accent-yellow-400"
          />

          <span>
            I agree to the{" "}
            <span className="text-yellow-400">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-yellow-400">
              Privacy Policy
            </span>
          </span>
        </label>

        {/* Button */}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5B8DEF] to-purple-500 py-3.5 font-bold text-white transition hover:shadow-[0_0_20px_rgba(91,141,239,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account

              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5 w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>

      {/* Divider */}

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />

        <span className="text-xs text-gray-300">
          OR
        </span>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Social */}

      <SocialSignup />

      {/* Login */}

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-yellow-400 transition hover:text-yellow-300"
        >
          Login
        </a>
      </p>
    </motion.div>
  );
};

export default SignupForm;