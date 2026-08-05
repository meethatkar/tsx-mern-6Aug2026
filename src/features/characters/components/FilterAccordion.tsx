import React from 'react';

interface FilterAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  title,
  isOpen,
  onToggle,
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <div className="mb-4 border-b border-slate-800 pb-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 text-left font-semibold text-cyan-400 transition-colors hover:text-cyan-300 focus:outline-none"
      >
        <span className="text-lg font-bold w-4">{isOpen ? '−' : '+'}</span>
        <span>{title}</span>
      </button>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-2 pl-6">
          {options.map((option) => {
            const isChecked = selectedValues.includes(option);
            return (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    if (isChecked) {
                      onChange(selectedValues.filter((v) => v !== option));
                    } else {
                      onChange([...selectedValues, option]);
                    }
                  }}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-800 accent-cyan-400 cursor-pointer focus:ring-0 focus:ring-offset-0"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterAccordion;
