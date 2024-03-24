import { useEffect, useState } from "react";
import "./App.css";

function App() {
	// Extracting the 'code' parameter from the URL query string
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");

	// State to store the retrieved data from the server
	const [data, setData] = useState<unknown>();

	useEffect(() => {
		const token = localStorage.getItem("token");
		token &&
			fetch("https://api.github.com/user", {
				headers: { Authorization: token },
			}).then((res) => {
				res.json().then((data) => {
					console.log(data);
					setData(data.userData);
				});
			});
		// Fetching data from the server if 'code' is available
		code &&
			fetch(
				`http://localhost:8589/oauth/redirect?code=${code}&state=YOUR_RANDOMLY_GENERATED_STATE`
			).then((res) => {
				res.json().then((data) => {
					console.log(data);
					setData(data.userData);
					localStorage.setItem(
						"token",
						`${data.tokenType} ${data.token}`
					);
				});
			});
	}, [code]);

	// Function to redirect the user to the GitHub OAuth authorization page
	function redirectToGitHub() {
		const client_id = "9f4896d23af74ccd7e95";
		const redirect_uri = "http://localhost:5173/";
		const scope = "read:user";
		const state = "YOUR_RANDOMLY_GENERATED_STATE";

		const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;

		window.location.href = authUrl;
	}

	// Render the retrieved data if available, otherwise render the login button
	if (data) {
		return <h5>{JSON.stringify(data)}</h5>;
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
