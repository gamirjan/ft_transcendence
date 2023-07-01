import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ip } from "./utils/ip";

const Contacts = () => {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
    }
  }, []);

  const handleSearch =  (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]);
      return;
    }

     fetch(`${ip}:7000/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
       console.log(data);
       
        const regex = new RegExp('.*' + e.target.value + '.*');

         setSuggestions( data.filter((obj)=>{
            return regex.test(obj.displayname)
         }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleAddFriend = () => {
    console.log(selectedUser);
    
    if (selectedUser) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userid:user.id,friendid:selectedUser.id}),
      };

      fetch(`${ip}:7000/friends`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          // Handle success response
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert(" the user is already in your friend list just refresh the page")
        });
    }
  };

  const filteredContacts = contacts.filter((elem) =>
    elem.user.displayname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>

        <div className="flex mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 mr-2 w-1/2"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredContacts.map((elem) => (
            <div
              key={elem.user.id}
              className="bg-white shadow rounded-md p-4 flex items-center"
            >
              <img
                src={elem.user.avatarurl}
                alt="Avatar"
                className="w-32 h-32 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-bold">{elem.user.displayname}</h2>
                <p className="text-gray-600">
                  {elem.user.email ? elem.user.email : "Hidden"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Suggestions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className={`bg-white shadow rounded-md p-4 flex items-center ${
                  user === selectedUser ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleSelectUser(user)}
              >
                <img
                  src={user.avatarurl}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold">{user.displayname}</h2>
                  <p className="text-gray-600">
                    {user.email ? user.email : "Hidden"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {selectedUser && (
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
                onClick={handleAddFriend}
              >
                Add Friend
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
