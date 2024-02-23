import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './styles.css';

const AuthLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()} className="login">Log In</button>;
};

export default AuthLogin;