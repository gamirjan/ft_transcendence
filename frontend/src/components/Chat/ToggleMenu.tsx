import React, { useState } from "react";
import ChatInfo from "./ChatInfo";

const ToggleMenu = ({ className = null, role, user, current }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <ChatInfo selectChat={() => setOpen(!open)} />
      {open ? (
        <div className="absolute top-0 bg-black">
          <ul>
            {role == "owner" || role == "admin" ? (
              <>
                {role == 'owner' ? (<li>Remove Admin
                </li>) : (<></>)}
                <li >KICK</li>
                <li >MUTE</li>
                <li >MUTE</li>
              </>
            ) : (
              <></>
            )}
            <li>Leave</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
