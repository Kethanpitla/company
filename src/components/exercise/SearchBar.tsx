interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search exercises..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-yellow-500/20 bg-white/5 px-6 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-yellow-400"
    />
  );
};

export default SearchBar;