import './LogoutButton.css';
import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_ID;

function LogoutButton({ setGToken, DPSrc }) {
	const onLogoutSuccess = (res) => {
		setGToken(undefined);
	};

	const onFailure = () => console.error('Logout Failed');

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure
	});

	return (
		<button onClick={signOut} className='gbtn --logout'>
			<div className='gbtn__icon-cntr'>
				<img src={DPSrc} alt='dp' />
			</div>
			<span className='buttonText'>Sign out</span>
		</button>
	);
}

export default LogoutButton;
