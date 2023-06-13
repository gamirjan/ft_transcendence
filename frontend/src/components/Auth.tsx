import React, { useEffect } from 'react'
import queryString from 'query-string'


function Auth() {
	useEffect(() => {
		// Parse the URL parameters
		const queryParams = queryString.parse(window.location.search);
	
		// Convert the parsed parameters to a URL-encoded string
		const params = new URLSearchParams(queryParams).toString();
	
		// Append the URL-encoded parameters to the server endpoint
		const url = `http://localhost:7000/auth/google/redirect?${params}`;
		console.log("qqqqqqqqqqqqqq",queryParams);
		
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
			console.log(data);
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

export default Auth