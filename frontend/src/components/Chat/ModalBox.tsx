import React, { useEffect } from "react";
import Modal from "./Modal";
import { Field, Form, Formik, FormikProps } from 'formik'; 
import { useState } from "react";

const ModalBox = ({create = null, join = null, footer = null, children = null, handleSelectUser = null, setSearchQuery = null, suggestions = null, createChannel = null, joinChannel = null}) => {
const [openModal, setOpenModal] = useState(false)
const [channel, setChannel] = useState(null)
const [initValues, setInitValues] = useState({
    channelName: '',
    type: '1',
    password: ''
});
useEffect(()=>{
    console.log("inits: ", initValues);
    
}, [channel, openModal, initValues])

const handleSubmit = (values, {resetForm}) =>{
    console.log(values);
    
    createChannel ? createChannel(values) : joinChannel(channel)
    resetForm();
    setOpenModal(false);

    handleSelectUser && handleSelectUser(channel)
    setSearchQuery('')

}
    return (
        <>
        {create ? (
            <>
            <div className="flex justify-start">
                  Channels

            </div>
            <div className="flex justify-end">
                <button className="flex justify-center mt-0 bg-[#181818] text-white hover:bg-[#313131] px-3 py-1" onClick={()=>setOpenModal(true)}>+</button>
            </div>
            </>
        ) : (join ? (
            <>
            {suggestions &&
                    suggestions.map((elem, key) => (
                      // <div>
                      //   {console.log(elem)}
                      // </div>
                      <div 
                      className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#181818] hover:rounded-xl"
                      key={key}
                      >
                        <div
                          className="flex w-full  justify-start"
                          onClick={() => {
                            // handleSelectUser(elem);
                            setOpenModal(true);
                            setChannel(elem)
                            console.log("elem: ", elem);
                            
                            setInitValues({
                                channelName: elem ? elem.channelname : '',
                                type: elem ? elem.channeltype : '1',
                                password: ''
                            });
                            console.log("okkkkkk");
                          }}
                        >
                          <div className="w-1/4">
                            {elem.avatarurl ? (
                            <img
                              src={elem.avatarurl}
                              alt=""
                              srcSet=""
                              className="object-cover h-12 w-12 rounded-full"
                            />
                            ) : (
                              <div className="object-cover h-12 w-12 justify-center flex items-center rounded-full bg-gray-800">
                                  {elem.channelname.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-row">
                            <div className="ml-3 text-lg font-semibold">
                              {elem.channelname}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
            </>
        ) : (
            <></>
        ))
    }
        <Modal
        open={openModal}
        className={null}
        onClose={()=>setOpenModal(false)}
        contentClassName={"bg-[#212121] "}
        
        
        >
        <div className="flex flex-col h-full p-5">
            <Formik 
            
            initialValues={initValues}
            onSubmit={handleSubmit}
            validate={(values)=>{
                
                console.log(values);
                
                const errors = {}
                if (values.channelName == '')
                    errors.channelName = 'Required'
                if (values.password == '' && values.type == '2')
                    errors.password = 'Required'
                return errors;
            }}
            >
            {({values, errors, touched} : FormikProps<any>)=>(
                <Form
                    // id={`${create ? "create-channel-form" : "join-channel-form"}`}
                    className="flex flex-col text-sm justify-center h-full p-2"
                    
                >
                <div className={`${(errors.channelName && touched.channelName && errors.channelName) ? "text-red-800" : ""}`}>
                    {errors.channelName && touched.channelName && errors.channelName}
                </div>
                <Field
                    disabled={join}
                    className="p-2 outline-none"
                    name="channelName"
                    placeholder="Channel Name"
                    // value={join ? (channel ? channel.channelname : values.channelName) : values.channelName}
                    type="text"
                >
                </Field>
                <Field 
                    disabled={join}
                    name="type" as="select"
                    className="mt-2 bg-[#181818] p-2 rounded "
                    // value={channel ? channel.channeltype : values.type}
                >
                    <option value="1" >Public</option>
                    <option value="2" >Protected</option>
                    <option value="3" >Private</option>
                </Field>
                {/* {errors.password && touched.password && errors.password} */}
                {values.type == "2" ? (
                    <>
                    <div className={`${(errors.password && touched.password && errors.password) ? "text-red-800" : ""}`}>
                    {errors.password && touched.password && errors.password}
                </div>
                <Field
                    name="password"
                    className="p-2 outline-none"
                    type="text"
                    placeholder="Channel Password"
                >
                    </Field>
                    </>
                )
                    : (<></>
                )}
                    <button 
                    type="submit"
                    disabled={(errors && Object.keys(errors).length != 0)}
                    className={`p-2 bg-[#181818] ${!(errors && Object.keys(errors).length != 0) ? "hover:bg-[#313131]" : ""} rounded text-white`}
                    >
                    {create ? "Create" : "Join"}
                    </button>
                </Form>
            )}
            </Formik>
            
        </div>
        </Modal>
        </>
    )
}


export default ModalBox;