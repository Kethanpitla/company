import { FaArrowLeft } from "react-icons/fa";

type Props = {
  onClick: () => void;
};

const BackButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white hover:border-yellow-400 hover:text-yellow-400 transition"
    >
      <FaArrowLeft />
      Back
    </button>
  );
};

export default BackButton;