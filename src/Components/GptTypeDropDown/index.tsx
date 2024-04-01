import * as React from "react";
import { useState } from "react";
import Gpt3 from "./Assets/Gpt3";
import Gpt4 from "./Assets/Gpt4";
import { Dropdown, MenuItem } from "@heathmont/moon-core-tw";

interface Option {
  type: string;
  description: string;
  icon: JSX.Element;
}

const Options: Option[] = [
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

function GptTypeDropDown() {
  const [option, setOption] = useState<string>("GPT-3.5");

  return (
    <div>
      <div className="flex justify-center">
        <Dropdown value={option} onChange={setOption} className="w-[140px]">
          {({ open }) => (
            <>
              <Dropdown.Select
                open={open}
                placeholder="Choose an option"
                className="flex items-center bg-[#ECEBEC] rounded-[20px]"
              >
                <div>
                  <div className="flex items-center gap-1">
                    <span>{Options.find((o) => o.type === option)?.icon}</span>
                    <span className="font-semibold">{option}</span>
                  </div>
                </div>
              </Dropdown.Select>
              <Dropdown.HiddenInput name="value" />

              <Dropdown.Options className="bg-white rounded-[8px] p-0 right-[-33px]">
                {Options.map((packages, index) => (
                  <Dropdown.Option value={packages.type} key={index}>
                    {({ selected }) => (
                      <MenuItem
                        selected={selected}
                        className={selected ? "bg-gray-200" : ""}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span>{packages.icon}</span>
                              <span className="self-start font-semibold">
                                {packages.type}
                              </span>
                            </div>
                            <span className="w-[225px] h-[40px]">
                              {packages.description}
                            </span>
                          </div>
                        </div>
                        <div>
                          <input
                            type="radio"
                            value={packages.type}
                            checked={selected}
                            onChange={() => setOption(packages.type)}
                            className="form-radio h-4 w-4 accent-[#5C1EDF]"
                          />
                        </div>
                      </MenuItem>
                    )}
                  </Dropdown.Option>
                ))}
              </Dropdown.Options>
            </>
          )}
        </Dropdown>
      </div>
    </div>
  );
}

export default GptTypeDropDown;
