import './LoginPage.css';
import { useGoogleLogin } from 'react-google-login';
import { AiOutlineGoogle } from 'react-icons/ai';

// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_OAUTH_ID;

function LoginPage({ setGAuthRef }) {
	const onSuccess = (res) => {
		setGAuthRef(res);
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
			<div className='login__cntr'>
				<h1>JamPodd</h1>
				<h1>Sign In</h1>
				<div className='login__img-cntr'>
					<img src='/logo-dark.png' alt='jampodd logo' />
				</div>
				<button onClick={signIn} className='gbtn --login'>
					<div className='gbtn__icon-cntr'>
						<AiOutlineGoogle />
					</div>
					<span>BITS Mail</span>
				</button>
			</div>
		</article>
	);
}

export default LoginPage;
