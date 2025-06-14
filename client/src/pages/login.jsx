// src/pages/Login.jsx
import AuthForm from "../components/authform";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic here
    alert("Logged in!");
  };

  return <AuthForm title="Welcome Back!" buttonText="Login" onSubmit={handleLogin} isLogin={true} />;
};

export default Login;
