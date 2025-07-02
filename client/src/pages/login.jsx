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
        .then(async data => {
          if (data.userId) {
            localStorage.setItem("userId", data.userId)
            localStorage.setItem("isLoggedIn", "true")
            // Check for financial profile
            const profileCheck = await fetch(`http://localhost:3000/api/profile?userId=${data.userId}`, {
              method: "GET",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            });
            if (profileCheck.ok) {
              navigate("/home", { replace: true })
            } else {
              navigate("/onboarding", { replace: true })
            }
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

          // Check for financial profile
          const profileCheck = await fetch(`http://localhost:3000/api/profile?userId=${vd.userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.token}` }
          });

          if (profileCheck.ok) {
            navigate("/home", { replace: true })
          } else {
            navigate("/onboarding", { replace: true })
          }
        }
      } else {
        alert("Invalid email or password.")
      }
    } catch (err) {
      alert("Login failed. Please try again.")
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
