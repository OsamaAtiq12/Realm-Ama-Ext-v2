import React ,{useState}from "react";
import { Modal, Button } from "@heathmont/moon-core-tw";
import Dollar from "./Assets/Dollar";
import Cross from "./Assets/Cross";

const BuyTweetsModal = ({ isOpen, setIsOpen, closeModal, openModal }) => {

    const [count, setCount] = useState(1); // Initial count value

    // Function to handle decrement button click
    const handleDecrement = () => {
      if (count > 1) { // Ensure count doesn't go below 1
        setCount(count - 1);
      }
    };
  
    // Function to handle increment button click
    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    // Calculate the credit count based on the current value of count
    const creditCount = count;
  return (
    <>
      <Modal open={isOpen} onClose={closeModal}>
        <Modal.Backdrop />
        <Modal.Panel>
          <div className="p-4 ">
           <div className="flex justify-between">
           <h3 className="text-moon-18 text-bulma font-medium">
              Index more tweets
            </h3>
           <span className="cursor-pointer" onClick={closeModal}>
           <Cross/>
           </span>
           </div>
          </div>
          <div className="p-4">
            <p className="text-moon-sm text-trunks border-b-2 pb-3 border-beerus">
              Tweets are expensive! Use credits to index more tweets from a X
              profile.
            </p>
            <div className="flex justify-center mt-5">
              <span className="bg-[#E8E2F5] py-[8px] px-[12px] text-[#5C1EDF] font-semibold rounded-[26px] flex items-center gap-2">
                <Dollar /> <span>You have 10 Credits</span>
              </span>
            </div>

            <div className="text-center mt-2">
              You’re on the Free plan.{" "}
              <span className="text-[#5C1EDF] font-normal">Upgrade plan</span>
            </div>

            <div className="text-center  font-semibold mt-4">
              Number of tweets
            </div>

            <div className="flex items-center justify-center space-x-2">
      <button className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded-md" onClick={handleDecrement}>
        -
      </button>
      <div className="border rounded-md px-4 py-2">
        <span className="text-lg">{count}</span>
      </div>
      <button className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-2 rounded-md" onClick={handleIncrement}>
        +
      </button>
     
    </div>
    <p className="text-center text-sm mt-2">{creditCount} Credit{creditCount !== 1 && 's'}</p>
            
          </div>
          <div className="p-4 border-t-2 border-beerus">
            <div className="p-4 flex justify-end">
              <Button
                onClick={closeModal}
                className="bg-[#241E30] rounded-[10px] text-white "
              >
                Buy Tweets
              </Button>
            </div>
          </div>
        </Modal.Panel>
      </Modal>
    </>
  );
};

export default BuyTweetsModal;
