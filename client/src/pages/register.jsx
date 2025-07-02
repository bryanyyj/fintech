// src/pages/Register.jsx
import { useNavigate } from "react-router-dom"
import AuthForm from "../components/authform"

export default function Register() {
  const navigate = useNavigate()

  // Simple email format check
  const isValidEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleRegister = async formData => {
    const { full_name, email, password } = formData

    // 1️⃣ Validate email format
    if (!isValidEmail(email)) {
      alert("Invalid email format.")
      return
    }

    // 2️⃣ Try backend registration
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, password }),
      })
      const data = await res.json()

      if (res.ok && data.token) {
        // Save token & mark as logged in
        localStorage.setItem("token", data.token)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", email)

        // Verify token to get userId
        const vr = await fetch("http://localhost:3000/api/jwt/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${data.token}` },
        })
        if (vr.ok) {
          const vd = await vr.json()
          if (vd.userId) localStorage.setItem("userId", vd.userId)
        }

        alert(data.message || "Registration successful!")
        navigate("/login", { replace: true })
        return
      } else {
        alert(data.message || "Registration failed on server.")
      }
    } catch (err) {
      console.warn("Backend register failed, falling back to localStorage…", err)
    }

    // 3️⃣ Fallback: localStorage-based registration
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.find(u => u.email === email)) {
      alert("That email is already registered—please log in.")
      navigate("/login", { replace: true })
      return
    }

    // Assign a unique incremental integer userId
    let maxId = 0;
    users.forEach(u => {
      if (typeof u.userId === 'number' && u.userId > maxId) maxId = u.userId;
    });
    const userId = maxId + 1;
    users.push({ name: full_name, email, password, userId })
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", email)
    localStorage.setItem("userId", userId)

    alert("Registration saved locally! You are now ready to log in.")
    navigate("/login", { replace: true })
  }

  return (
    <AuthForm
      title="Create Your Account"
      buttonText="Register"
      isLogin={false}
      onSubmit={handleRegister}
    />
  )
}
