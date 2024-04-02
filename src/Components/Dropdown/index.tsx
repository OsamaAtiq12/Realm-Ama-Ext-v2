import React, { useState } from "react";
import { Dropdown, MenuItem, Chip, Button } from "@heathmont/moon-core-tw";
import { ControlsChevronDownSmall } from "@heathmont/moon-icons-tw";
import Dollar from "./Assets/Dollar";

function CustomDropdown() {
  const [option3, setOption3] = useState({ Credits: "10 Credits" });
  return (
    <div>
      <Dropdown
        value={option3}
        onChange={setOption3}
        className="rounded-[26px]"
      >
        {({ open }) => (
          <>
            <div>
              <div>
                <Dropdown.Trigger>
                  <span>
                    <div className="bg-[#5C1EDF1A] p-[8px] flex gap-1 items-center rounded-[26px]">
                      <span>
                        <Dollar />
                      </span>
                      <span className="text-[#5C1EDF] font-semibold text-[14px] ">
                        10 Credits
                      </span>
                      <span>
                        <ControlsChevronDownSmall
                          className={`text-[#5C1EDF] pl-[6px] text-moon-24 text-trunks ${
                            open && "rotate-180"
                          }`}
                        />
                      </span>
                    </div>
                  </span>
                </Dropdown.Trigger>
              </div>

              <div>
                <Dropdown.Options className="font-semibold bg-white text-[14px]  mr-2 ml-10  ">
                  <Dropdown.Option>
                    <div className="p-4 shadow-md rounded-[8px]">
                      <div className="flex rounded-lg  items-center  bg-[#E8E2F5] p-3 gap-[10px]">
                        <span className="flex-shrink-0">
                          Sign up to earn 50 bonus <br />
                          credits and 10 credits daily.
                        </span>

                        <div>
                          <button className="bg-[#7c3aed] text-white px-[12px] h-[28px] py-3 rounded-md flex items-center justify-center max-w-[61px] whitespace-nowrap">
                            Sign up
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h1 className="text-[22px] font-semibold">
                          You are on the{" "}
                          <span className="text-[#5C1EDF]">Free</span> plan
                        </h1>
                      </div>

                      <div className="text-[#241E30CC] mt-2">
                        You get 10 credits and each image generation uses 1
                        credit. Upgrade to earn more.
                      </div>

                      <div className="flex justify-end">
                        <button className="bg-black basis-[50%]  text-white  py-2 rounded-md">
                          Upgrade
                        </button>
                      </div>
                    </div>
                  </Dropdown.Option>
                </Dropdown.Options>
              </div>
            </div>
          </>
        )}
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;
