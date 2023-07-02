 import React, { useEffect } from "react"
import  Layout  from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';
import { useState } from "react"
import ChatMsg from "./ChatMsg";
import { IMassage } from "./utils/index";
import { socket } from "./Socket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ip } from "./utils/ip";
import { Box, Button, Card, CardBody, CardFooter, Center, Flex, Grid, GridItem, Heading, Image, Square, Stack, Text } from "@chakra-ui/react";



const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length);

let username  : string | null = "";
username = generateRandomString(8);

// read id in querystring

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const chatid = urlParams.get('id');

// window.onload = function () {
//     socket.emit(`online`, chatid);
// };

const Chat = () => {
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

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
        <Grid
                templateAreas={`"header header"
                                "nav main"
                                "nav footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'150px 1fr'}
                h='200px'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
                >
            <GridItem pl='2' bg='orange.300' area={'header'}>
                <Layout></Layout>
            </GridItem>
            <GridItem pl='2' bg='pink.300' area={'nav'}>

                <Flex color='white' flexDirection="column" width="200px">
                        {contacts.map((elem)=>(
                            <Card>
                                    <Center w='100px' bg='green.500'>
                                      <Image width="64px" height="64px" borderRadius="32px" src={elem.user.avatarurl}></Image>
                                    </Center>
                                    <Square bg='blue.500' size='20px'>
                                      <Text color="black">{elem.user.displayname}</Text>
                                    </Square>
                            </Card>
                               ))}
                               </Flex>
                </GridItem>
                <GridItem pl='2' bg='green.300' area={'main'}>
                 Main
                 </GridItem>
                <GridItem pl='2' bg='blue.300' area={'footer'}>
                 Footer
                 </GridItem>
        </Grid>


        )
    }

export default Chat;

 {/*  <div className="mt-8 container mx-auto shadow-lg rounded-lg">
                <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                <div className="font-semibold text-2xl">{user.displayname}
                <h6 className="font-semibold text-lg">hidden</h6>
                </div>
                <div>
                    <img src={user.avatarurl} className="w-40 border-4 border-white rounded-full"/>
                </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 flex flex-row justify-between bg-white">

                        <div style={{ height: '600px' }}
                            className="overflow-y-auto flex flex-col border-r-2">
                            <div className="border-b-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                            </div>

                               {contacts.map((elem)=>(
                                   <>
                                    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                        <div className="w-1/4">
                                        <img
                                        src={elem.user.avatarurl}
                                        className="object-cover h-12 w-12 rounded-full"
                                        alt=""
                                        />
                                    </div>
                                    <div className="w-full">
                                        <div className="text-lg font-semibold">{elem.user.displayname}</div>
                                        <div className="text-gray-500">{elem.user.email}</div>
                                    </div>
                                    </div>
                                 </>
                               ))}
                        </div>

                        <div className="col-span-2 px-5 flex flex-col justify-between">
                            <div id="chatBoard" style={{ height: '500px' }} className="overflow-y-auto flex flex-col mt-5">
                                {textMessages && textMessages.map((buff) => (
                                    <ChatMsg
                                        massage = {buff.msg}
                                        user = {user}
                                    />
                                ))}
                            </div>
                            <div className="py-5">
                                <form onSubmit={(event) => sendMessage(event)}>
                                    <button className="w-2/12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 px-4 rounded-xl">
                                        Game
                                    </button>
                                    <input 
                                        className="w-8/12  bg-gray-300 py-5 px-3 rounded-xl"
                                        type="text" 
                                        placeholder="your message..." 
                                        aria-label="your message..." 
                                        aria-describedby="basic-addon2" 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        id="msg" required
                                    />
                                    <button 
                                        id="sendMsg" 
                                        type="submit"
                                        className="w-2/12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 px-4 rounded-xl">
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>

                    <div className="border-l-2 px-5">
                        <div className="flex flex-col">
                        <div className="font-semibold text-2xl">Gevorg Amirjanyan</div>
                        <h6 className="font-semibold text-lg">gamirjan</h6>
                        <img
                            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                            className="object-cover rounded-xl h-64 py-5"
                            alt=""
                        />
                        <div className="font-semibold py-4">Created 12 June 2023</div>

                        </div>
                        </div>
                    </div>
                </div> */}


