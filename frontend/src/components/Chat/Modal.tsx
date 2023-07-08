
import React from "react";


const Modal = (props) => {
  return (
    <div
      className={`${props.className} ${
        props.isSelectedUser ? "hover:bg-[#181818] hover:cursor-pointer" : ''
      }`}
      onClick={props.selectChat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#aaaaaa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    </div>
  );
};

export default Modal;
