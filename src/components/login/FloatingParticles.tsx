import { motion } from "framer-motion";

const particles = [...Array(80)];

const FloatingParticles = () => {
  return (
    <>
      {particles.map((_, index) => (
        <motion.div
          key={index}
          initial={{
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 12,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
          }}
          className="absolute rounded-full bg-yellow-400/20 blur-sm"
        />
      ))}
    </>
  );
};

export default FloatingParticles;