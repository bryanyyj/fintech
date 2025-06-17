// src/pages/Register.jsx
// import AuthForm from "../components/authform";

// const Register = () => {
//   const handleRegister = (e) => {
//     e.preventDefault();
    
//     // Your register logic here
//     alert("Registered!");
//   };

//   return <AuthForm title="Create Your Account" buttonText="Register" onSubmit={handleRegister} isLogin={false} />;
// };

// export default Register;


// src/pages/Register.jsx
import AuthForm from "../components/authform";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (formData) => {
    // e.preventDefault();

    const { full_name, email, password } = formData;

    if (!isValidEmail(email)) {
      setWarning("Invalid email format.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, password }),
      });

      const data = await res.json();

      if (res.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
        alert("Registered!");
        navigate("/");
      } else {
        alert(data.message)
      }
    } catch (err) {
      alert("Server error. Please try again later.")
    }
  };

  return (
    <>
      <AuthForm
        title="Create Your Account"
        buttonText="Register"
        onSubmit={handleRegister}
        isLogin={false}
      />
    </>
  );
};

export default Register;
