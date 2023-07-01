import React from "react"
import photo from '@SRC_DIR/assets/images/pong.jpg';
import { Link } from 'react-router-dom'
import './styles/signin.css'; // Import the CSS file for styling

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

function getUrl() 
{
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const option = {
        redirect_uri: "http://localhost:3000/auth" as string,
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
        const handleGoogleSignIn = () => {
          // Implement the logic for Google sign-in here
        };
      
        const handle42SignIn = () => {
          // Implement the logic for 42 sign-in here
        };
        const ft_link = process.env.redirect_link ?? "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ba3aea4480c6fd2f33eb1c38078b70eb56bfc32316df9eed3ce24c731b6b48c1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fft_auth&response_type=code";
      
        return (
            <>
            <div className="signin">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                  </div>
            
                  <form onSubmit={handleGoogleSignIn}>
                    <h3>Login Here</h3>
                    <div className="social">
                      <div className="go">
                      <Link to={getUrl()}> <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" srcset="" /> </Link>
                      </div>
                      <div className="fb">
                      <Link to={ft_link}><img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg" alt="" srcset="" /> </Link>
                      </div>
                    </div>
                  </form>
            </div>
              
            </>
          );
        };


export default SignIn;
