import "./profile.css";

type UserType = {
	avatar_url: string;
	login: string;
	id: string;
	type: string;
};

const Profile = ({ user }: { user: UserType }) => {
	return (
		<div className="user-info">
			<h2>User Information</h2>
			<div className="avatar-container">
				<img
					src={user.avatar_url}
					alt="User Avatar"
					className="avatar"
				/>
			</div>
			<div className="info-container">
				<p>Login: {user.login}</p>
				<p>ID: {user.id}</p>
				<p>Type: {user.type}</p>
			</div>
		</div>
	);
};

export default Profile;
