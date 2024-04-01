import React from "react";

function ChatLoading() {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center w-16 h-8 rounded-full overflow-hidden border border-gray-200">
        <span className="block w-2 h-2 bg-gray-500 rounded-full animate-pulse-up-down delay-300ms infinite" />
        <span className="block w-2 h-2 mx-1 bg-gray-500 rounded-full animate-pulse-up-down delay-600ms infinite" />
        <span className="block w-2 h-2 bg-gray-500 rounded-full animate-pulse-up-down delay-900ms infinite" />
      </div>
    </div>
  );
}

export default ChatLoading;
