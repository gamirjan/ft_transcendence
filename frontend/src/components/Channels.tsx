import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ip } from './utils/ip';

const ChannelComponent = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  useEffect(() => {
      if (user == null) 
          navigate("/", { replace: true });
      else {
        fetch(`${ip}:7000/channels/user/${user.id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Request failed");
            }
            return response.json(); // assuming the server returns JSON data
          })
          .then((data) => {
            setChannels(data);
            console.log("dddddd",data);
            
          })
          .catch((error) => {
            console.log(error);
          });
       /*  fetch(`http://localhost:7000/friends/${user.id}`)
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
          }); */
      }
    }, []);
   
  
    const handleChannelSelect = (channel) => {
      setSelectedChannel(channel);
    };
  
    const handleSettingsToggle = () => {
      setShowSettings(!showSettings);
    };
  
    const handleCreateChannel = () => {
      setShowCreateChannelModal(true);
    };
  
    const handleModalClose = () => {
      setShowCreateChannelModal(false);
      setNewChannelName('');
    };
  
    const handleChannelNameChange = (e) => {
      setNewChannelName(e.target.value);
    };
  
    const handleAddChannel = () => {
      // Add logic to create a new channel with the newChannelName
      // You can use the newChannelName state value to create a new channel
      // and update the channel list accordingly
      /*
       channelType: "1" | "2" | "3";
    channelName: string;
    owner: User; 
    */
      const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({   
               channelType: "1",
              channelName: newChannelName,
              owner: user }),
        };
  
        fetch(`${ip}:7000/channels`, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Request failed");
            }
            // Handle success response
            console.log(response,response.body);
            window.location.reload();

            
            
          })
          .catch((error) => {
            console.log(error);
            alert(" the user is already in your friend list just refresh the page")
          });
      console.log(`Creating channel: ${newChannelName}`);
      handleModalClose();
    };
  
    return (
        <Layout>
      <div className="flex h-screen">
        <div className="channel-list bg-gray-800 text-white p-4 w-1/3">
          <ul>
            {channels.map((elem)=>(
                <li
                    className={`py-2 cursor-pointer hover:bg-gray-700 ${
                        selectedChannel === elem.channelname ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => handleChannelSelect(elem.channelname)}
                    >
                        {elem.channelname}
                </li>

            ))}
          </ul>
          <div className="fixed bottom-4 left-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleCreateChannel}
            >
              Create Channel
            </button>
          </div>
        </div>
        <div className="chat-container bg-gray-100 p-4 w-2/3 relative">
          <div
            className="absolute top-0 right-0 m-4 cursor-pointer"
            onClick={handleSettingsToggle}
          >
            <div
              className={`hamburger-menu ${showSettings ? 'open' : ''}`}
            >
                
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Chat</h2>
          <div className="bg-white rounded-lg p-4 mt-4">
            {selectedChannel ? (
              <p>Chat for {selectedChannel}</p>
            ) : (
              <p>Please select a channel</p>
            )}
          </div>
          {showSettings && (
            <div className="settings-menu absolute top-0 right-0 mt-12 mr-4 bg-white rounded-lg p-4">
              <ul>
                <li className="py-2">Invite Member</li>
                <li className="py-2">Remove Member</li>
                <li className="py-2">Show Members</li>
              </ul>
            </div>
          )}
          {showCreateChannelModal && (
            <div className="modal-overlay fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
              <div className="modal bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Create Channel</h2>
                <input
                  type="text"
                  placeholder="Enter channel name"
                  value={newChannelName}
                  onChange={handleChannelNameChange}
                  className="border border-gray-300 p-2 rounded mb-4"
                />
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={handleAddChannel}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </Layout>
    );
  };
  
  export default ChannelComponent;
