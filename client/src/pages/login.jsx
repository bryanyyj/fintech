// src/pages/Login.jsx
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/authform"

export default function Login() {
  const navigate = useNavigate()

  // On mount: if there's already a token, verify it and restore session
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/jwt/verify", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.userId) {
            localStorage.setItem("userId", data.userId)
            localStorage.setItem("isLoggedIn", "true")
            navigate("/home", { replace: true })
          } else {
            // bad token → clear
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("isLoggedIn")
          }
        })
        .catch(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("userId")
          localStorage.removeItem("isLoggedIn")
        })
    }
  }, [navigate])

  const handleLogin = async formData => {
    const { email, password } = formData

    // 1. Try backend login
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (response.ok && data.token) {
        // Save token & session
        localStorage.setItem("token", data.token)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", email)

        // Verify to get userId
        const vr = await fetch("http://localhost:3000/api/jwt/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${data.token}` },
        })
        if (vr.ok) {
          const vd = await vr.json()
          if (vd.userId) localStorage.setItem("userId", vd.userId)
        }

        navigate("/home", { replace: true })
        return
      }
    } catch (err) {
      console.warn("Backend login failed, falling back to localStorage…", err)
    }

    // 2. Fallback: localStorage-based users
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      // Ensure userId is an integer
      let userId = user.userId;
      if (!userId || isNaN(parseInt(userId, 10))) {
        // Assign a new integer userId if missing or invalid
        userId = Date.now();
        user.userId = userId;
        // Update users array in localStorage
        const updatedUsers = users.map(u => u.email === email ? { ...u, userId } : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("currentUser", email)
      localStorage.setItem("userId", parseInt(userId, 10))
      navigate("/home", { replace: true })
    } else {
      alert("Invalid email or password.")
    }
  }

  return (
    <AuthForm
      title="Welcome Back!"
      buttonText="Login"
      isLogin={true}
      onSubmit={handleLogin}
    />
  )
}
