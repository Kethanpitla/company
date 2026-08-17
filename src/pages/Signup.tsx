import AnimatedBackground from "../components/login/AnimatedBackground";
import FloatingParticles from "../components/login/FloatingParticles";
import MouseGlow from "../components/login/MouseGlow";
import SignupHero from "../components/signup/SignupHero";
import SignupForm from "../components/signup/SignupForm";

const Signup = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <AnimatedBackground />

      <FloatingParticles />

      <MouseGlow />

      <div className="relative z-20 flex min-h-screen">
        <SignupHero />

        <div className="flex flex-1 items-center justify-center p-5 sm:p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;