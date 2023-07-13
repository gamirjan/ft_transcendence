import React, { useEffect, useRef, useState } from "react";
// import './Chat.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "./Socket";
import { ip } from "./utils/ip";
import Modal from "./Chat/Modal";
import { IMassage } from "./utils";
import Layout from "./Layout";
import { Field, Form, Formik, FormikProps } from "formik";
import ChatInfo from "./Chat/ChatInfo";
import ModalBox from "./Chat/ModalBox";
import LayoutProvider from "./LayoutProvider";
import background from "@SRC_DIR/assets/images/chat.jpg";
import chatContent from "@SRC_DIR/assets/images/chatContent.jpg";

const ChannelComponent = () => {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [messages, setMessages] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [dmMessage, setDMMessage] = useState("");
  const [sended, setSended] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleSidebar = () => {
    Object.keys(selectedChannel).length != 0 && setOpenSidebar(!openSidebar);
  };

  const joinChannel = (channel) => {
    if (user == null) navigate("/", { replace: true });
    else {
      const values = {
        channelid: channel.id,
        userid: user.id,
      };
      fetch(`${ip}:7000/channels/join/public/`, {
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
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleSelectUser = (e) => {
    // console.log("hhhhhhhhhhhhhh");

    // joinChannel(e)
    setSelectedChannel(e);
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
      // console.log(obj.username + ": " + obj.msg);
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
      fetch(`${ip}:7000/channelmessages/${selectedChannel.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          // console.log("messages: ", data);

          setMessages(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchChannels = () => {
    if (user == null) navigate("/", { replace: true });
    else {
      fetch(`${ip}:7000/channels/all`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          // console.log("all: ", data);

          setAllChannels(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (user == null) navigate("/", { replace: true });
    else {
      fetch(`${ip}:7000/channels/user/all/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          setChannels(data);
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(selectedChannel);

      fetchChannels();
      if (Object.keys(selectedChannel).length) {
        fetchMessages();
        // console.log(messages);
      }
    }
  }, [sended, openModal]);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]);
      return;
    }

    const regex = new RegExp(".*" + e.target.value + ".*", "i");

    setSuggestions(
      allChannels.filter((obj) => {
        return regex.test(obj.channelname);
      })
    );
  };
  // const selectedChat = (e)=>{
  //   setSelectedChannel((e)=>{e.user})
  //   let user_ = e.user
  //    setSelectedChannel(user_);
  //   //console.log(selectedChannel);
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
    const msg = dmMessage.trim();
    if (!msg.length) return;
    // console.log(user, selectedChannel);
    // console.log(dmMessage);
    // console.log(typeof(user.id));

    const values = {
      channel: selectedChannel,
      user: user,
      message: msg,
    };
    /* method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({   
               channelType: "1",
              channelName: newChannelName,
              owner: user }), */
    fetch(`${ip}:7000/channelmessages`, {
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
        // console.log(error);
      });
  };

  socket.on("participants", (count) => {
    console.log("online :" + count);
  });
  const createChannel = (data) => {
    // console.log("createChan");

    // console.log(user, selectedChannel);
    // console.log(dmMessage);
    // console.log(typeof(user.id));
    console.log("data: ", data);
    

    const values = {
      channelName: data.channelName,
      owner: user,
      password: data.password,
      channelType: data.type,
    };
    /* method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({   
               channelType: "1",
              channelName: newChannelName,
              owner: user }), */
    fetch(`${ip}:7000/channels`, {
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
        setOpenModal(false);
        // setSended(!sended);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getType = (param) => {
    switch(param) {
      case "2":
        return 'protected';
      case "3":
          return 'private';
      default:
        return 'public';
    }
  }

  return (
    <LayoutProvider>
      <div className="relative flex flex-col h-full">
        <div
          className="container mx-auto h-full flex flex-col text-white shadow-lg border-x-2 border-[#0f0f0f] rounded-lg"
          style={{
            backgroundImage: `url(${chatContent})`,
            backgroundRepeat: "repeat",
            backgroundBlendMode: "multiply",
            minWidth: "80vw",
          }}
        >
          <div className=" flex flex-col h-full justify-center">
            {/* <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="" /> */}
            <div className="flex flex-col h-full">
              <div
                className="flex flex-row h-full justify-between border-x-2 border-[#585858]"
                style={{ zIndex: 1000 }}
              >
                {/* <!-- chat list --> */}
                <div
                  className="flex flex-col h-full w-2/5  border-r-2 border-[#585858]"
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    maxWidth: "20vw"
                  }}
                >
                  <div className="p-2 z-[4] border-b-2 border-[#585858]">
                    <div className=" flex flex-row justify-between font-semibold text-2xl px-2">
                      <ModalBox create={true} createChannel={createChannel} />
                    </div>

                    {/* <!-- search compt --> */}
                    <div className="py-4 px-2">
                      <input
                        type="text"
                        placeholder="search chatting"
                        className="py-4 px-4 text-[#707579] backdrop-blur-sm outline-none border-2 border-[#2f2f2f] rounded-2xl w-full hover:border-[#707579]"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  {searchQuery && searchQuery.length != 0 && (
                    <div
                      className="flex flex-col overflow-y-scroll px-4"
                      style={{ maxHeight: "75vh" }}
                    >
                      <ModalBox
                        join={true}
                        handleSelectUser={handleSelectUser}
                        suggestions={suggestions}
                        setSearchQuery={setSearchQuery}
                        joinChannel={joinChannel}
                      />
                    </div>
                  )}
                  <div
                    className="flex flex-col p-4 w-full overflow-y-scroll"
                    style={{ maxHeight: "75vh" }}
                  >
                    {/* <!-- end search compt -->
            <!-- user list --> */}
                    {!(searchQuery && searchQuery.length != 0) &&
                      channels &&
                      channels.map((elem, key) => (
                        // <div>
                        //     {console.log(elem)}
                        //   </div>
                        <div
                          className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-xl"
                          key={key}
                        >
                          {/* {console.log(elem.channel)} */}
                          <div
                            className="flex w-full  justify-start"
                            onClick={() => {
                              handleSelectUser(elem.channel);
                              // console.log("okkkkkk");
                            }}
                          >
                            <div className="w-1/4">
                              {elem.channel.channelpictureurl ? (
                                <img
                                  src={elem.channel.channelpictureurl}
                                  alt=""
                                  srcSet=""
                                  className="object-cover h-12 w-12 rounded-full"
                                />
                              ) : (
                                <div className="object-cover h-12 w-12 justify-center flex items-center rounded-full bg-gray-800">
                                  {elem.channel.channelname
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-row">
                              <div className="ml-3 text-lg font-semibold">
                                {elem.channel.channelname}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <ChatInfo
                              contentClassName={"bg-[#212121]"}
                              selectChat={() => {
                                const isOpen =
                                  !selectedChannel ||
                                  Object.keys(selectedChannel).length == 0 ||
                                  selectedChannel.id != elem.channel.id
                                    ? true
                                    : !openSidebar;
                                handleSelectUser(elem.channel);
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
                <div
                  className={`w-full flex flex-row justify-between ${
                    !(selectedChannel && Object.keys(selectedChannel).length != 0)
                      ? "hidden"
                      : ""
                  }`}
                >
                  {/* <div className="flex flex-row"> */}
                  <div className={`flex flex-col w-full  `}>
                    <div className="px-4 flex justify-between items-center backdrop-blur-md bg-[#36323270] z-[1] border-b-2 border-[#585858]">
                      <div
                        className={`w-full ${
                          Object.keys(selectedChannel).length != 0
                            ? "hover:cursor-pointer"
                            : ""
                        }`}
                        onClick={toggleSidebar}
                      >
                        <div className="flex px-4 pt-3 rounded-xl justify-start">
                          <div className="flex flex-col py-2">
                            {selectedChannel && selectedChannel.channelpictureurl ? (
                              <img
                                src={selectedChannel.channelpictureurl}
                                alt=""
                                srcSet=""
                                className="object-cover h-12 w-12 rounded-full"
                              />
                            ) : (
                              selectedChannel &&
                              selectedChannel.channelname && (
                                <div className="object-cover h-12 w-12 justify-center flex items-center rounded-full bg-gray-800">
                                  {selectedChannel.channelname
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                              )
                            )}
                            {/* <img
                          src={selectedChannel.channelpictureurl ?? user.channelpictureurl}
                          className="object-cover h-10 self-center w-10 rounded-full"
                          alt=""
                        /> */}
                          </div>
                          <div className="flex flex-col">
                            <div className="ml-2  py-3 px-4 justify-center rounded-xl text-white">
                              {selectedChannel.channelname ??
                                (user ? user.displayname : "Saved Message")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChatInfo
                        selectChat={toggleSidebar}
                        className={
                          "p-2 rounded-full text-white font-semibold relative"
                        }
                        isSelectedUser={Object.keys(selectedChannel).length != 0}
                      />
                    </div>

                    <div className="flex flex-col h-full py-5">
                      <div className="flex flex-col h-full relative">
                        <div className="absolute top-5 bottom-0 left-0 w-full">
                          <div className="overflow-y-scroll  flex justify-center">
                            <div
                              className="w-1/2 flex flex-col"
                              style={{ height: "65vh" }}
                            >
                              {messages &&
                                messages.map((msg, key) =>
                                  user && user.id != msg.user.id ? (
                                    <div
                                      className="flex justify-start mb-4"
                                      key={key}
                                    >
                                      <img
                                        src={msg.user.channelpictureurl}
                                        className="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                      />
                                      <div className="ml-2 py-3 max-w-[480px] break-all px-4 bg-[#1b1a10] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                        {msg.message}
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="flex justify-end mb-4"
                                      key={key}
                                    >
                                      <div className="mr-2 py-3 px-4 bg-[#1f2937] max-w-[480px] break-all rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                        {msg.message}
                                      </div>
                                      <img
                                        src={user.channelpictureurl}
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
                                  !(
                                    selectedChannel &&
                                    Object.keys(selectedChannel).length
                                  )
                                }
                                className={`w-1/2 bg-[#36323270] backdrop-blur-sm py-5 px-3 rounded-xl outline-none border-[#2f2f2f] border-2 \
                ${
                  selectedChannel && Object.keys(selectedChannel).length
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
                      className={`flex flex-col h-full w-full  border-l-2 border-[#585858]`}
                    >
                      <div className="flex flex-row justify-start bg-[#36323270] py-5 w-full px-5">
                        <div className="flex flex-row">
                          <div
                            className="flex justify-center hover:cursor-pointer hover:bg-[#181818] hover:rounded-full p-2 w-10 h-10"
                            onClick={toggleSidebar}
                          >
                            X
                          </div>
                          <div className=" flex justify-end font-semibold text-2xl px-10">
                            Chat
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          <div className="flex flex-row h-auto w-full relative">
                            {selectedChannel && selectedChannel.channelpictureurl ? (
                              <img
                                src={selectedChannel.channelpictureurl}
                                alt=""
                                className="object-cover h-52 w-full"
                              />
                            ) : (
                              <div className="object-cover h-52 w-full bg-gray-800 flex justify-center items-center">
                                {selectedChannel.channelname
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}
                            <div className="absolute flex justify-start bottom-0 p-3 w-full bg-[#3d3c4096]">
                              {selectedChannel.channelname}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex p-5 flex-col">
                        <div className="rounded-xl hover:bg-[#36323270] p-5 text-white">
                          <pre>
                          {"Type: " + getType(selectedChannel.channeltype)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* <!-- end message --> */}
              </div>
            </div>
          </div>
          {/* <!-- headaer --> */}

          {/* <!-- end header --> */}
          {/* <!-- Chatting --> */}
        </div>
      </div>
    </LayoutProvider>
    // </div>
  );
};

export default ChannelComponent;
