import { useEffect, useState } from "react";


function FacebookLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1615747215675590', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      // Check initial login status
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          fetchUserData();
        }
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      element.parentNode.insertBefore(js, element);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleLogin = () => {
    window.FB.login((response) => {
      if (response.status === 'connected') {
        fetchUserData();
      }
    }, { scope: 'public_profile,email' });
  };

  const fetchUserData = () => {
    window.FB.api('/me', { fields: 'name,email' }, (userProfile) => {
      setUserName(userProfile.name);
      setIsLoggedIn(true);
    });
  };

  return (
    <>
      {!isLoggedIn ? (
        <button onClick={handleLogin} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '5px', backgroundColor: '#4267B2', color: 'white', border: 'none', cursor: 'pointer' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" // URL to Facebook logo
            alt="Facebook Logo"
            style={{ width: '20px', height: '20px', marginRight: '10px' }}
          />
          Login with Facebook
        </button>
      ) : (
        <h2>Welcome {userName}</h2>
      )}
    </>
  );
}

export default FacebookLoginComponent;