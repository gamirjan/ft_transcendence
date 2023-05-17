import React from 'react'
import { Link } from 'react-router-dom'

export const Layout = ({children}) => {
    return (
        <div className="">
            <div className="">
              <div>
                <div className="items-center justify-center relative backdrop-blur-md z-[668] min-w-full  sm:text-center container mx-auto pt-5 text-2xl font-bold flex">
                <Link
                        to="/home"
                        className="hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300  rounded-2xl px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                        Home
                    </Link>
                    <Link
                        to="/profile"
                        className="hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-2xl px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/contacts"
                        className="hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-2xl px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                        Contacts
                    </Link>
                    <Link
                        to="/chat"
                        className="hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-2xl px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                        Chat
                    </Link>
                    <Link
                        to="/chanels"
                        className="hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-2xl px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                        Channels
                    </Link>
                    <Link
                        to="/"
                        className="hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-2xl px-10 text-1xl mx-14 font-semibold leading-7 text-black-900"
                    >
                        SignOut
                    </Link>
                </div>
              </div>
            </div>
            <div>{children}</div>
        </div>
    )
}

export type LayoutType = typeof Layout