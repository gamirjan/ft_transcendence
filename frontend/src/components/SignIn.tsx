import React, { useEffect } from "react";
import photo from "@SRC_DIR/assets/images/pong.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./styles/signin.css"; // Import the CSS file for styling
import { ip } from "./utils/ip";
import { useSelector } from "react-redux";

/*import React from 'react';

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    // Implement the logic for Google sign-in here
  };

  const handle42SignIn = () => {
    // Implement the logic for 42 sign-in here
  };

  return (
    <div className="parallax-container">
      <div className="parallax-content">
        <h1>Welcome to the Login Page!</h1>
        <button onClick={handleGoogleSignIn>Sign in with Google</button>
        <button onClick={handle42SignIn}>Sign in with 42</button>
      </div>
    </div>
  );
};

export default LoginPage; 



*/

function getUrl() {
  console.log("havayiiiiii", process.env.CLIENT_ID);

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const option = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
    client_id: process.env.CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(option);
  return `${rootUrl}?${qs.toString()}`;
}

const SignIn = () => {
  const user = useSelector(state=>state.user)
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    // if (user) navigate("/home", {replace: true});
    // Implement the logic for Google sign-in here
  };

  // const handle42SignIn = () => {
  //   if (user) navigate("/twofactor", {replace: true});
  //   // Implement the logic for 42 sign-in here
  // };
 useEffect(()=>{
  if (user) navigate("/home", {replace: true});
 })
  const ft_link =
    process.env.redirect_link ??
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ba3aea4480c6fd2f33eb1c38078b70eb56bfc32316df9eed3ce24c731b6b48c1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fft_auth&response_type=code";

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden min-h-full max-h-full text-[#aaaaaa] bg-[#181818] w-full">
        <div className="flex flex-row sticky shadow bg-[#212121] top-0 z-[2] border-2 border-[#0f0f0f] justify-around py-3"></div>
        <div className="flex flex-col h-full">
          <div className="relative flex flex-col h-full justify-center">
            {/* <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="" /> */}
            <img
              className="absolute w-full h-full object-cover mix-blend-overlay"
              style={{ opacity: "0.5" }}
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/129325364/original/afaddcb9d7dfaaf5bff7ef04101935814665ac16/design-an-attractive-background-for-your-website.png"
              alt=""
            />
            <div className="grid place-items-center inline-flax">
              <div className="signin">
                <div className="background">
                  <form onSubmit={handleGoogleSignIn}>
                    <div className="shape">
                      <Link to={getUrl()}>
                        {" "}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          alt=""
                          srcSet=""
                        />{" "}
                      </Link>
                    </div>
                    <div className="eye shape-2 text-slate-500 text-3xl flex justify-center items-center">
                      Login
                    </div>
                    <div className="eye shape-1 text-slate-500 text-3xl flex justify-center items-center">
                      Here
                    </div>
                    <div className="shape">
                      <Link to={ft_link}>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg"
                          alt=""
                          srcSet=""
                        />{" "}
                      </Link>
                    </div>
                  </form>
                </div>

                {/* <h3>Login Here</h3>
                    <div className="social">
                      <div className="go rounded-full">
                      <Link to={getUrl()}> <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" srcSet="" /> </Link>
                      </div>
                      <div className="fb">
                      <Link to={ft_link}><img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg" alt="" srcSet="" /> </Link>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
