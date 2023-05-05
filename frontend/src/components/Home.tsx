import React from "react"
import { Link } from 'react-router-dom'
import photo from '@SRC_DIR/assets/images/pong.jpg';
import Contacts from './Contacts';


const Home = () => {
    return (
    <div >
        <div className="items-center justify-center relative backdrop-blur-md z-[668] min-w-full  sm:text-center container mx-auto pt-5 text-2xl font-bold flex">
            <Link
                to="/profile"
                className="px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
            >
                Profile
            </Link>
            <Link
                to="/contacts"
                className="px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
            >
                Contacts
            </Link>
            <Link
                to="./chat"
                className="px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
            >
                Chat
            </Link>
            <Link
                to="/chanels"
                className="px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
            >
                Chanels
            </Link>
            <Link
                to="/"
                className="px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
            >
                SignOut
            </Link>
        </div>
        <div className="mt-8 relative w-full h-screen">
             <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="/" />

                <div className="grid place-items-center h-screen inline-flax">
                    <Link   
                         to="/thegame"
                         className="relative bg-black/80 hover:bg-gray-500 text-gray-100 font-bold py-5 px-16 rounded-2xl">
                              The Game Play
                    </Link>

            </div>
        </div>
    </div>);
};

export default Home;