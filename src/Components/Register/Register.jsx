import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css"; // Import scoped CSS

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save registered data to localStorage
    localStorage.setItem("username", formData.username);
    localStorage.setItem("phone", formData.phone);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("password", formData.password);

    alert("Registration Successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="auth-page register-page">
      <form className="container" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="main-form">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <label>Phone Number</label>
          <input type="number" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn">REGISTER</button>
        <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;
