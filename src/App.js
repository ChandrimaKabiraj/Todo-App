import './App.css';
import TodoList from './components/TodoList.js';
import AuthLogin from './components/authLogin.jsx';
import AuthLogout from './components/authLogout.jsx';
import Profile from './components/Profile.jsx';

function App() {
  return (
    <div className="App">
      <div className="auth">
      <AuthLogin />
      <AuthLogout />
      <Profile />
      </div>
      <TodoList />
    </div>
  );
}

export default App;
