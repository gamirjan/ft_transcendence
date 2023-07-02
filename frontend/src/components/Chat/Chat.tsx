import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../Socket';
import { ip } from '../utils/ip';
import { IMassage } from '../utils';
function Chat() {

    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUser, setSelectedUser] = useState({user:{}});
    const [selectedUserName, setSelectedUserName] = useState("");
    const [messages, setMessages] = useState([]);
  

    const handleSelectUser = (e) => {
      setSelectedUser(e);
      setSelectedUserName(selectedUser.displayname);
    }
    useEffect(() => {
        const onConnect = () => {
            console.log("CONNECTED")
        }

        const onOnline = (p) => {
            console.log("ONLINE", p)
            // fetchMessages();
            
            // console.log();
            
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
    const fetchMessages = () => {
      if (user == null) 
          navigate("/", { replace: true });
      else {
        fetch(`${ip}:7000/directmessages/messages/${user.id}/${selectedUser.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Request failed");
            }
            return response.json(); // assuming the server returns JSON data
          })
          .then((data) => {
            // console.log(data);
            
            setMessages(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
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
            // console.log(selectedUser);
            
            if (Object.keys(selectedUser).length)
            {
              fetchMessages();
              // console.log(messages);

            }
            
        }
      }, [selectedUserName]);
     
      // const selectedChat = (e)=>{
      //   setSelectedUser((e)=>{e.user})
      //   let user_ = e.user
      //    setSelectedUser(user_);
      //   //console.log(selectedUser);
      // }

    const [textMessages, setTextMessages] = useState<IMassage[] | undefined>(undefined);
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();

            let msg = message;
            msg =  msg.replace(/(<([^>]+)>)/gi, "");
            console.log("msgggggg",msg);
            
            console.log("sending msg: " + msg + " from " + username);
            socket.emit('chat', {data:user,"msg" : msg, "userid" : chatid, "username" : username});

        setMessage("");
    }

   

    socket.on('participants', function(count) {
        console.log("online :" + count);
    });

  return (
    <div className="container mx-auto shadow-lg rounded-lg">
            {/* <!-- headaer --> */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">Chat</div>
          <div className="w-1/2">
            <div className="flex justify-center mb-4">
                <img
                  src={selectedUser.avatarurl ?? ""}
                  className="object-cover h-10 w-10 rounded-full"
                  alt=""
                  />
                  <div
                    className="ml-2 py-3 px-4 bg-black rounded-xl text-white"
                  >
                    {selectedUser.displayname ?? "Saved Messege"}
                  </div>
              </div>
          </div>
          <div
            className="h-12 w-12 p-2 bg-black rounded-full text-white font-semibold flex items-center justify-center"
          >
            RA
          </div>
        </div>
        {/* <!-- end header --> */}
        {/* <!-- Chatting --> */}
        <div className="flex flex-row justify-between bg-white">
          {/* <!-- chat list --> */}
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {/* <!-- search compt --> */}
            <div className="border-b-2 py-4 px-2">
              <input
                type="text"
                placeholder="search chatting"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              />
            </div>
            {/* <!-- end search compt -->
            <!-- user list --> */}
            {contacts.map((elem)=>(
                <div
                className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:cursor-pointer hover:bg-gray-400"
                onClick={()=>handleSelectUser(elem.user)}
              >
                <div className="w-1/4">
                  <img
                    src={elem.user.avatarurl} alt="" srcSet=""
                    className="object-cover h-12 w-12 rounded-full"
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">{elem.user.displayname}</div>
                </div>
              </div>
            ))}
            
            {/* <!-- end user list --> */}
          </div>
          {/* <!-- end chat list --> */}
          {/* <!-- message --> */}
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              {/* {console.log("messages: ", messages) }
              {console.log("user: ", user) } */}
              {messages.map((msg)=>(
                user.id == msg.senderid ? 
              <div className="flex justify-start mb-4">
                <img
                  src={user.avatarurl}
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div
                  className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                >
                 {msg.message}
                </div>
              </div>
              :
              <div className="flex justify-end mb-4">
                <div
                  className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                >
                  {msg.message}
                </div>
                <img
                  src={selectedUser.avatarurl}
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
          
              ))}
              {/* <div className="flex justify-end mb-4">
                <div>
                  <div
                    className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Magnam, repudiandae.
                  </div>
    
                  <div
                    className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis, reiciendis!
                  </div>
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div> */}
              {/* <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div
                  className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                >
                  happy holiday guys!
                </div>
              </div> */}
            </div>
            { (selectedUser.user && Object.keys(selectedUser.user).length) ? <div className="py-5">
              <input
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
              />
            </div>
            :
            <></>
}
          </div>
          {/* <!-- end message --> */}
         
          </div>
        </div>
    // </div>
  )
}

export default Chat