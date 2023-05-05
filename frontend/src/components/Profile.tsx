import React from "react"
import { Layout } from "./Layout";
import photo from '@SRC_DIR/assets/images/pong.jpg';


const Profile = () => {
    return (
        <Layout>
            <div className="mt-8 relative w-full h-screen">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="/" />

            <div className="grid place-items-center h-screen">
                <div className="rounded-2xl p-16 w-[950px]  h-[550px] bg-white/95">
                    <div className="flax justify-between items-center ">
                        <img 
                        src="/assets/images/man.png" className="rounded-full border-2 border-black border-solid w-20 h-20" alt=""/>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default Profile;
