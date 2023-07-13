import React, { useEffect, useRef, useState } from "react";
// import './Chat.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket";
import { ip } from "../utils/ip";
// import { Button, Modal } from 'antd';
import { IMassage } from "../utils";
import CollapsibleMenu from "./CollapsibleMenu";
import Layout from "../Layout";
import ChatInfo from "./ChatInfo";
import LayoutProvider from "../LayoutProvider";
import background from "@SRC_DIR/assets/images/chat.jpg";
import chatContent from "@SRC_DIR/assets/images/chatContent.jpg"
import { io } from "socket.io-client";

const Chat = () => {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserName, setSelectedUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [dmMessage, setDMMessage] = useState("");
  const [sended, setSended] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isSocket,setIsSoket]  = useState(false);
  const [socket,setSocket] = useState(io());
    if(isSocket == false)
    {

      setSocket( io(`${ip}:4001/pong`,{
        closeOnBeforeunload:true,
        protocols:'ws',
        secure:true,
        randomizationFactor:0.8,
        transports: ['websocket'],
        autoConnect:false,
        auth:{
          headers:{
              'USER':JSON.stringify({user})
          },
          
      },
      
      }));
      setIsSoket(true);
    }
    useEffect(()=>{
      socket.connect()
      socket.on("connection",(data)=>{
        console.log("conectionnnnn");
      })
      return()=>{
        socket.close();
        socket.disconnect();
      }
    },[])

     // Update the server URL and namespace
     let width  =600;
     let height = 300;
     let paddleHeight = ((200 * height) / 1080) /2;
  const [room, setRoom] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isStart,setIsStart] = useState(false);
  const [pos,setPos] = useState("");
  const [chat,setChat] = useState([]);
  const [end,setEnd] = useState(false);
  const [players,setPlayers] = useState([]);
  const [player1,setPlayer1] = useState("player1");
  const [player2,setPlayer2] = useState("player2");
  const [winner,setWinner]  =useState({});

  useEffect(()=>{
    console.log("wiinnn");
    
  },[winner])

