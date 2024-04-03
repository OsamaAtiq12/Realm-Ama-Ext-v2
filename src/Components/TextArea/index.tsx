import React from "react";

interface CustomTextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  showPlaceholder: boolean;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  value,
  onChange,
  placeholder = "",
  showPlaceholder,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      placeholder={showPlaceholder ? placeholder : ""}
      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-8 pt-[20px]  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-[#5C1EDFB2] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 overflow-hidden"
      style={{ minHeight: "48px",  }}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomTextArea;
