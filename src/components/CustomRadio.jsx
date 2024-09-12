const CustomRadio = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className="flex gap-6 items-center">
      {options.map((option, index) => (
        <label
          key={index}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center ${
              selectedValue === option.value ? "border-[#021526]" : ""
            }`}
          >
            {selectedValue === option.value && (
              <span className="w-2 h-2 rounded-full bg-[#021526]"></span>
            )}
          </span>
          <span className="text-sm text-[#021526]">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadio;
