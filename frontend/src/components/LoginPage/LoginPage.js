import { useEffect, useState } from 'react';
import './LoginPage.css';
import { useGoogleLogin } from 'react-google-login';
import { AiOutlineGoogle } from 'react-icons/ai';

// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_ID;

function LoginPage({ setIsAuth }) {
	// transition on mount
	const [isShown, setIsShown] = useState(false);
	useEffect(() => {
		setIsShown(true);

		return () => setIsShown(false);
	}, []);

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
		<article className='login'>
			<div className={`login__cntr ${isShown ? '--shown' : ''}`}>
				<h1>JamPodd</h1>
				<h1>Sign In</h1>
				<div className='login__img-cntr'>
					<img src='/logo-dark.png' alt='jampodd logo' />
				</div>
				<button onClick={signIn} className='login__btn'>
					<div className='login__icon-cntr'>
						<AiOutlineGoogle />
					</div>
					<span>BITS Mail</span>
				</button>
			</div>
		</article>
	);
}

export default LoginPage;
