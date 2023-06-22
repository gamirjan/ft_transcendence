import React, { useEffect } from "react"
import  Layout  from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const contacts = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
    },
    // Add more contacts as needed
  ];
const Contacts = () => {
    const user = useSelector((state: AppState) => state.user);
    const navigate = useNavigate();
   /*  useEffect(()=>{
        if(user == null)
            navigate("/",{replace:true})
    },[])*/
    console.log("useerrrrcontacts",user);
    if(user == null)
    {
        //navigate("/",{replace:true}) 
        return null
    }
    return (
        <Layout>
                        <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Contacts</h1>
                <ul className="space-y-4">
                    {contacts.map((contact) => (
                    <li
                        key={contact.id}
                        className="p-4 bg-white shadow rounded-md flex items-center justify-between"
                    >
                        <div>
                        <h2 className="text-xl font-bold">{contact.name}</h2>
                        <p className="text-gray-600">{contact.email}</p>
                        <p className="text-gray-600">{contact.phone}</p>
                        </div>
                        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        View
                        </button> */}
                    </li>
                    ))}
                </ul>
                </div>
        </Layout>
    )
}

export default Contacts;