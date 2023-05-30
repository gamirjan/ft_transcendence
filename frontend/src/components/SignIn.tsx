import React from "react"
import photo from '@SRC_DIR/assets/images/pong.jpg';
import { Link } from 'react-router-dom'

function getUrl() 
{
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const option = {
        redirect_uri: "http://localhost:7000/auth/google/redirect" as string,
        client_id : "472681490682-cofucv7fr3j0v654ti873v4flktohgdq.apps.googleusercontent.com" as string,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),

    };
    const qs  = new URLSearchParams(option);
    return `${rootUrl}?${qs.toString()}`;
}

const SignIn = () => {
    return (
        <div>
            <div className="relative w-full h-screen">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="/" />
              
                <div className="grid place-items-center h-screen inline-flax">

                        <Link   
                            to={getUrl()}
                            className="relative bg-black/80 hover:bg-gray-500 text-gray-100 font-bold py-4 px-16 rounded-2xl">
                                 SignIn
                        </Link>

                </div>

            </div>
        </div>
    )
}

export default SignIn;
