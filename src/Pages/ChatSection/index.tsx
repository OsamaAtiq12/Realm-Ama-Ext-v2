import * as React from "react";
import { useState, useRef } from "react";
import GptTypeDropDown from "../../Components/GptTypeDropDown";
import NewChat from "./Assets/NewChat";
import Share from "./Assets/Share";
import { Input, Textarea } from "@heathmont/moon-core-tw";
import SubmitIcon from "./Assets/SubmitIcon";
import Clipicon from "./Assets/clipicon";
import ShareChatModal from "../../Components/ShareChatModal";
import ChatLoading from "../../Components/ChatLoading";

interface ChatSectionProps {}

const presetQuestions: string[] = [
  "What drives your passion for space exploration, and how do you see the future of human settlement beyond Earth?",
  "What do you believe are the most significant challenges humanity will face in the next few decades, and how can technology address them?",
  "What advice would you give to aspiring entrepreneurs who are looking to make a significant impact in the world with their ventures?",
];

function ChatSection(props: ChatSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setInputValue(question);
    setSubmitted(false);
    adjustTextAreaHeight(question); // Call adjustTextAreaHeight function here
  };

  const adjustTextAreaHeight = (value: string) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      setTimeout(() => {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        if (value === "") {
          textareaRef.current.style.height = "48px";
        }
      }, 0);
    }
  };
  const handleSubmit = () => {
    if (selectedQuestion || inputValue) {
      setSubmitted(true);
      const newChatMessages = [...chatMessages, inputValue];
      setChatMessages(newChatMessages); // Add the submitted message to chat messages
      setInputValue(""); // Clear the input field after submission

      // Set loading state for the new message
      setLoadingStates([...loadingStates, true]);

      // Simulate loading for 2 seconds
      setTimeout(() => {
        // Find the index of the last added message
        const index = newChatMessages.length - 1;
        // Update loading state for the corresponding message
        setLoadingStates((loadingStates) => {
          const newLoadingStates = [...loadingStates];
          newLoadingStates[index] = false;
          return newLoadingStates;
        });
      }, 2000);
    }
  };

  return (
    <div className="px-8 py-5 bg-white rounded-lg">
      <GptTypeDropDown />

      <div
        className={`${
          !submitted ? "border-2" : ""
        } rounded-[16px] p-5 mt-2 h-[440px] overflow-auto`}
      >
        {/* Chat messages */}
        {chatMessages.map((message, index) => (
          <div key={index}>
            <div className="flex justify-end">
              <div className="text-sm mb-2 text-left p-3 inline-block  text-white font-normal text-[12px] bg-[#5C1EDF] border rounded-tl-lg rounded-tr-lg rounded-bl-lg relative">
                {message}
              </div>
            </div>
            {/* Loading indicator for each message */}
            {loadingStates[index] && (
              <div className="flex items-center justify-start mt-6">
                <img
                  className="h-6 w-6 rounded-full mr-2"
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlTNRaX-J4l3Uj-RbSU5vvsZtpioufqc9yw&usqp=CAU"
                  }
                  alt=""
                />{" "}
                <ChatLoading />{" "}
                {/* Assuming ChatLoading component is responsive */}
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col items-center justify-center">
          {!submitted && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[18px] font-semibold">Ask Elon Anything</h1>
              <span className="text-[12px] font-normal">
                Elon Musk will respond solely based on his
              </span>

              <span className="text-[12px] font-normal">shared Tweets.</span>
              <div className="mt-[20px]">
                {presetQuestions.map((question, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        selectedQuestion === question ? "#5C1EDF" : "#E8E2F5",
                      color:
                        selectedQuestion === question ? "white" : "#5C1EDF",
                    }}
                    className="max-w-[250px] text-[12px]  font-normal p-[12px] rounded-[8px] mb-3 cursor-pointer"
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

      {/* Input field for new messages */}
      <div className="flex items-center p-2 bg-white relative mt-[20px]">
        <div className="absolute left-[12px] bottom-[19px]  z-5 ">
          <Clipicon />
        </div>

        <Textarea
          ref={textareaRef}
          placeholder="Ask Elon a Question"
          className="flex-1 focus:outline-0 focus:outline-[#5C1EDF] text-[#241E30] outline-0 bg-white px-7 py-0 pt-[13px] overflow-hidden"
          style={{ minHeight: "48px", height: inputValue ? "auto" : "48px" }}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
            if (e.target.value === "") {
              e.target.style.height = "48px";
            }
          }}
        />

        <div className="absolute right-[12px] bottom-[15px] z-5 ">
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
