import React, { useState } from "react";
import Gpt3 from "./Assets/Gpt3";
import Gpt4 from "./Assets/Gpt4";

const Options = [
  {
    type: "GPT-3.5",
    description: "Original Chat GPT model. Fast and good at reasoning.",
    icon: <Gpt3 />,
  },
  {
    type: "GPT-4",
    description: "Slightly slow and best at reasoning",
    icon: <Gpt4 />,
  },
];

const GptTypeDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(Options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  return (
    <div className="relative flex justify-center ">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-[243 px] rounded-[20px] border border-gray-300 bg-[#241E300D] text-sm px-4 py-2 shadow-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          <span className="flex items-center gap-1">
            {selectedOption.icon}
            <span className="font-semibold">{selectedOption.type}</span>
          </span>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 12.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-50 top-14 w-[243px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span className="font-semibold">{option.type}</span>
                </div>
                <p className="text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GptTypeDropDown;
