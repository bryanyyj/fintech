// src/pages/Login.jsx
// import AuthForm from "../components/authform";

// const Login = () => {
//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Your login logic here
//     alert("Logged in!");
//   };

//   return <AuthForm title="Welcome Back!" buttonText="Login" onSubmit={handleLogin} isLogin={true} />;
// };

// export default Login;


// src/pages/Login.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authform";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);

        // Token verification
        const verifyResp = await fetch("http://localhost:3000/api/jwt/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${data.token}` }  // 🔑 prefix with Bearer
        });

        if (verifyResp.ok) {
          const verifyData = await verifyResp.json();
          if (verifyData.userId) {
            localStorage.setItem("userId", verifyData.userId);
          }
        }
        alert("Logged in!");
        navigate("/"); // You can use navigate("/") if you're using React Router
      } else {
        alert(data.message)
        // setWarning(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.")
      // setWarning("Something went wrong. Try again.");
    }
  };

  // Optional: auto-verify token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/api/jwt/verify", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userId) {
            localStorage.setItem("userId", data.userId);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        });
    }
  }, []);


  return (
    <>
      <AuthForm
        title="Welcome Back!"
        buttonText="Login"
        isLogin={true}
        onSubmit={handleLogin}
      />
    </>
  );
};

export default Login;
