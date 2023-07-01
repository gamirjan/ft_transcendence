import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux';
import env from "react-dotenv"

const ip =  process.env.IP ?? "http://localhost"

function Ft_Auth() {
	console.log("ft_auttthhththt");
	
	const navigate = useNavigate();
	const user = useSelector((state: AppState) => state.user);
	  const dispatch = useDispatch();
	async function login(params:object) 
	{
		if(!user)
		{
					fetch(`${ip}:7000/auth/42/login`, {
			method: 'POST',
			body: JSON.stringify({params}),
			headers: {
				'Content-Type': 'application/json',
			},
			})
			.then(response => response.json())
			.then(data => {
				console.log(data.status);
				  dispatch(setUser(null));
				  dispatch(setUser(data));
				navigate("/home",{replace:true})
				// Process the response data received from the server
				console.log(data);
			})
			.catch(error => {
				navigate("/",{replace:true})
				// Handle any errors that occur during the request
				console.error(error);
			});
		}
		else
		{
			navigate("/home",{replace:true})
		}
		
	}
	useEffect(() => {
		// Parse the URL parameters
		const queryParams = queryString.parse(window.location.search);
	
		// Convert the parsed parameters to a URL-encoded string
		const params = new URLSearchParams(queryParams).toString();
	
		// Append the URL-encoded parameters to the server endpoint
		console.log(ip);
	
		const url = `${ip}:7000/auth/42/redirect?${params}`;
		//console.log("qqqqqqqqqqqqqq",queryParams);
		
		// Send the GET request using fetch()
		fetch(url)
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Request failed');
			}
			return response.json(); // assuming the server returns JSON data
		  })
		  .then(data => {
			// Process the response data
			login(data);
			//console.log(data);
		  })
		  .catch(error => {
			// Handle any errors
			console.log(error);
		  });
	  }, []);
  return (
	<div>Auth</div>
  )
}

export default Ft_Auth