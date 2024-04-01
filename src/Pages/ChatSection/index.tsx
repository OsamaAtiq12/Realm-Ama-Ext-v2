import * as React from "react";
import { useState, useRef } from "react";
import GptTypeDropDown from "../../Components/GptTypeDropDown";
import NewChat from "./Assets/NewChat";
import Share from "./Assets/Share";
import { Input, Textarea } from "@heathmont/moon-core-tw";
import SubmitIcon from "./Assets/SubmitIcon";
import Clipicon from "./Assets/clipicon";
import ShareChatModal from "../../Components/ShareChatModal";

interface ChatSectionProps {}

const presetQuestions: string[] = [
  "What drives your passion for space exploration, and how do you see the future of human settlement beyond Earth?",
  "What do you believe are the most significant challenges humanity will face in the next few decades, and how can technology address them?",
];

function ChatSection(props: ChatSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setInputValue(question);
    setSubmitted(false);
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  };

  const handleSubmit = () => {
    if (selectedQuestion || inputValue) {
      setSubmitted(true);
      setChatMessages([...chatMessages, inputValue]); // Add the submitted message to chat messages
      setInputValue(""); // Clear the input field after submission
    }
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto"; // Reset the height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set the height to match the content
  };

  return (
    <div className="px-8 py-5 bg-white rounded-lg">
      <GptTypeDropDown />

      <div className="border-2 rounded-[16px] p-5 mt-9 min-h-[250px]">
        <div className="flex flex-col items-center justify-center">
          {!submitted && (
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
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-3">
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

      {/* Chat messages */}
      <div className="overflow-y-auto max-h-[200px] mt-3">
        {chatMessages.map((message, index) => (
          <div key={index} className="text-sm text-gray-800 mb-2">
            {message}
          </div>
        ))}
      </div>

      <div className="flex items-center p-2 bg-white relative mt-[20px]">
        <div className="absolute left-[15px] bottom-[19px]  z-5 ">
          <Clipicon />
        </div>

        <Textarea
          ref={textareaRef}
          className="flex-1 focus:ring-0 bg-white px-9  py-0 pt-[13px] h-12"
       
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.target.value);
            adjustTextareaHeight(e.target);
          }}
        />
        <div className="absolute right-[15px] bottom-[15px] z-5 ">
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
