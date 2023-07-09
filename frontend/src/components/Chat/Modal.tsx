import React from "react";
import { useRef } from "react";

const Modal = ({open, onClose, contentClassName, className, children}) =>{
    const modalRef = useRef();

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
  
    // const handleEscapeKey = (event) => {
    //   if (event.keyCode === 27) {
    //     onClose();
    //   }
    // };
  
    // const handleModalClick = () => {
    //   onClose();
    // };
    return (
        <div 
            className={`fixed flex justify-center items-center flex-col h-screen w-screen top-0 left-0 ${!open ? "hidden" : ""} ${className ?? "bg-[rgba(0,0,0,0.3)]"}`} style={{zIndex: 200}}
            onClick={handleOutsideClick}
        >
            <div 
            className={`flex flex-col min-w-[50%] min-h-[50%] rounded-xl items-center shadow-[#212121] shadow ${contentClassName ?? "bg-white"}`}
            ref={modalRef}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal;