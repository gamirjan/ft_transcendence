import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Ft_Auth() {
    const navigate = useNavigate();
	async function login(params:object) 
	{
				fetch('http://localhost:7000/auth/google/login', {
		method: 'POST',
		body: JSON.stringify({params}),
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => response.json())
		.then(data => {
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
	useEffect(() => {
		// Parse the URL parameters
		const queryParams = queryString.parse(window.location.search);
	
		// Convert the parsed parameters to a URL-encoded string
		const params = new URLSearchParams(queryParams).toString();
	
		// Append the URL-encoded parameters to the server endpoint
        console.log(params);
        
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
    <div>Ft_Auth</div>
  )
}

export default Ft_Auth