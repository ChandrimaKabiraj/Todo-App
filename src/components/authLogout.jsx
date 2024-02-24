import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './styles.css';

const AuthLogout = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    className="logout">
      Log Out
    </button>
  );
};

export default AuthLogout;