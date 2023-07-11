import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom';
import { ip } from './utils/ip';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux';
import LayoutProvider from './LayoutProvider';
const Auth = () => {

	console.log("heeeellloooo");
	
	const user = useSelector((state: AppState) => state.user);
	// const [loged, setLoged] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const login = async (params:object) => {
		
		fetch(`${ip}:7000/auth/google/login`, {
		method: 'POST',
		// mode:'no-cors',
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json',
		},
		})
		.then(response => {
			console.log("okkkk");
			console.log(response);
			
			return response.json()
		
		})
		.then(data => {
			
			console.log("daddadadada",data);
			// setLoged(data);
			// console.log("hell: ", loged);
			
			dispatch(setUser(null));
			dispatch(setUser(data));
			console.log("okkk");
			
			navigate("/twofactor",{replace:true})
			
			// Process the response data received from the server
			console.log(data);
		})
		.catch(error => {
			console.log("dddddddd");
			
			navigate("/",{replace:true})
			// Handle any errors that occur during the request
			console.log(error);
		});
	}
	useEffect(() => {
		// Parse the URL parameters
		const queryParams = queryString.parse(window.location.search);
	
		console.clear()
		console.log("PARAMS:", queryParams);

		// Convert the parsed parameters to a URL-encoded string
		const params = new URLSearchParams(queryParams);
	
		// Append the URL-encoded parameters to the server endpoint
		const url = `${ip}:7000/auth/google/redirect?${params}`;
		//console.log("qqqqqqqqqqqqqq",queryParams);
		
		// Send the GET request using fetch()
		fetch(url)
		  .then(response => {
			if (!response.ok) {
				console.log("faillllllll response");
				
			  throw new Error('Request failed');
			}
			console.log("RESPONE", response)
			return response.json(); // assuming the server returns JSON data
		  })
		  .then(data => {
			// Process the response data
			console.log("LOGGED IN")
			login(data);
			//console.log(data);
		  })
		  .catch(error => {
			// Handle any errors
			console.log(error);
		  });
	  }, []);
  return (
	<LayoutProvider auth={false}>
		<div>Auth Google</div>
	</LayoutProvider>
	// <Link   
	// 		to="/thegame"
	// 		className="relative bg-[#212121] hover:bg-[#181818] text-[#aaaaaa] font-bold py-5 px-16 rounded-2xl">
	// 			The Game Play
	// </Link>
	// <div>Audddddth ggoogle</div>
  )
}

export default Auth