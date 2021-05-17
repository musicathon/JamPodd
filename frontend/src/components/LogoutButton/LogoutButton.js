import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_ID;

function LogoutButton({ setIsAuth }) {
	const onLogoutSuccess = (res) => {
		setIsAuth(false);
	};

	const onFailure = () => console.log('Logout Failed');

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure
	});

	return (
		<button onClick={signOut} className='button'>
			<FcGoogle />
			<span className='buttonText'>Sign out</span>
		</button>
	);
}

export default LogoutButton;