useEffect(() => {
    socket.onopen = function(event) {
        // console.log('Connected to the server');
        
        // Send data to the server
        const data = user;
        socket.send(data);
      };
    socket.on('connect', () => {
       console.log('Connected to server');
    });

    socket.on('info', (data) => {
        console.log("infoo");
        
        console.log("info",data);
        
        
    });

    socket.on('playerinfo',(data,data1)=>{
      
      console.log("sddsddsdsdsdsd",data,data1);
      setPlayer1(data.displayname);
      setPlayer2(data1.displayname);
      
    });

    socket.on('room', (code) => {
        
        console.log("room sdgddfdggrs");
        //console.log("ssssssssssssssssssss",data);

        // if(data == user.id)
        //   setPos("left");
        // else
        //   setPos("right");
        if(!isStart)
        {
          socket.emit('start');
          setIsStart(true);
          
        }
    });

    socket.on('stop', (data)=>{
      console.log("stop=>",data);
      setWinner(data);
      setIsStart(false);
      setEnd(true);
     // window.location.reload();
      //socket.close();
      
      
    });
    socket.on('disconnect', (data)=>{
      console.log("disconnect=>",data);
      socket.close();
      
    });
    socket.on('chat',(data)=>{
      console.log("chatt",data);
      
    })

    return () => {
     console.log("socket closed");
     socket.off('room')
     socket.disconnect();
     socket.close()
     //socket.off();
      //socket.disconnect();
    };
  }, []);

  const joinQueue = () => {;
    console.log("dddafswfwf",user);
    
    socket.emit('queue',{data:user});
  };

  const joinRoom = () => {
    socket.emit('room', inputValue);
  };

  const ready = () => {
    socket.emit('ready', {});
  };

  const startGame = () => {
    console.log("havayiiiiiiiiiiiiiiiiiiiii");
    
   // socket.emit('start');
  };

    useEffect(() => {
        const onConnect = () => {
            console.log("CONNECTED")
        }

        const onOnline = (p) => {
            console.log("ONLINE", p)
        }

        socket.on("connect", onConnect);        
        socket.on("online", onOnline);

        socket.emit("online", { msg: "Hello, world!!!" })
        socket.on('chat', function (obj) {
            if (obj.msg !== '') {
                setTextMessages([...(textMessages || []), 
                    {msg: obj.displayname + ": " + obj.msg, username: obj.username}])
            }
            console.log(obj.username + ": " + obj.msg);
        });

        return () => {
            socket.off("connect", onConnect);
            socket.off("online", onOnline);
            socket.off('chat');
        }
    }, []);

    useEffect(() => {
        if (user == null) 
            navigate("/", { replace: true });
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
        }
      }, []);
      ///////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  });
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
  };
  const fetchAllUsers = () => {
    fetch(`${ip}:7000/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json(); // assuming the server returns JSON data
      })
      .then((data) => {
        console.log(data);

        setAllUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      fetch(`${ip}:7000/directmessages/chats/${user.id}`)
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
    // fetchAllUsers();
  }, [selectedUserName, sended, allUsers]);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]);
      return;
    }

    const regex = new RegExp(".*" + e.target.value + ".*", "i");

    setSuggestions(
      allUsers.filter((obj) => {
        return regex.test(obj.displayname);
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
  useEffect(()=>{
    fetchAllUsers();
  }, [])
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      sendDMMessage();
      setDMMessage("");
      fetchAllUsers();
    }
  };
  const sendDMMessage = () => {
    const msg = dmMessage.trim();
    if (!msg.length) return;
    // console.log(user, selectedUser);
    // console.log(dmMessage);
    // console.log(typeof(user.id));
    const values = {
      user1: user || {},
      user2: selectedUser,
      id1: user.id,
      id2: selectedUser.id,
      message: msg,
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
    <LayoutProvider>
      <div
        className="flex flex-col h-full"
        style={{ zIndex: 100, minWidth: "1000px" }}
      >
        <div
          className={`container mx-auto h-full flex flex-col text-white shadow-lg rounded-lg`}
          style={{
            backgroundImage: `url(${chatContent})`,
            backgroundRepeat: "repeat",
            backgroundBlendMode: "multiply",
            minWidth: "80vw",
          }}
        >
          {/* <!-- headaer --> */}

          {/* <!-- end header --> */}
          {/* <!-- Chatting --> */}
          <div
            className={`flex flex-row h-full justify-between `}
          >
            {/* <!-- chat list --> */}
            <div className="flex flex-col h-full w-2/5 min-w-[20vw] border-x-2 border-[#585858] border-r-2 border-[#585858]"
               style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                maxWidth: "20vw"
              }}
            >
              <div className="p-2 z-[4] border-b-2 border-[#585858]">
                <div className=" flex justify-center font-semibold text-2xl  px-2">
                  Chat
                </div>

                {/* <!-- search compt --> */}
                <div className="py-4 px-2">
                  <input
                    type="text"
                    placeholder="search chatting"
                    className="py-4 px-4 text-[#707579] outline-none border-2 border-[#2f2f2f] bg-[#36323270] rounded-2xl w-full hover:border-[#707579]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              {searchQuery && searchQuery.length != 0 && (
                <div
                  className="flex flex-col overflow-y-scroll p-4"
                  style={{ maxHeight: "75vh" }}
                >
                  {suggestions &&
                    suggestions.map((elem, key) => (
                      <div
                        className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-xl"
                        key={key}
                      >
                        <div
                          className="flex w-full  justify-start"
                          onClick={() => {
                            handleSelectUser(elem);
                            setSearchQuery("");
                            console.log("okkkkkk");
                          }}
                        >
                          <div className="w-1/4">
                            <img
                              src={elem.avatarurl}
                              alt=""
                              srcSet=""
                              className="object-cover h-12 w-12 rounded-full"
                            />
                          </div>
                          <div className="flex flex-row">
                            <div className="ml-3 text-lg font-semibold">
                              {elem.displayname}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              <div
                className="flex flex-col p-4 overflow-y-scroll"
                style={{ maxHeight: "75vh" }}
              >
                {/* <!-- end search compt -->
            <!-- user list --> */}
                {!(searchQuery && searchQuery.length != 0) &&
                  contacts &&
                  contacts.map((elem, key) => (
                    <div
                      className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-xl"
                      key={key}
                      
                    >
                      <div
                        className="flex w-full  justify-start"
                        onClick={() => {
                          handleSelectUser(elem);
                          console.log("okkkkkk");
                        }}
                      >
                        <div className="w-1/4">
                          <img
                            src={elem.avatarurl}
                            alt=""
                            srcSet=""
                            className="object-cover h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="ml-3 text-lg font-semibold">
                            {elem.displayname}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <ChatInfo
                          contentClassName={""}
                          selectChat={() => {
                            const isOpen =
                              !selectedUser ||
                              Object.keys(selectedUser).length == 0 ||
                              selectedUser.id != elem.id
                                ? true
                                : !openSidebar;
                            handleSelectUser(elem);
                            setOpenSidebar(isOpen);
                          }}
                          isSelectedUser={true}
                          className={" p-2 rounded-lg hover:bg-[#36323270]"}
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
              className={`w-full flex flex-row justify-between border-r-2 border-[#585858] ${
                !(selectedUser && Object.keys(selectedUser).length != 0)
                  ? "hidden"
                  : ""
              }`}
            >
              {/* <div className="flex flex-row"> */}
              <div className="flex flex-col w-full ">
                <div className="px-4 flex justify-between items-center bg-[#36323270] z-[1] border-b-2 border-[#585858]">
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
                          src={
                            selectedUser.avatarurl ??
                            (user ? user.avatarurl : "Photo")
                          }
                          className="object-cover h-10 self-center w-10 rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="ml-2  py-3 px-4 justify-center rounded-xl text-white">
                          {selectedUser.displayname ??
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
                    isSelectedUser={Object.keys(selectedUser).length != 0}
                  />
                </div>

                <div className="flex flex-col h-full py-5">
                  <div className="flex flex-col h-full relative">
                    <div className="absolute top-5 bottom-0 left-0 w-full">
                      <div className="overflow-y-scroll  flex justify-center">
                        <div
                          className="w-1/2 flex flex-col"
                          style={{ height: "70vh" }}
                        >
                          {messages &&
                            messages.map((msg, key) =>
                              user && user.id != msg.senderid ? (
                                <div
                                  className="flex justify-start mb-4"
                                  key={key}
                                >
                                  <img
                                    src={selectedUser.avatarurl}
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
                                  <div className="mr-2 py-3 px-4  bg-[#1f2937] max-w-[480px] break-all rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
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
                              !(
                                selectedUser && Object.keys(selectedUser).length
                              )
                            }
                            className={`w-1/2  py-5 px-3 rounded-xl bg-[#36323270] outline-none border-[#2f2f2f] border-2 \
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
                  className={`flex flex-col bg-[#36323270] h-full w-full border-l-2 border-[#585858] toggleSidebar`}
                >
                  <div className="flex flex-row justify-start py-5 w-full px-5">
                    <div className="flex flex-row">
                      <div
                        className="flex justify-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-full p-2 w-10 h-10"
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
                    <div className="rounded-xl hover:bg-[#36323270] p-5 text-white">
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
    </LayoutProvider>
    // </div>
  );
};

export default Chat;
