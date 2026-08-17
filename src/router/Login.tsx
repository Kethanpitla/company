import LoginForm from "../components/login/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-[#0F172A]">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#FFD70022,transparent_40%)]" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Transform
            <br />
            Your Body
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-8 max-w-lg">
            Try hard fail hard Try again Fail again Fail better
          </p>
        </div>
      </div>

      {/* Right Section */}

      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
