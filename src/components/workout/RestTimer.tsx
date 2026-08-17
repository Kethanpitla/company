import { useEffect, useState } from "react";

interface RestTimerProps {
  seconds: number;
}

const RestTimer = ({ seconds }: RestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 text-center">
      <h2 className="text-2xl font-bold text-white">
        Rest Timer
      </h2>

      <p className="mt-6 text-6xl font-bold text-yellow-400">
        {timeLeft}s
      </p>
    </div>
  );
};

export default RestTimer;