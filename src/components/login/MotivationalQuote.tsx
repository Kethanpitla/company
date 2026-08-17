import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [

  "Discipline Beats Motivation.",

  "Train Like A Beast.",

  "No Pain No Gain.",

  "Every Rep Counts.",

  "Become Stronger Everyday.",

];

const MotivationalQuote = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setIndex((prev) => (prev + 1) % quotes.length);

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="h-14">

      <AnimatePresence mode="wait">

        <motion.h2

          key={quotes[index]}

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            y: -20,
          }}

          transition={{
            duration: .5,
          }}

          className="text-2xl font-semibold text-yellow-400"
        >
          {quotes[index]}
        </motion.h2>

      </AnimatePresence>

    </div>

  );

};

export default MotivationalQuote;