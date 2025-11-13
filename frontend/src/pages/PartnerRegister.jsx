import React from 'react'
import '../styles/theme.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerRegister = ()=>{
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const shopName = e.target.shopName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register",{
      name: shopName,
      phone,
      address,
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
            <h2>Partner sign up</h2>
            <p className="muted">Register your restaurant to start receiving orders.</p>
          </div>
          <div className="right">
            <a href="/user/register" className="partner-switch">Switch</a>
            <span className="role-label">User</span>
          </div>
        </div>

  <form className="auth-form" aria-label="Partner Register Form" onSubmit={handleSubmit}>
          <label>
            <span>Restaurant / Shop name</span>
            <input type="text" name="shopName" placeholder="Your restaurant name" />
          </label>

          <label>
            <span>Phone</span>
            <input type="tel" name="phone" placeholder="Contact number" />
          </label>

          <label>
            <span>Address</span>
            <textarea className="address-field" name="address" placeholder="Street, area, city, ZIP" rows={2} />
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="business@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="Create a password" />
          </label>

          <button type="submit" className="btn">Register</button>
        </form>

        <div className="auth-footer">
          <span>Already a partner? <a href="/food-partner/login">Login</a></span>
      
        </div>
      </div>
    </div>
  )
}

export default PartnerRegister
