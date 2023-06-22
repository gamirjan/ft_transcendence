import React, { useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import photo from '@SRC_DIR/assets/images/pong.jpg';
import Layout  from "./Layout";
import { useSelector } from "react-redux";
import { Store } from "redux";
import {store} from "./redux";


const Home = () => {
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user == null)
        {
            navigate("/",{replace:true}) 
            //return null
        }
    },[])
    console.log("useerrrr",store.getState());
   
    return (
    <Layout>
        <div className="mt-8 relative w-full h-screen">
             {/* <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="" /> */}
             <img className="absolute w-full h-full object-cover mix-blend-overlay" style={{opacity: "0.5", marginTop: "-32px"}}   src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/129325364/original/afaddcb9d7dfaaf5bff7ef04101935814665ac16/design-an-attractive-background-for-your-website.png" alt="" />

                <div className="grid place-items-center h-screen inline-flax">
                    <Link   
                         to="/thegame"
                         className="relative bg-black/80 hover:bg-gray-500 text-gray-100 font-bold py-5 px-16 rounded-2xl">
                              The Game Play
                    </Link>

            </div>
        </div>
    </Layout>
    )
}

export default Home;