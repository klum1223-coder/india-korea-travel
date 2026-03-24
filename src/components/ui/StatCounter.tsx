interface StatCounterProps {
  value: string;
  label: string;
}

export default function StatCounter({ value, label }: StatCounterProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-poppins text-4xl sm:text-5xl font-bold text-secondary leading-none">
        {value}
      </span>
      <span className="mt-2 text-sm sm:text-base text-text-secondary font-medium">
        {label}
      </span>
    </div>
  );
}
