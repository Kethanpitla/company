type StepHeaderProps = {
  title: string;
  subtitle: string;
};

const StepHeader = ({ title, subtitle }: StepHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      <p className="mt-3 text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default StepHeader;
