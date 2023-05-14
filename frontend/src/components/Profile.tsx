import React from "react"
import { Layout } from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';


const Profile = () => {
    return (
        <Layout>
        <div className="">
            <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded">
            </div>

            <div className="flex flex-col items-center mt-10">
                <img src={profile} className="w-40 border-4 border-white rounded-full"/>
                <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl">Mikhayil Arzumanyan</p>

                </div>
                <p className="text-gray-700">miarzuma</p>
                <p className="text-sm text-gray-500"> Created 7 June 2023</p>
                <div className="flex">
                    <button className="mr-2 w-1/2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Friend
                    </button>
                    <button className="ml-2 w-1/2 mt-3 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Black
                    </button>
                </div>
            </div>

        </div>

        <div className="flex flex-col items-center mt-2">
            <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-t-lg shadow-xl p-8">
                    <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Birthday:</span>
                            <span className="text-gray-700">2 Nov, 1984</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Mobile:</span>
                            <span className="text-gray-700">(123) 123-1234</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-700">mikhayil.arzumanyan@gmail.com</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Location:</span>
                            <span className="text-gray-700">Yerevan, Armenia</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Languages:</span>
                            <span className="text-gray-700">Arminian, Russian, English</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full flex flex-col 2xl:w-1/3">
                <div className="flex-1 bg-white rounded-b-lg shadow-xl p-8">
                    <h4 className="text-xl text-gray-900 font-bold">Game Info</h4>
                    <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                            <span className="font-bold w-24">Total:</span>
                            <span className="text-gray-700">13</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Wins:</span>
                            <span className="text-gray-700">6</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Loses:</span>
                            <span className="text-gray-700">7</span>
                        </li>
                        <li className="flex border-b py-2">
                            <span className="font-bold w-24">Win Ratio:</span>
                            <span className="text-gray-700">47%</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default Profile;
