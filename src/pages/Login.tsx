import AnimatedBackground from "../components/login/AnimatedBackground";
import FloatingParticles from "../components/login/FloatingParticles";
import MouseGlow from "../components/login/MouseGlow";
import LoginHero from "../components/login/LoginHero";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">

      <AnimatedBackground />

      <FloatingParticles />

      <MouseGlow />

      <div className="relative z-20 flex min-h-screen">

        <LoginHero />

        <div className="flex flex-1 items-center justify-center p-8">

          <LoginForm />

        </div>

      </div>

    </div>
  );
};

export default Login;