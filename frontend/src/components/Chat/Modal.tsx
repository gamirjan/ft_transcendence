// import React, { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";

// const Modal = (props) => {
//     const modalRef = useRef(null)
//     const [modalOpen, setModalOpen] = useState(false)
//     // const [isMouseNear, setIsMouseNear] = useState(false);

// //   const handleMouseLeave = (event) => {
// //     const element = event.target;
// //     const { left, top, width, height } = element.getBoundingClientRect();

// //     const mouseX = event.clientX;
// //     const mouseY = event.clientY;

// //     // Calculate the distance between the mouse pointer and the element's bounds
// //     const distance = Math.sqrt(
// //       Math.pow(mouseX - (left + width / 2), 2) +
// //       Math.pow(mouseY - (top + height / 2), 2)
// //     );

// //     const customDistance = 20; // Define your custom distance here

// //     setIsMouseNear(distance < customDistance);
// //   };

//     const openModal = () => {
      
//         setModalOpen(false);
//     }
//     const closeModal = () => {
//         setModalOpen(true)
//     }
//     useEffect(() => { 
//         // if (isMouseNear)
//         //     closeModal();
//         const handleOutsideClick = (event) => { 
//           if (modalRef.current && !modalRef.current.contains(event.target)) { 
//             closeModal(); 
//           } 
//         }; 
     
//         document.addEventListener('mousedown', handleOutsideClick); 
     
//         return () => { 
//           document.removeEventListener('mousedown', handleOutsideClick); 
//         }; 
//       }, [modalOpen]); 
//     return (
//         <div className={`${props.mainClassName} ${props.isSelectedUser && "hover:bg-[#181818] hover:cursor-pointer"}`}
//            onClick={openModal}
//         //    onMouseLeave={handleMouseLeave}
//            >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               stroke="#aaaaaa" 
//               stroke-width="2" 
//               stroke-linecap="round" 
//               stroke-linejoin="round">
//                 <circle cx="12" cy="12" r="1">
//                   </circle>
//                 <circle cx="12" cy="5" r="1">
//                   </circle>
//                   <circle cx="12" cy="19" r="1">
//                     </circle>
//             </svg>
//             {/* <img
//                     src={selectedUser.avatarurl ?? ""}
//                     className="object-cover h-10 w-10 rounded-full"
//                     alt=""
//                   /> */}
//           {props.isSelectedUser && (
//             <div 
//             className={`${props.className} ${modalOpen}`}
//             ref={modalRef}
//             >
//               {/* Menu content */}
             
//               <ul className="z-[1] ">
//                 <li 
//                 className={`px-4 py-2 ${props.itemClassName} rounded-xl  `}
//                 onClick={()=>{
//                   props.selectChat();
//                   closeModal();
//                 }}
//                 >
//                   Info
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//     )
// }



// // export PopupMenu;

// export default {Modal};
import React from 'react';
import {Modal as ModalBox} from 'antd'
import { useEffect } from 'react';
import { useState } from 'react';

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (!modalOpen)
      setModalOpen(true);
  };



  const closeModal = () => {
    // if (isClose)
      setModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalOpen && !event.target.closest('.ant-modal')) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    // return () => {
    //   document.removeEventListener('mousedown', handleOutsideClick);
    // };
  }, [modalOpen]);

  return (
    <div
      className={`${props.mainClassName} ${props.isSelectedUser && 'hover:bg-[#181818] hover:cursor-pointer'}`}
      onClick={openModal}
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

      {(props.isSelectedUser && modalOpen)  && (
        <ModalBox
          open={modalOpen}
          onClose={closeModal}
          bodyStyle={{ className: `${props.className}` }}
          contentClassName={props.contentClassName}
          centered={props.centered}
          // className={props.className}
          // bodyStyle={{ padding: 0 }}
          footer={null}
          closable={false}
        >
          <div className={`flex flex-col bg-[#212121] h-screen border-2 border-[#0f0f0f]`}>
          <div className="flex flex-row justify-start py-5 w-[20vw] px-5">
              <div className='flex flex-row'>

              <div className='flex justify-center hover:cursor-pointer hover:bg-[#181818] hover:rounded-full p-2 w-10 h-10' onClick={props.selectChat ?? closeModal}>X</div>
                  <div className=" flex justify-end font-semibold text-2xl px-10">Profile</div>
              </div>
            
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <div className='flex flex-row relative'>
                <img 
                  src={props.selectedUser.avatarurl} 
                  alt="" 
                  className='object-cover h-50 w-full'
                  />
                  <div className='absolute flex justify-start bottom-0 p-3 w-full bg-[#3d3c4096]'>
                      {props.selectedUser.displayname}
                  </div>

                </div>
              </div>
            </div>
              <div className='flex p-5 flex-col'>
                  <div className='rounded-xl hover:bg-[#181818] p-5 text-white'>
                    <pre>

                      {"Email: " + (props.selectedUser.email ?? "Hidden")}
                    </pre>
                  </div>
              </div>
            
        </div>
          {/* <ul className="z-[1]">
            <li
              className={`px-4 py-2 ${props.itemClassName} rounded-xl`}
              onClick={() => {
                //selectChat();
                // setIsClose(true)
                console.log("isClose");
                
                closeModal();
              }}
            >
              Info
            </li>
          </ul> */}
        </ModalBox>
      )}
    </div>
  );
};

export default Modal;