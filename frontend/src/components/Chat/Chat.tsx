import React, { useEffect, useRef, useState } from "react";
// import './Chat.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket";
import { ip } from "../utils/ip";
import Modal from "./Modal";
// import { Button, Modal } from 'antd';
import { IMassage } from "../utils";
import CollapsibleMenu from "./CollapsibleMenu";
import Layout from "../Layout";
function Chat() {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserName, setSelectedUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [dmMessage, setDMMessage] = useState("");
  const [sended, setSended] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    Object.keys(selectedUser).length != 0 && setOpenSidebar(!openSidebar);
  };

  const handleSelectUser = (e) => {
    setSelectedUser(e);
    setSelectedUserName(selectedUser.displayname);
  };
  useEffect(() => {
    const onConnect = () => {
      console.log("CONNECTED");
    };

    const onOnline = (p) => {
      console.log("ONLINE", p);
      // fetchMessages();

      // console.log();
    };

    socket.on("connect", onConnect);
    socket.on("online", onOnline);

    socket.emit("online", { msg: "Hello, world!!!" });
    socket.on("chat", function (obj) {
      if (obj.msg !== "") {
        setTextMessages([
          ...(textMessages || []),
          { msg: obj.displayname + ": " + obj.msg, username: obj.username },
        ]);
      }
      console.log(obj.username + ": " + obj.msg);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("online", onOnline);
      socket.off("chat");
    };
  }, []);
  const fetchMessages = () => {
    if (user == null) navigate("/", { replace: true });
    else {
      fetch(`${ip}:7000/directmessages/messages/${user.id}/${selectedUser.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          console.log(data);

          setMessages(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (user == null) navigate("/", { replace: true });
    else {
      fetch(`${ip}:7000/friends/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          setContacts(data);
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(selectedUser);

      if (Object.keys(selectedUser).length) {
        fetchMessages();
        // console.log(messages);
      }
    }
  }, [selectedUserName, sended]);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]);
      return;
    }

    const regex = new RegExp(".*" + e.target.value + ".*", "i");

    setSuggestions(
      contacts.filter((obj) => {
        return regex.test(obj.user.displayname);
      })
    );
  };
  // const selectedChat = (e)=>{
  //   setSelectedUser((e)=>{e.user})
  //   let user_ = e.user
  //    setSelectedUser(user_);
  //   //console.log(selectedUser);
  // }

  const [textMessages, setTextMessages] = useState<IMassage[] | undefined>(
    undefined
  );
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    let msg = message;
    msg = msg.replace(/(<([^>]+)>)/gi, "");
    console.log("msgggggg", msg);

    console.log("sending msg: " + msg + " from " + username);
    socket.emit("chat", {
      data: user,
      msg: msg,
      userid: chatid,
      username: username,
    });

    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      sendDMMessage();
      setDMMessage("");
    }
  };
  const sendDMMessage = () => {
    if (!dmMessage.length) return;
    // console.log(user, selectedUser);
    // console.log(dmMessage);
    // console.log(typeof(user.id));

    const values = {
      user1: user || {},
      user2: selectedUser,
      id1: user.id,
      id2: selectedUser.id,
      message: dmMessage,
    };
    /* method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({   
               channelType: "1",
              channelName: newChannelName,
              owner: user }), */
    fetch(`${ip}:7000/directmessages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json(); // assuming the server returns JSON data
      })
      .then((data) => {
        setSended(!sended);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  socket.on("participants", (count) => {
    console.log("online :" + count);
  });

  return (
    <Layout>
      <div className="flex flex-col h-full bg-[#181818]">
        <div className="container mx-auto h-full flex flex-col text-white shadow-lg bg-[#212121] border-x-2 border-[#0f0f0f] rounded-lg">
          {/* <!-- headaer --> */}

          {/* <!-- end header --> */}
          {/* <!-- Chatting --> */}
          <div className="flex flex-row h-full justify-between bg-[#212121]">
            {/* <!-- chat list --> */}
            <div className="flex flex-col h-full w-2/5  border-r-2 border-[#0f0f0f]">
              <div className="bg-[#212121] p-2 z-[4]">
                <div className=" flex justify-center font-semibold text-2xl  px-2">
                  Chat
                </div>

                {/* <!-- search compt --> */}
                <div className="py-4 px-2">
                  <input
                    type="text"
                    placeholder="search chatting"
                    className="py-4 px-4 text-[#707579] outline-none border-2 bg-[#181818] border-[#2f2f2f] rounded-2xl w-full hover:border-[#707579]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              {searchQuery && searchQuery.length != 0 && (
                <div className="flex flex-col overflow-y-scroll px-4" style={{maxHeight: "75vh"}}>
                  {suggestions &&
                    suggestions.map((elem, key) => (
                      <div className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#181818] hover:rounded-xl">
                        <div
                          className="flex w-full  justify-start"
                          onClick={() => {
                            handleSelectUser(elem.user);
                            setSearchQuery("");
                            console.log("okkkkkk");
                          }}
                        >
                          <div className="w-1/4">
                            <img
                              src={elem.user.avatarurl}
                              alt=""
                              srcSet=""
                              className="object-cover h-12 w-12 rounded-full"
                            />
                          </div>
                          <div className="flex flex-row">
                            <div className="ml-3 text-lg font-semibold">
                              {elem.user.displayname}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-col px-4 overflow-y-scroll" style={{maxHeight: "75vh"}}>
                {/* <!-- end search compt -->
            <!-- user list --> */}
                {!(searchQuery && searchQuery.length != 0) &&
                  contacts &&
                  contacts.map((elem, key) => (
                    <div className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#181818] hover:rounded-xl">
                      <div
                        className="flex w-full  justify-start"
                        onClick={() => {
                          handleSelectUser(elem.user);
                          console.log("okkkkkk");
                        }}
                      >
                        <div className="w-1/4">
                          <img
                            src={elem.user.avatarurl}
                            alt=""
                            srcSet=""
                            className="object-cover h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="ml-3 text-lg font-semibold">
                            {elem.user.displayname}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Modal
                          contentClassName={"bg-[#212121]"}
                          selectChat={() => {
                            const isOpen =
                              !selectedUser ||
                              Object.keys(selectedUser).length == 0 ||
                              selectedUser.id != elem.user.id
                                ? true
                                : !openSidebar;
                            handleSelectUser(elem.user);
                            setOpenSidebar(isOpen);
                          }}
                          isSelectedUser={true}
                          className={" p-2 rounded-lg hover:bg-[#212121]"}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* <!-- end user list --> */}
            </div>
            {/* <!-- end chat list --> */}
            {/* <!-- message --> */}
            <div className="w-full flex flex-row justify-between bg-[#181818]">
              {/* <div className="flex flex-row"> */}
                <div className="flex flex-col w-full ">
                  <div className="px-4 flex justify-between items-center z-[1] bg-[#212121] border-b-2 border-[#0f0f0f]">
                  <div
                    className={`w-full ${
                      Object.keys(selectedUser).length != 0
                        ? "hover:cursor-pointer"
                        : ""
                    }`}
                    onClick={toggleSidebar}
                  >
                    <div className="flex px-4 pt-3 rounded-xl justify-start">
                      <div className="flex flex-col">
                        <img
                          src={selectedUser.avatarurl ?? user.avatarurl}
                          className="object-cover h-10 self-center w-10 rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="ml-2  py-3 px-4 justify-center rounded-xl text-white">
                          {selectedUser.displayname ??
                            user.displayname ??
                            "Saved Message"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Modal
                    selectChat={toggleSidebar}
                    className={
                      "p-2 rounded-full text-white font-semibold relative"
                    }
                    isSelectedUser={Object.keys(selectedUser).length != 0}
                  />

                  </div>

                <div className="flex flex-col h-full py-5">
                  <div className="flex flex-col h-full relative">

                  <div
                    className="absolute top-5 bottom-0 left-0 w-full"
                  >
                    <div className="overflow-y-scroll  flex justify-center">
                      <div className="w-1/2 flex flex-col" style={{height: "70vh"}}>
                        {messages &&
                          messages.map((msg) =>
                            user.id != msg.senderid ? (
                              <div className="flex justify-start mb-4">
                                <img
                                  src={selectedUser.avatarurl}
                                  className="object-cover h-8 w-8 rounded-full"
                                  alt=""
                                />
                                <div className="ml-2 py-3 max-w-[480px] break-all px-4 bg-[#212121] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                  {msg.message}
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-end mb-4">
                                <div className="mr-2 py-3 px-4 bg-[#707579] max-w-[480px] break-all rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                  {msg.message}
                                </div>
                                <img
                                  src={user.avatarurl}
                                  className="object-cover h-8 w-8 rounded-full"
                                  alt=""
                                />
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    {
                      <div className="flex py-5 justify-around">
                        <input
                          disabled={
                            !(selectedUser && Object.keys(selectedUser).length)
                          }
                          className={`w-1/2 bg-[#212121] py-5 px-3 rounded-xl outline-none border-[#2f2f2f] border-2 \
                ${
                  selectedUser && Object.keys(selectedUser).length
                    ? "hover:border-[#707579] focus:border-[#707579]"
                    : ""
                }`}
                          type="text"
                          value={dmMessage}
                          onChange={(e) => setDMMessage(e.target.value)}
                          placeholder="type your message here..."
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    }
                  </div>
                  </div>
                {/* </div> */}
              </div>
                </div>
              {openSidebar && (
                <div
                  className={`flex flex-col bg-[#212121] h-full w-full border-2 border-[#0f0f0f]`}
                >
                  <div className="flex flex-row justify-start py-5 w-full px-5">
                    <div className="flex flex-row">
                      <div
                        className="flex justify-center hover:cursor-pointer hover:bg-[#181818] hover:rounded-full p-2 w-10 h-10"
                        onClick={toggleSidebar}
                      >
                        X
                      </div>
                      <div className=" flex justify-end font-semibold text-2xl px-10">
                        Profile
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="flex flex-row h-auto w-full relative">
                        <img
                          src={selectedUser.avatarurl}
                          alt=""
                          className="object-cover h-50 w-full"
                        />
                        <div className="absolute flex justify-start bottom-0 p-3 w-full bg-[#3d3c4096]">
                          {selectedUser.displayname}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-5 flex-col">
                    <div className="rounded-xl hover:bg-[#181818] p-5 text-white">
                      <pre>{"Email: " + (selectedUser.email ?? "Hidden")}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <!-- end message --> */}
          </div>
        </div>
      </div>
    </Layout>
    // </div>
  );
}

export default Chat;
