import React from "react"
import photo from '@SRC_DIR/assets/images/pong.jpg';
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div>
            <div className="relative w-full h-screen">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="/" />
              
                <div className="grid place-items-center h-screen inline-flax">

                        <Link   
                            to="/home"
                            className="relative bg-black/80 hover:bg-gray-500 text-gray-100 font-bold py-4 px-16 rounded-2xl">
                                 SignIn
                        </Link>

                </div>

            </div>
        </div>
    )
}

export default SignIn;
