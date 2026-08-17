import type { ReactNode } from "react";
import AnimatedBackground from "../login/AnimatedBackground";
import FloatingParticles from "../login/FloatingParticles";
import MouseGlow from "../login/MouseGlow";
import ProgressBar from "./ProgressBar";

type Props = {
  children: ReactNode;
  step: number;
  totalSteps: number;
};

const OnboardingLayout = ({
  children,
  step,
  totalSteps,
}: Props) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0F172A]">

      <AnimatedBackground />

      <FloatingParticles />

      <MouseGlow />

      <div className="relative z-20 flex min-h-screen items-center justify-center p-8">

        <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

          <ProgressBar
            step={step}
            totalSteps={totalSteps}
          />

          <div className="mt-10">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default OnboardingLayout;