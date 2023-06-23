import React, { useEffect } from "react"
import  Layout  from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "./redux";

const get_game_info =async (param:object)=>{
     let res  = await fetch(`http://localhost:7000/game/user/${param.id}`)
     console.log(res);
     
    return res;
}

const Profile = () => {
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();
    let games = []
    useEffect(()=>{
        if(user == null)
        {
            navigate("/",{replace:true}) 
            //return null
        }
        else{

            fetch(`http://localhost:7000/game/user/${user.id}`)
            .then(response => {
                if (!response.ok) {
                  throw new Error('Request failed');
                }
                return response.json(); // assuming the server returns JSON data
              })
              .then(data => {
                // Process the response data
                games = data.data
                console.log(games,Object.keys(games).length);
                
                //console.log(data);
              })
              .catch(error => {
                // Handle any errors
                console.log(error);
              });
        }
        /*  const  game_info = get_game_info(user);
        console.log("game info",game_info); */
    },[])
    console.log("useerrrrprofile",store.getState());
    return (
        <Layout>
        <div className="">
            <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded">
            </div>

            <div className="flex flex-col items-center mt-10">
                <img src={user.avatarurl} className="w-40 border-4 border-white rounded-full"/>
                <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl">{user.displayname}</p>

                </div>
                <p className="text-gray-700">miarzuma</p>
                <p className="text-sm text-gray-500"> Created 7 June 2023</p>
                <div className="flex">
                    <button className="mr-2 w-1/2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Friend
                    </button>
                    <button className="mr-2 w-1/2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Chat
                    </button>
                    <button className="mr-2 w-1/2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Black
                    </button>
                </div>
            </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 flex justify-center mt-14">
            <div className="flex flex-col">
                <div className="flex-1 bg-white rounded-t-lg shadow-xl p-8">
                    <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Birthday:</span>
                            <span className="text-gray-700">2 Nov, 1984</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Mobile:</span>
                            <span className="text-gray-700">(123) 123-1234</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-700">mikhayil.arzumanyan@gmail.com</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Location:</span>
                            <span className="text-gray-700">Yerevan, Armenia</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Languages:</span>
                            <span className="text-gray-700">Arminian, Russian, English</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex-1 bg-white rounded-t-lg shadow-xl p-8">
                    <h4 className="text-xl text-gray-900 font-bold">Game Info</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Total:</span>
                            <span className="text-gray-700">{Object.keys(games).length}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Wins:</span>
                            <span className="text-gray-700">6</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Loses:</span>
                            <span className="text-gray-700">7</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Win Ratio:</span>
                            <span className="text-gray-700">47%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Profile;
