import * as React from "react";
import { useState, useRef, useEffect } from "react";
import GptTypeDropDown from "../../Components/GptTypeDropDown";
import NewChat from "./Assets/NewChat";
import Share from "./Assets/Share";
import { Textarea } from "@heathmont/moon-core-tw";

import Clipicon from "./Assets/clipicon";
import ShareChatModal from "../../Components/ShareChatModal";
import ChatLoading from "../../Components/ChatLoading";
import Arrow from "./Assets/arrow";
import { data } from "autoprefixer";
import CustomTextArea from "../../Components/TextArea";

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
  const [chatMessages, setChatMessages] = useState<
    { type: string; message: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [botres, setbotres] = useState<string>("");

  const clearChat = () => {
    setChatMessages([]);
  };
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const fileInputRef = useRef(null); // Reference to the file input element

  const handleClipiconClick = () => {
    // Programmatically trigger click on the file input element
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    // Handle file upload logic here
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
  };

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

  function* streamParagraph(paragraph: string): Generator<string, void, unknown> {
    for (let char of paragraph) {
      yield char;
    }
  }
  
  // Example usage:
  const paragraph: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const stream: Generator<string, void, unknown> = streamParagraph(paragraph);
  
  // Iterate over the stream and log each character
  for (let char of stream) {
    console.log(char);
  }
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ama-lnlobhkrga-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "elon musk",
          message: inputValue,
        }),
      });

      const res = await response.json();

      setbotres(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (selectedQuestion || inputValue) {
      setSubmitted(true);
      const newChatMessages = [
        ...chatMessages,
        { type: "user", message: inputValue },
      ];
      setChatMessages(newChatMessages); // Add the submitted message to chat messages
      setInputValue(""); // Clear the input field after submission

      // Set loading state for the new message
      setLoading(true);

      // Call fetchData here
      fetchData()
        .then(() => {
          // After receiving the response, set loading state back to false
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (botres) {
      const newChatMessages = [
        ...chatMessages,
        { type: "bot", message: botres },
      ];
      setChatMessages(newChatMessages);
    }
  }, [botres]);

  return (
    <div className="px-8 py-5 bg-white rounded-lg">
      <GptTypeDropDown />

      <div
        className={`${
          !submitted ? "border-2" : ""
        } rounded-[16px] p-3 mt-2 min-h-[460px]`}
      >
        {chatMessages.map((chatMessage, index) => (
          <div key={index}>
            {chatMessage.type === "user" ? (
              <div className="flex justify-end pt-5 ">

                <div>
                  
                </div>
                <div className="text-sm mb-2 text-left p-3 inline-block  text-white font-normal text-[12px] bg-[#5C1EDF] border rounded-tl-lg rounded-tr-lg rounded-bl-lg relative">
                  {chatMessage.message}
                </div>
              </div>
            ) : (
              <div className="flex justify-start pt-5">
                 <img
              className="h-6 w-6 rounded-full mr-2 mb-[10px] self-end"
              src="https://s3-alpha-sig.figma.com/img/e995/f598/85db47d776bf48203cc4e94987f45976?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3LBMZBJ1h-jewz5lof69GhhtDBrfzaAbBESer37HdhckqLFzKtgaOOOSvVgv1pz8czBBIPx1i4IeapwKenXhVEJj0yoF3vjUpA5cREI0b74T1ynZ8e7hu1n7FgpAHovsFVl9uA6~B1A8MZldsa~h9MiQKpXJBn54ZNkZo4vghDD1s4yjiCP17P7fEqqcgJCZiuhWbHnZGMmvtnyIOHY1-jrtPrpnblBLF6k~HmrvpCpO83MpEGY-feWWM4ZLAUvB9bw06jziPy6b1UGUL7nnUz-Y~HWSuzStffT6Iib9ckO0CrZx-4cLNVCZ~tfA4tZAeUofDT0~YCX5YGPp3fYVg__"
              alt=""
            />
                <div className="text-sm mb-2 text-left p-3 inline-block  text-[#241E30] font-normal text-[12px] bg-[#241E300D] border rounded-tl-lg rounded-tr-lg rounded-br-lg relative">
                  {chatMessage.message}

                 
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center justify-start mt-6">
            <img
              className="h-6 w-6 rounded-full mr-2"
              src="https://s3-alpha-sig.figma.com/img/e995/f598/85db47d776bf48203cc4e94987f45976?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k3LBMZBJ1h-jewz5lof69GhhtDBrfzaAbBESer37HdhckqLFzKtgaOOOSvVgv1pz8czBBIPx1i4IeapwKenXhVEJj0yoF3vjUpA5cREI0b74T1ynZ8e7hu1n7FgpAHovsFVl9uA6~B1A8MZldsa~h9MiQKpXJBn54ZNkZo4vghDD1s4yjiCP17P7fEqqcgJCZiuhWbHnZGMmvtnyIOHY1-jrtPrpnblBLF6k~HmrvpCpO83MpEGY-feWWM4ZLAUvB9bw06jziPy6b1UGUL7nnUz-Y~HWSuzStffT6Iib9ckO0CrZx-4cLNVCZ~tfA4tZAeUofDT0~YCX5YGPp3fYVg__"
              alt=""
            />
            <ChatLoading /> {/* Assuming ChatLoading component is responsive */}
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          {!submitted && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[18px] font-semibold text-[#241E30]">
                Ask Elon Anything
              </h1>
              <span className="text-[12px] font-normal text-[#241E30CC]">
                Elon Musk will respond solely based on his
              </span>

              <span className="text-[12px] font-normal text-[#241E30]">
                shared Tweets.
              </span>
              <div className="mt-[20px]">
                {presetQuestions.map((question, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor:
                        selectedQuestion === question ? "#5C1EDF" : "#5C1EDF1A",
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
            <span className="cursor-pointer text-[#241E30]" onClick={clearChat}>
              Start new chat
            </span>
          </div>
        </div>
        <div className="bg-[#ECEBEC] text-[12px] font-semibold flex items-center py-1 px-[7px] rounded-[28px]">
          <div className="flex items-center gap-[3px]">
            <span>
              <Share />
            </span>{" "}
            <span onClick={openModal} className="cursor-pointer text-[#241E30]">
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
      <div className="flex items-center p-2 bg-white relative mt-[10px]">
        <div className="absolute left-[12px] bottom-[23px] z-5">
          <div onClick={handleClipiconClick}>
            <Clipicon />
          </div>
        </div>
        {/* Hidden file input element */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.gif,.bmp"
          onChange={handleFileUpload}
          style={{
            display: "none",
            position: "absolute",
            bottom: "30px",
            left: "12px",
          }}
        />

<CustomTextArea
  value={inputValue}
  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }}
 
  placeholder="Ask Elon a Question"
/>

        <div className="absolute right-[10px] bottom-[18px] z-5 ">
          <button
            className={`bg-[#5C1EDFB2] text-white rounded-full p-2 ${
              !inputValue && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!inputValue}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
