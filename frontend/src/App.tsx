import React from "react";
import "./App.css";
import Home from './components/Home';
import Chat from './components/Chat';
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";
import TheGame from "./components/TheGame";
import Chanels from "./components/Chanels";
import SignIn from "./components/SignIn";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";


function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/thegame" element={<TheGame />} />
            <Route path="/chanels" element={<Chanels />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
       </Router>
  )
}

export default App;
