import React from "react"
import { Link } from 'react-router-dom'
import photo from '@SRC_DIR/assets/images/pong.jpg';
import { Layout } from "./Layout";


const Home = () => {
    return (
    <Layout>
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
    </Layout>
    )
}

export default Home;