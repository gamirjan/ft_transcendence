import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux';


function Ft_Auth() {
	console.log("ft_auttthhththt");
	
	const navigate = useNavigate();
	const user = useSelector((state: AppState) => state.user);
	  const dispatch = useDispatch();
	async function login(params:object) 
	{
		if(!user)
		{
					fetch('http://localhost:7000/auth/42/login', {
			method: 'POST',
			body: JSON.stringify({params}),
			headers: {
				'Content-Type': 'application/json',
			},
			})
			.then(response => response.json())
			.then(data => {
				console.log(data.status);
				const userObject = {
					id: 12,
					id_42: 100216,
					displayname: 'Arno Baboomian',
					email: null,
					avatarurl: 'https://cdn.intra.42.fr/users/0af32ecdbf0b50365b564e68f068f040/arbaboom.jpg',
					isverified: null,
					istwofactorenabled: true,
					wins: 0,
					losses: 0,
				  };
				  dispatch(setUser(userObject));
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
		const url = `http://localhost:7000/auth/42/redirect?${params}`;
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