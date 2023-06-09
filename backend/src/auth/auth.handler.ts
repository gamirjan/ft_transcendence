import axios from "axios";
import qs from 'qs'
import oauthConfig from "../config/default"
import { application, query } from "express";
import { Query, Res } from "@nestjs/common";
import { json } from "stream/consumers";
import { access } from "fs";
import { Response } from "express";
import * as jwt from 'jsonwebtoken'

interface GoogleUserResult
{
    id:string;
    email:string;
    verified_email:boolean;
    name:string;
    given_name:string;
    picture:string;
    locale:string;
}

interface GoogleTockenResult
{
    access_token:string;
    expire_in:Number;
    refresh_token:string;
    scope:string;
    id_token:string;
}

export async function findAndUpdate() {
    
}

export async function getGoogleUser(id_token,access_token):Promise<GoogleUserResult>
{
    try {
        const res = axios.get<GoogleUserResult>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,{
            headers:{
                Authorization:`Bearer ${id_token}`
            }
        })
        return (await res).data;
    } catch (error) {
        console.log(error.message,"invaliddd!");
        
    }
}

export async function googleOauthHandler(req: any, res : Response) 
{
    try 
    {
            // const query = (res as any).query
        const code  = req.query.code as string
        //get the code from qs
        const {id_token,access_token} = await getGoogleOauthTokens( {code : code})
        // console.log("id =>",id_token);
        // console.log("acc =>",access_token);
        // const googleUser  =jwt.decode(id_token);
        const user = await getGoogleUser(id_token,access_token);
        console.log(user);
        
        
        //get the id and access tocken whith the code  
        //get the user with the tokens
        //upsert the user
        //create a session 
        //create a access and refresh tockens
        //redirect back to the client
        // return res.send({msg:"loooggg in compelete"});
        return res.redirect("http://localhost:3000/home")
        
    } catch (error) {
        return res.redirect('http://sergey.ml:3000');
    }


}

export async function getGoogleOauthTokens({code}:{code : string}):Promise<GoogleTockenResult>
{
    const url = 'https://oauth2.googleapis.com/token'
    
    const values = {
        code,
        client_id: '472681490682-cofucv7fr3j0v654ti873v4flktohgdq.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'http://sergey.ml:7000/auth/google/redirect',
        grant_type: 'authorization_code',
        // code:code,
    };
    try{
       // console.log('hayvaaaaannnn',qs.stringify(values));
        //return {msg : 'maybe ok'}
        
        const res = await axios.post<GoogleTockenResult>(url,values,
        {
            headers:{
                
                'Content-Type': 'application/json',
            },
        });
        // console.log("dsdsdsdssds",await res.data);
        
        return res.data
    }catch(error:any){
        console.log(error.response,'failedddd!');
        // throw new Error(error.message);
        
    }
}