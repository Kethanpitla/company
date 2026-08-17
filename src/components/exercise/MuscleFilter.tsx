interface MuscleFilterProps {
  selected: string;
  onSelect: (muscle: string) => void;
}

const muscles = [
  "All",
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Core",
  "Cardio",
];

const MuscleFilter = ({
  selected,
  onSelect,
}: MuscleFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {muscles.map((muscle) => (
        <button
          key={muscle}
          onClick={() => onSelect(muscle)}
          className={`rounded-xl px-5 py-3 font-semibold transition ${
            selected === muscle
              ? "bg-yellow-400 text-black"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          {muscle}
        </button>
      ))}
    </div>
  );
};

export default MuscleFilter;