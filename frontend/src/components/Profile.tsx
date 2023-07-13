import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import profile from "@SRC_DIR/assets/images/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, store } from "./redux";
import { ip } from "./utils/ip";
import LayoutProvider from "./LayoutProvider";
import FileUploadForm from "./file/fileUpload";
import { FaPen } from 'react-icons/fa';
import Nick from "./nickname/nickname";

const get_game_info = async (param: object) => {
  let res = await fetch(`${ip}:7000/game/user/${param.id}`);
  console.log(res);

  return res;
};

const Profile = () => {
  const user = useSelector((state: AppState) => state.user);
  const userByID = user;
  const [TFA, setTFA] = useState(user.istwofactorenabled);
  const [TFAEmail, setTFAEmail] = useState(user.twofactoremail);
  const [modal,setmodal] = useState(false);
  const navigate = useNavigate();
  const [nick,setNick] = useState(false);
  let games = [];
  const fetchTFA = async () => {
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
    if (TFA) {
      const params = {
        userid: user.id,
        email: TFAEmail,
      };
      console.log(JSON.stringify(params));

      fetch(`${ip}:7000/twofactor/enable`, {
        method: "POST",
        // mode:'no-cors',
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("enabled?");
          console.log(response);
          if (!response.ok)
            return ;
        })
        .then((data) => {
          dispatch(setUser({
            ...user,
            istwofactorenabled: true
          }))
          console.log("enabled?");
          console.log(data);
          console.log("user: ", user);
          
        })
        .catch((error) => {
          console.log("error: ", error);

          // Handle any errors that occur during the request
          console.log(error);
        });
    } else {
      const params = {
        userid: user.id,
      };
      fetch(`${ip}:7000/twofactor/disable`, {
        method: "POST",
        // mode:'no-cors',
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("enabled?");
          console.log(response);

          if (!response.ok)
            return ;
        })
        .then((data) => {
          dispatch(setUser({
            ...user,
            istwofactorenabled: false
          }))
          console.log("disabled?");
          console.log(data);
          console.log("user: ", user);
        })
        .catch((error) => {
          console.log("error: ", error);

          // Handle any errors that occur during the request
          console.log(error);
        });
    }
  };
  let scores = {
    "ScoreWins": 10,
    "ScoreLoses": 5
  };
  // fetch(`${ip}:7000/game/${user.id}/scores`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(scores),
  // })
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Request failed");
  //   }
  //   return response.json(); // assuming the server returns JSON data
  // })
  // .then((data) => {
  //   scores = data;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  useEffect(() => {
    console.log("TFA: ", TFA);
    fetchTFA();
  }, [TFA, user]);
    console.log("modddalll",modal);
    
  }, [TFA,modal,nick]);
  // useEffect(()=>{
  //     if(user == null)
  //     {
  //         navigate("/",{replace:true})
  //         //return null
  //     }
  //     else{

    //         fetch(`${ip}:7000/game/user/${user.id}`)
    //         .then(response => {
    //             if (!response.ok) {
    //               throw new Error('Request failed');
    //             }
    //             return response.json(); // assuming the server returns JSON data
    //           })
    //           .then(data => {
    //             // Process the response data
    //             games = data.data
    //             console.log(games,Object.keys(games).length);
                
    //             //console.log(data);
    //           })
    //           .catch(error => {
    //             // Handle any errors
    //             console.log(error);
    //           });
    //     }
    //     /*  const  game_info = get_game_info(user);
    //     console.log("game info",game_info); */
    // },[])
    // console.log("useerrrrprofile",store.getState());
    const handleModalOpen = ()=>{
      setmodal(true);
    }
    return (
        <LayoutProvider>
        <div className="">
        {modal && <FileUploadForm/>}
        {nick && <Nick/>}
        <div className="flex flex-row justify-center z-[-1]" style={{zIndex:-1111111111}}>
                  <div className="flex flex-col items-center" style={{ width: "30%", height: "100%" }}>
                <p className="text-sm text-gray-500 py-2">Created 7 June 2023</p>
                <div className="">
                  <img src={user.avatarurl} className="border-4 border-white rounded-full" style={{ width: "80%", height: "80%" ,zIndex:-1000}} />
                  <button
                    className=" w-10  bottom-0 right-0 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                    onClick={() => setmodal(prevModal => !prevModal)}
                  >
                    <FaPen size={16} color="#000" />
                  </button>
                </div>
                <p className="text-2xl text-center" >{user.displayname}</p>
                <FaPen onClick={()=>{setNick(prevprop => !prevprop)}}/>
                <div >
                </div>
              </div>
            
                    {/* onClick={() => setmodal(prevModal => !prevModal)} */}
            <div className="flex flex-col" style={{width:"30%"}}>
                <div 
                    className="flex items-center hover:cursor-pointer"
                    style={{width:"40%"}}
                    onClick={()=>setTFA(!TFA)}
                >
                    <div className="flex flex-col justify-center items-center self-start py-3">
                        <span className="text-lg font-bold p-3">TFA: </span>
                    </div>
                    <div className="flex items-center relative w-max cursor-pointer select-none justify-end"
                    >
                    <input 
                        type="checkbox" 
                        checked={TFA}
                        onChange={(e)=>{
                            setTFA(e.target.value == "on" ? true : false)}}
                        className="appearance-none transition-colors m-0 cursor-pointer outline-none w-14 rounded-full focus:outline-none  bg-red-500 checked:bg-green-600" 
                    />
                    <span className="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                    <span className="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
                    <span className={`w-7 h-7 ${TFA ? "right-0" : "right-[1.8rem]"} top-[0.1rem] absolute rounded-full transform transition-transform bg-gray-200 `} />

                    </div>
                </div>

                {/* {TFA ? ( */}
                <div className="" style={{width:"80%", height:"50%"}}>
                    <div className="flex flex-col justify-center items-center">Two Factor Email</div>
                    
                    <div className="flex flex-col">
                        <form>
                            <input
                                type="email"
                                onChange={(e)=>{setTFAEmail(e.target.value)}}
                                name="email" id=""
                                value={TFAEmail}
                                placeholder="TFA Email"
                                className="bg-[#212121] border-2 border-transparent hover:border-2 outline-none hover:border-[#313131] text-[#aaaaaa] rounded-xl"
                                required
                            />
                            <button 
                            // type="submit"
                            className="m-2 py-2 text-sm bg-[#212121] hover:bg-[#313131] rounded-xl text-[#aaaaaa]"
                            style={{width:"50%"}}
                            onClick={()=>setTFA(prevstate => !prevstate)}
                            >
                                Save changes
                            </button>
                        </form>
                    </div>
                </div>
                {/* ) : (<></>)} */}
            </div>

            <div className="flex flex-col">
                <button className="mr-2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Friend
                </button>
                <button className="mr-2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Chat
                </button>
                <button   
                onClick={()=>alert("Comming Soon")}
                className="mr-2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Black
                </button>
            </div>
        </div>

        </div>

        <div className="text-xs md:text-sm bg-[#8a828236] backdrop-blur border-2 border-[#585858] rounded-t-lg shadow-xl flex justify-center mt-10" style={{maxHeight: "40vh", minWidth: '50vw'}}>
            <div className="flex flex-col w-full">
                <div className=" p-8 w-full flex flex-col justify-center items-center">
                    <h4 className="text-xs md:text-lg text-white font-bold">Personal Info</h4>
                    <ul className="mt-2 text-gray-400">
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Birthday:</span>
                            <span className="text-gray-300">Hidden</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Mobile:</span>
                            <span className="text-gray-300">Hidden</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-300">{userByID.twofactoremail}</span>
                        </li>
                        <li className="flex border-b py-2 flex-row justify-between ">
                            <span className="font-bold w-24 self-start">Loses:</span>
                            <span className="text-gray-300 self-end">7</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="p-8">
                    <h4 className="text-xs md:text-lg text-white font-bold">Game Info</h4>
                    <ul className="mt-2 text-gray-400">
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Total:</span>
                            <span className="text-gray-300">{`${scores.ScoreWins + scores.ScoreLoses}`}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Wins:</span>
                            <span className="text-gray-300">{scores.ScoreWins}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Loses:</span>
                            <span className="text-gray-300">{scores.ScoreLoses}</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Win Ratio:</span>
                            <span className="text-gray-300">{Math.round(scores.ScoreWins / (scores.ScoreWins + scores.ScoreLoses) * 100)}%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </LayoutProvider>
    )
}

export default Profile;
