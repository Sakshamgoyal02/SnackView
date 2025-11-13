import React from 'react'
import '../styles/theme.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerLogin = ()=>{
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
     const email = e.target.email.value;
    const password = e.target.password.value;

     const response = await axios.post("http://localhost:3000/api/auth/food-partner/login",{
      email,
      password},
      {
        withCredentials: true
      });
    console.log(response.data);

    navigate("/create-food");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tools">
          <div>
            <div className="auth-brand">Zomato</div>
            <h2>Partner login</h2>
            <p className="muted">Sign in to manage your restaurant.</p>
          </div>
          <div className="right">
            <a href="/user/register" className="partner-switch">Switch</a>
            <span className="role-label">User</span>
          </div>
        </div>

  <form className="auth-form" aria-label="Partner Login Form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="business@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="Your password" />
          </label>

          <button type="submit" className="btn">Login</button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account? <a href="/food-partner/register">Register</a></span>
        </div>
      </div>
    </div>
  )
}

export default PartnerLogin
