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
    const [selectedUser, setSelectedUser] = useState({});

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
    <div className='layout'>
        <div className='left'>
            <div className='search_bar'>
                <input type='text' placeholder='search'></input>
            </div>
            <div className='content_box'>
                {contacts.map((elem)=>(
                    <div className='content' onClick={()=>setSelectedUser(elem.user)}>
                        <img src={elem.user.avatarurl} alt="" srcset="" />
                        <div className='content_name'>{elem.user.displayname}</div>
                    </div>

                ))}
            </div>
        </div>
        <div className='right'>
            <div className="top_bar">
                <div className="user">
                    <img src={selectedUser.avatarurl ?? ""} alt="nnn" srcset="" />
                    <div>{selectedUser.displayname ?? "Saved Messege"}</div>
                </div>
            </div>
            <div className="messeges">
                <div className="messege_you">
                    <div className="msg">hello</div>
                </div>
                <div className="messege_other">
                   <div className="msg">wasup!?</div> 
                </div>
            </div>
            <div className="input">
                <div className="mess">
                    <input type="text" name="" id="" placeholder='Message'/>
                <div className="but">

                    <button type="submit">Send</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat