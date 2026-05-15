import React from 'react'
import '../styles/theme.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'


const UserRegister = ()=>{
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   const name = e.target.name.value;
   const email= e.target.email.value;
   const password = e.target.password.value;
  

   const response = await api.post("/auth/user/register", {
    fullName: name,
    email,
    password
   })
   console.log(response.data);

   navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tools">
          <div>
            <div className="auth-brand">Zomato</div>
            <h2>Create your account</h2>
            <p className="muted">Sign up to order your favourite meals.</p>
          </div>
          <div className="right">
            <a href="/food-partner/register" className="partner-switch">Switch</a>
            <span className="role-label">Food partner</span>
          </div>
        </div>

  <form className="auth-form" aria-label="User Register Form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" placeholder="Your full name"/>
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="Create a password" />
          </label>

          <button type="submit" className="btn">Create account</button>
        </form>

        <div className="auth-footer">
          <span>Already have an account? <a href="/user/login">Login</a></span>
         
        </div>
      </div>
    </div>
  )
}

export default UserRegister
