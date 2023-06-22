import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from './redux';
import { useNavigate } from 'react-router-dom';

function Out() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(setUser(null));
        navigate("/",{replace:true})
        
    },[])
  return (
    <div>Out</div>
  )
}

export default Out