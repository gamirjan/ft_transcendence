import React from "react"
import { Layout } from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';



const Chat = () => {
    return ( 
        <Layout>
            <div className="mt-8 container mx-auto shadow-lg rounded-lg">
                <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                <div className="font-semibold text-2xl">Mikhayil Arzumanyan
                <h6 className="font-semibold text-lg">miarzuma</h6>
                </div>
                <div>
                    <img src={profile} className="w-40 border-4 border-white rounded-full"/>
                </div>
                </div>

                <div className="flex flex-row justify-between bg-white">

                <div style={{ height: '600px' }}
                    className="overflow-y-auto flex flex-col w-2/5 border-r-2">
                    <div className="border-b-2 py-4 px-2">
                    <input
                        type="text"
                        placeholder="search chatting"
                        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    />
                    </div>

                    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Arno Baboomian</div>
                        <div className="text-gray-500">arbaboom</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/otT2199XwI8/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Arman Kazaryan</div>
                        <div className="text-gray-500">armanarut</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Gevorg Amirjanyan</div>
                        <div className="text-gray-500">gamirjan</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">
                    <div className="w-1/4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-lg font-semibold">Vruyr Sargsyan</div>
                        <div className="text-gray-500">vrsargsy</div>
                    </div>
                    </div>

                </div>

                <div className="w-full px-5 flex flex-col justify-between">
                    <div style={{ height: '500px' }} className="overflow-y-auto flex flex-col mt-5">
                    <div className="flex justify-end mb-4">
                        <div
                        className="mr-2 py-3 px-4 bg-gray-200 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black"
                        >
                        Welcome to game everyone !
                        </div>
                        <img
                        src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                    </div>
                    <div className="flex justify-start mb-4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        Many new games can boast beautiful graphics in recent times. But some of them deserve a special attention.
                        </div>
                    </div>
                    <div className="flex justify-end mb-4">
                        <div>
                        <div className="mr-2 py-3 px-4 bg-gray-200 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                            According to experts, it is the integration of ray tracing that makes this game especially beautiful.
                        </div>

                        <div className="mt-4 mr-2 py-3 px-4 bg-gray-200 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                            Realistic graphics, well-detailed models, quality facial animation - all this makes the game's visuals really impressive.
                        </div>
                        </div>
                        <img
                        src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                    </div>

                    <div className="flex justify-start mb-4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        happy holiday guys!
                        </div>
                    </div>

                    <div className="flex justify-start mb-4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        happy holiday guys!
                        </div>
                    </div>

                    <div className="flex justify-start mb-4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        happy holiday guys!
                        </div>
                    </div>

                    <div className="flex justify-start mb-4">
                        <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                        />
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        happy holiday guys!
                        </div>
                    </div>

                    </div>
                    <div className="py-5">
                        <button className="w-1/12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 px-4 rounded-xl">
                            Game
                        </button>

                        <input
                        className="w-10/12  bg-gray-300 py-5 px-3 rounded-xl"
                        type="text"
                        placeholder="type your message here..."
                        />
                        <button className="w-1/12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 px-4 rounded-xl">
                            Send
                        </button>
                    </div>
                </div>

                <div className="w-2/5 border-l-2 px-5">
                    <div className="flex flex-col">
                    <div className="font-semibold text-2xl">Gevorg Amirjanyan</div>
                    <h6 className="font-semibold text-lg">gamirjan</h6>
                    <img
                        src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                        className="object-cover rounded-xl h-64 py-5"
                        alt=""
                    />
                    <div className="font-semibold py-4">Created 12 June 2023</div>

                    </div>
                    </div>
                </div>
                </div>
        </Layout>
        )
    }

export default Chat;
