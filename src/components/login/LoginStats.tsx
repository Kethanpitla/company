import { motion } from "framer-motion";
import { FaUsers, FaDumbbell, FaFire } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    value: "150K+",
    title: "Users",
  },
  {
    icon: <FaDumbbell />,
    value: "12M+",
    title: "Workouts",
  },
  {
    icon: <FaFire />,
    value: "98%",
    title: "Success",
  },
];

const LoginStats = () => {
  return (
    <div className="grid grid-cols-3 gap-5">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * .4,
          }}
          className="rounded-2xl border border-yellow-400/10 bg-white/5 backdrop-blur-xl p-5 shadow-lg"
        >
          <div className="text-yellow-400 text-2xl">
            {item.icon}
          </div>

          <h1 className="text-white text-2xl font-bold mt-4">
            {item.value}
          </h1>

          <p className="text-gray-400 mt-1">
            {item.title}
          </p>

        </motion.div>

      ))}

    </div>
  );
};

export default LoginStats;