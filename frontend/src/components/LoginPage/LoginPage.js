import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_ID;

function LoginPage({ setIsAuth }) {
	const onSuccess = (res) => {
		setIsAuth(true);
		console.log('Login Success: currentUser:', res.profileObj);

		refreshTokenSetup(res);
	};

	const onFailure = (res) => console.log('Login failed: res:', res);

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: 'offline'
	});

	return (
		<button onClick={signIn} className='button'>
			<FcGoogle />
			<span className='buttonText'>Sign in with Google</span>
		</button>
	);
}

export default LoginPage;