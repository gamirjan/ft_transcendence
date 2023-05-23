import axios from "axios";
import qs from 'querystring'
import oauthConfig from "../config/default"
import { application, query } from "express";
import { Query } from "@nestjs/common";
import { json } from "stream/consumers";
export async function googleOauthHandler(req: any,res : Response) 
{
    // const query = (res as any).query
    const code  = req.query.code as string
    console.log("eshhhhhhhhhhhhhhh",code);
    
    //get the code from qs
    const sss = await getGoogleOauthTokens({code})
    console.log("hhhhhhhh",sss);
    
    //get the id and access tocken whith the code  
    //get the user with the tokens
    //upsert the user
    //create a session 
    //create a access and refresh tockens
    //redirect back to the client

}

export async function getGoogleOauthTokens({code}:{code : string}) 
{
    const url = 'http://oauth2.googleapis.com/token'

    const values = {
        client_id: oauthConfig.clientID,
        client_secret: oauthConfig.clientSecret,
        redirect_url: oauthConfig.callbackURL,
        grant_type: 'authorization_code'
    };
    try{
        console.log('hayvaaaaannnn',qs.stringify(values));
        //return {msg : 'maybe ok'}
        
        const res = await axios.post(url,qs.stringify(values),
        {
            headers:{
                
                'Content-Type': "application/x-www-form-urlencoded",
            },
        });
        console.log("dsdsdsdssds",await res.data);
        
        return res.data
    }catch(error:any){
        console.log(error.data,'failedddd!');
        // throw new Error(error.message);
        
    }
}