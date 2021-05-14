import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com'


function Logout() {
    const onSuccess = (res) => {
        alert('logout made successfully 🚀');
    };
    
    return (
        <div>
          <GoogleLogout
            clientId={clientId}
            buttonText="Sign Out"
            onLogoutSuccess={onSuccess}
          />  
        </div>
    )
}

export default Logout;