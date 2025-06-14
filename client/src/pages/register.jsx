// src/pages/Register.jsx
import AuthForm from "../components/authform";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Your register logic here
    alert("Registered!");
  };

  return <AuthForm title="Create Your Account" buttonText="Register" onSubmit={handleRegister} isLogin={false} />;
};

export default Register;
