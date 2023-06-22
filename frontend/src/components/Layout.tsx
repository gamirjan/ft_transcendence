import React from 'react';
import { Link } from 'react-router-dom';
import { setUser, store } from './redux';
import { useDispatch } from 'react-redux';
const del = ()=>{
}
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="bg-white py-3 shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">My App</div>
            <div className="space-x-4">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/contacts">Contacts</NavLink>
              <NavLink to="/chat">Chat</NavLink>
              <NavLink to="/channels">Channels</NavLink>
              <Link to="/out"  className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition duration-150 ease-in-out">
                    sign out
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-8">{children}</div>
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-lg font-medium text-gray-800 hover:text-indigo-500 transition duration-150 ease-in-out"
  >
    {children}
  </Link>
);

export default Layout;
