import React from "react"
import { Layout } from "./Layout";
import photo from '@SRC_DIR/assets/images/pong.jpg';


const Profile = () => {
    return (
        <Layout>
        <div className="mt-12">
            <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded">
                <button className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                </button>

            </div>

            <div className="flex flex-col items-center -mt-20">
                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" className="w-40 border-4 border-white rounded-full"/>
                <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl">Amanda Ross</p>
                    <span className="bg-blue-500 rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                <p className="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
                <p className="text-sm text-gray-500"> New York, USA </p>
            </div>

        </div>

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                            <span className="font-bold w-24">Full name:</span>
                            <span className="text-gray-700">Amanda S. Ross</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Birthday:</span>
                            <span className="text-gray-700">24 Jul, 1991</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Joined:</span>
                            <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Mobile:</span>
                            <span className="text-gray-700">(123) 123-1234</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-700">amandaross@example.com</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Location:</span>
                            <span className="text-gray-700">New York, US</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Languages:</span>
                            <span className="text-gray-700">English, Spanish</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Profile;