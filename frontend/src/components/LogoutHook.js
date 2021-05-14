import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId =
  '273276033856-0v6o6jf7l9d8mkib4sagdpi6d848gkig.apps.googleusercontent.com';

function LogoutHook() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutHook;