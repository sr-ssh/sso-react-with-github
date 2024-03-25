import { useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/profile/Profile";

function App() {
	// Extracting the 'code' parameter from the URL query string (used for authorization)
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");

	// State to store the retrieved user data
	const [data, setData] = useState(null);
	// State to indicate if data is being fetched
	const [loading, setLoading] = useState(false);

	// Runs whenever the 'code' variable changes (likely on authorization flow)
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setLoading(true); // Set loading to true while fetching data
			fetch("https://api.github.com/user", {
				headers: { Authorization: token },
			})
				.then((res) => res.json()) // Parse the response as JSON
				.then((data) => {
					setData(data); // Update state with fetched user data
					setLoading(false); // Set loading to false when done fetching
				});
		} else if (code) {
			// If no token but 'code' is available (GitHub OAuth flow)
			setLoading(true); // Set loading to true while fetching data
			fetch(
				`http://localhost:8589/oauth/redirect?code=${code}&state=YOUR_RANDOMLY_GENERATED_STATE`
			)
				.then((res) => res.json()) // Parse the response as JSON
				.then((data) => {
					setData(data.userData); // Update state with user data from response
					localStorage.setItem(
						"token",
						`${data.tokenType} ${data.token}`
					); // Store access token in local storage
					setLoading(false); // Set loading to false when done fetching
				});
		}
	}, [code]);

	// Function to redirect the user to the GitHub OAuth authorization page
	function redirectToGitHub() {
		const client_id = "e48aa4546bef3e3ede25";
		const redirect_uri = "http://localhost:5173/";
		const scope = "read:user";

		const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

		window.location.href = authUrl;
	}

	// Conditionally render content based on loading state and data availability
	if (loading) {
		return <h4>Loading...</h4>;
	}

	if (data) {
		return <Profile user={data} />;
	}

	return (
		<>
			<div className="login-container">
				<h1>Login to MyApp</h1>
				<button className="github-button" onClick={redirectToGitHub}>
					<img
						src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
						alt="GitHub Logo"
					/>
					Login with GitHub
				</button>
			</div>
		</>
	);
}

export default App;
