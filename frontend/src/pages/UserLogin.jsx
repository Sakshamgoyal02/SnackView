import React from 'react'
import '../styles/theme.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

const UserLogin = ()=>{
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await api.post("/auth/user/login",{
      email,
      password
    });
    console.log(response.data);

    navigate("/user/homepage");

  }
  

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tools">
          <div>
            <div className="auth-brand">Zomato</div>
            <h2>Welcome back</h2>
            <p className="muted">Login to continue ordering.</p>
          </div>
          <div className="right">
            <a href="/food-partner/register" className="partner-switch">Switch</a>
            <span className="role-label">Food partner</span>
          </div>
        </div>

  <form className="auth-form" aria-label="User Login Form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="Your password" />
          </label>

          <button type="submit" className="btn">Login</button>
        </form>

        <div className="auth-footer">
          <span>New here? <a href="/user/register">Create an account</a></span>
          
        </div>
      </div>
    </div>
  )
}

export default UserLogin
