import React from "react";
import { Link } from "react-router-dom";
import { setUser, store } from "./redux";
import { useDispatch } from "react-redux";
const del = () => {};
const Layout = ({ children, auth = true, scrollable = false }) => {
  return (
    <div className={`flex flex-col h-full ${!scrollable ? "overflow-hidden" : ""} min-h-full max-h-full text-[#aaaaaa] bg-[#181818] w-full`}>
      <div className="flex flex-row sticky shadow bg-[#212121] top-0 z-[2] border-2 border-[#0f0f0f] justify-around py-3">
        <div className="flex text-2xl font-bold  self-start">My App</div>
        <div className={`flex flex-row justify-between text-2xl space-x-4 font-bold self-end ${!auth ? "hidden" : ""}`}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/channels">Channels</NavLink>
          <Link
            to="/out"
            className="text-lg font-medium text-[#aaaaaa] hover:text-white transition duration-150 ease-in-out"
          >
            sign out
          </Link>
        </div>
      </div>
      <div className="flex flex-col h-full">{children}</div>
    </div>
    // <div className="text-[#aaaaaa] bg-[#181818] w-full">
    //   <div className="bg-[#212121] sticky top-0  z-[5] border-2 border-[#0f0f0f] py-3 shadow">
    //     <div className="max-w-7xl mx-auto px-4">
    //       <div className="flex items-center justify-between">
    //         <div className="text-2xl font-bold">My App</div>
    //         <div className="space-x-4">
    //           <NavLink to="/home">Home</NavLink>
    //           <NavLink to="/profile">Profile</NavLink>
    //           <NavLink to="/contacts">Contacts</NavLink>
    //           <NavLink to="/chat">Chat</NavLink>
    //           <NavLink to="/channels">Channels</NavLink>
    //           <Link to="/out"  className="text-lg font-medium text-[#aaaaaa] hover:text-white transition duration-150 ease-in-out">
    //                 sign out
    //             </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="">{children}</div>
    // </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-lg font-medium text-[#aaaaaa] hover:text-white transition duration-150 ease-in-out"
  >
    {children}
  </Link>
);

export default Layout;
