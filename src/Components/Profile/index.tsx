import React, { useState } from "react";

import ProgressBar from "../ProgressBar";
import Tweet from "./Assets/tweet";
import Calendar from "./Assets/Calendar";
import BuyTweetsModal from "../BuyTweetsModal";
function Profile() {
  const url = "https://twitter.com/elonmusk";
  const name = url.split("/").pop();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  return (
    <div className="rounded-[8px] bg-[#E6E2E1] mt-[12px] mb-[16px] p-[16px]">
      <div className="flex gap-2 items-center">
        <img
          className="h-12 w-12 rounded-full"
          src={
            "https://s3-alpha-sig.figma.com/img/e995/f598/85db47d776bf48203cc4e94987f45976?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3LBMZBJ1h-jewz5lof69GhhtDBrfzaAbBESer37HdhckqLFzKtgaOOOSvVgv1pz8czBBIPx1i4IeapwKenXhVEJj0yoF3vjUpA5cREI0b74T1ynZ8e7hu1n7FgpAHovsFVl9uA6~B1A8MZldsa~h9MiQKpXJBn54ZNkZo4vghDD1s4yjiCP17P7fEqqcgJCZiuhWbHnZGMmvtnyIOHY1-jrtPrpnblBLF6k~HmrvpCpO83MpEGY-feWWM4ZLAUvB9bw06jziPy6b1UGUL7nnUz-Y~HWSuzStffT6Iib9ckO0CrZx-4cLNVCZ~tfA4tZAeUofDT0~YCX5YGPp3fYVg__"
          }
          alt=""
        />
        <div className="flex flex-col items-center ">
          <span className="text-[16px] font-semibold">{name}</span>

          <span className="text-[#241E30] text-[14px] font-normal">
            @{name}
          </span>
        </div>
      </div>

      <div className="flex flex-col pl-[58px]">
        <div className="flex justify-between">
          <span className="text-[14px] font-semibold text-[#241E30]">Indexed tweets</span>
          <span
            onClick={openModal}
            className="text-[14px] text-[#5C1EDF] underline font-semibold"
          >
            Buy more tweets
          </span>
          <BuyTweetsModal
            openModal={openModal}
            closeModal={closeModal}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
        <div className="mt-2">
          <ProgressBar start={70} end={90} />
        </div>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <div className="flex items-center gap-[5.5px]">
            <Tweet />{" "}
            <span className="text-[14px] font-normal text-[#241E30]">
              300 out of 39.9K tweets
            </span>
          </div>
          <div className="flex items-center gap-[5.5px]">
            <Calendar />
            <span className="text-[14px] font-normal text-[#241E30]">
              Jan 1, 2024 to Mar 1, 2024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
