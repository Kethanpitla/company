import { FaArrowRight } from "react-icons/fa";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const NextButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-300 px-8 py-3 font-semibold text-black transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
    >
      Continue
      <FaArrowRight />
    </button>
  );
};

export default NextButton;