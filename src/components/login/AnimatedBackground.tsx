import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0F172A]">

      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#1E293B]" />

      {/* Golden Glow Top -> Subtle Indigo */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[150px]"
      />

      {/* Orange Glow -> Subtle Violet */}
      <motion.div
        animate={{
          scale: [1.1, 1.4, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[170px]"
      />

      {/* Center Glow -> Subtle Blue */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F172A]/40" />

    </div>
  );
};

export default AnimatedBackground;