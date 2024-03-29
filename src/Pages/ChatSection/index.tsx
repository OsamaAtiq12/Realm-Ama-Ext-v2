import * as React from "react";
import { useState } from "react";
import GptTypeDropDown from "../../Components/GptTypeDropDown";
import NewChat from "./Assets/NewChat";
import Share from "./Assets/Share";
import { Input } from "@heathmont/moon-core-tw";
import SubmitIcon from "./Assets/SubmitIcon";
import Clipicon from "./Assets/clipicon";
import ShareChatModal from "../../Components/ShareChatModal";

interface ChatSectionProps {}

const presetQuestions: string[] = [
  "What drives your passion for space exploration, and how do you see the future of human settlement beyond Earth?",
  "What do you believe are the most significant challenges humanity will face in the next few decades, and how can technology address them?",
  "What advice would you give to aspiring entrepreneurs who are looking to make a significant impact in the world with their ventures?"
];

function ChatSection(props: ChatSectionProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string>(""); // State to track selected question
  const [inputValue, setInputValue] = useState<string>(""); // State to track input field value
  const [submitted, setSubmitted] = useState<boolean>(false); // State to track submission
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question); // Set selected question
    setInputValue(question); // Set input field value to the selected question
    setSubmitted(false); // Reset submission state
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    if (selectedQuestion || inputValue) {
      setSubmitted(true); // Set submission state to true if a question is selected or input value is provided
    }
  };

  return (
    <div className="px-8 py-5 bg-white rounded-lg">
      <GptTypeDropDown />

      <div className="border-2 rounded-[16px] p-5 mt-9 min-h-[250px]">
        <div className="flex flex-col items-center justify-center">
          {!submitted && ( // Render if submission hasn't occurred
            <div>
              <h1 className="text-[18px] font-semibold">Ask Elon Anything</h1>
              <span className="text-[12px] font-normal">
                Elon Musk will respond solely based on his shared Tweets.
              </span>

              <div className="mt-[20px]">
                {presetQuestions.map((question, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        selectedQuestion === question ? "#5C1EDF" : "#E8E2F5",
                      color:
                        selectedQuestion === question ? "white" : "initial",
                    }}
                    className="max-w-[250px] text-[12px] font-normal p-[12px] rounded-[8px] mb-3 cursor-pointer"
                    onClick={() => handleQuestionClick(question)} // Handle click on question
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-12">
        <div className="bg-[#ECEBEC] text-[12px] font-semibold flex items-center py-1 px-[7px] rounded-[28px]">
          <div className="flex items-center gap-[3px]">
            <span>
              <NewChat />
            </span>{" "}
            <span className="cursor-pointer">Start new chat</span>
          </div>
        </div>
        <div className="bg-[#ECEBEC] text-[12px] font-semibold flex items-center py-1 px-[7px] rounded-[28px]">
          <div className="flex items-center gap-[3px]">
            <span>
              <Share />
            </span>{" "}
            <span onClick={openModal} className="cursor-pointer">
              Share chat
            </span>
            <ShareChatModal
              openModal={openModal}
              closeModal={closeModal}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center p-2 bg-white relative   mt-[20px]">
        <div className="absolute left-4 z-5 ">
          <Clipicon />
        </div>

        <Input
          className="flex-1 focus:ring-0 bg-white px-8 "
          placeholder="Ask a question..."
          type="text"
          value={inputValue} // Set input field value
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          } // Handle input field change
        />
        <div className="absolute right-4 z-5 ">
          <button
            className={`bg-purple-600 text-white rounded-full p-2 ${
              !inputValue && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!inputValue}
          >
            <SubmitIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
