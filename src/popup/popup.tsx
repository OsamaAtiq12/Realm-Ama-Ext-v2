import React from "react";
import './popup.css'
import Header from "../Pages/Header"

import ChatSection from "../Pages/ChatSection";
import Profile from "../Components/Profile";
const Popup = () => {
    return (
        <div className="p-[20px] bg-[#F0EDEB]">
        <Header />
  
        <Profile />
        <ChatSection />
      </div>
    )
};

export default Popup;