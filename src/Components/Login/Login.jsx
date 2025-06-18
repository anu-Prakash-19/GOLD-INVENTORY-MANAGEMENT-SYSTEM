import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored email and password from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Check if input matches registered data
    if (formData.email === storedEmail && formData.password === storedPassword) {
      alert("Login Successful! Redirecting to Dashboard...");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="main-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">LOGIN</button>

        <p className="register-link">
          Don't have an account? <Link to="/Register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
