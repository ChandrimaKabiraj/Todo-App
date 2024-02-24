import './App.css';
import TodoList from './components/TodoList.js';
import AuthLogin from './components/authLogin.jsx';
import AuthLogout from './components/authLogout.jsx';
import Profile from './components/Profile.jsx';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <div className="App">
      <div className="auth">
      <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>;
      </div>
      <TodoList />
    </div>
  );
}

export default App;
