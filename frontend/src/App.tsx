import React from "react";
import "./App.css";
import Home from './components/Home';
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";
import TheGame from "./components/TheGame";
import Chanels from "./components/Chanels";
import SignIn from "./components/SignIn";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Auth from "./components/Auth";
import Ft_Auth from "./components/Ft_Auth";
import { Provider, useSelector } from "react-redux";
import store from "./components/redux";
import Out from "./components/Out";
import ChannelComponent from "./components/Channels";
import PingPongGame from "./components/Pingpong";
import ChatComponent from "./components/ChatComponent";
import Chat from "./components/Chat/Chat";
import GameComponent from "./components/game/Game";
import GameOne from "./components/game/OneVOne";
import Pong from "./components/game/OneVOne";
import PingPong from "./components/game/OneVOne";


function App() {

  
  return (
        <Router>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/channels" element={<ChannelComponent/>} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/landing" element={<LandingPage />} /> */}
			<Route path="/auth" element={<Auth/>}/>
      <Route path="/ft_auth" element={<Ft_Auth/>}/>
      <Route path="/out" element={<Out/>}/>
      {/* <Route path="/thegame" element={<PingPong/>}/> */}
      <Route path="/chat1" element={<ChatComponent/>}/>
      <Route path="/chanel" element={<Chanels/>}/>
      <Route path="/game" element={<GameComponent/>}/>
      <Route path="/mainGame" element={<PingPong width={800} height={300}/>}/>

          </Routes>
       </Router>
  )
}

export default App;
