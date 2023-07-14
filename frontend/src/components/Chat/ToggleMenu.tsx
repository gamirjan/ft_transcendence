import React, { useEffect, useState } from "react";
import ChatInfo from "./ChatInfo";
import Modal from "./Modal";

const ToggleMenu = ({ className = null, role, user, other, getRole }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("toggle: ", open);
  }, [open]);
  const removeAdmin = () => {};
  const setToAdmin = () => {};
  const kickUser = () => {};
  const muteUser = () => {};
  const leave = () => {};
  return (
    <div className="relative">
      <ChatInfo isSelectedUser={true} selectChat={() => setOpen(!open)} />
      <Modal
        contentClassName={"backdrop-blur bg-transparent"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col">
        <div className="flex flex-col w-full py-3">
          <div
            className="flex flex-row py-4 px-4 w-full justify-center items-center"
            style={{width: '500px'}}
          >
            {/* {console.log(elem.channel)} */}
            <div className="flex flex-row w-full  justify-start">
              <div className="w-1/4">
                {other.user.avatarurl ? (
                  <img
                    src={other.user.avatarurl}
                    alt=""
                    srcSet=""
                    className="object-cover h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="object-cover h-12 w-12 justify-center flex items-center rounded-full bg-gray-800">
                    {other.user.displayname.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="ml-2 flex flex-row w-full">
                <div className="text-lg break-all font-semibold">
                  {other.user.displayname}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {getRole(other.role)}
              </div>
            </div>
          </div>
          </div>
          <ul className="flex flex-col justify-center items-center p-5">
            {role == "owner" || role == "admin" ? (
              <>
                {role == "owner" ? (
                  <>
                    <li
                      className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                      onClick={removeAdmin}
                    >
                      Remove Admin
                    </li>
                    <li
                      className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                      onClick={setToAdmin}
                    >
                      Set To Admin
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li
                  className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                  onClick={kickUser}
                >
                  KICK
                </li>
                <li
                  className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                  onClick={muteUser}
                >
                  MUTE
                </li>
              </>
            ) : (
              <></>
            )}
            {user && other && user.id == other.id ? (
              <li
                className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                onClick={leave}
              >
                Leave
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ToggleMenu;
