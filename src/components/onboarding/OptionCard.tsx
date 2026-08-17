import { motion } from "framer-motion";

type Props = {
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const OptionCard = ({
  title,
  icon,
  selected,
  onClick,
}: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`cursor-pointer rounded-3xl p-8 transition-all glass-panel glow-on-hover
      ${
        selected
          ? "border-[#5B8DEF] bg-[#5B8DEF]/10 shadow-[0_0_20px_rgba(91,141,239,0.3)]"
          : "border-transparent"
      }`}
    >
      <div className="text-6xl text-[#5B8DEF]">
        {icon}
      </div>

      <h2 className="mt-5 text-center text-2xl font-bold text-white">
        {title}
      </h2>
    </motion.div>
  );
};

export default OptionCard;