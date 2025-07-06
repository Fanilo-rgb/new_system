type Gender = "male" | "female" | "";

type Props = {
  selected: Gender;
  onChange: (value: Gender) => void;
};

const GenderSelector = ({ selected, onChange }: Props) => {
  const genders: { label: string; value: Gender; color: string }[] = [
    { label: "Homme", value: "male", color: "bg-blue-400" },
    { label: "Femme", value: "female", color: "bg-pink-400" },
  ];

  return (
    <div className="flex gap-4">
      {genders.map(({ label, value, color }) => {
        const isSelected = selected === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className="flex-1 flex bg-gray-100 text-sm p-1 rounded-xl"
          >
            <span className={`
              font-medium rounded-lg border w-full py-2
              transition-all duration-200
              ${isSelected ? `${color} text-white border-transparent` : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
            `}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default GenderSelector;
