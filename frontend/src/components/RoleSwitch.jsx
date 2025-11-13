import React from 'react'

const RoleSwitch = ({current='user'})=>{
  // current: 'user' or 'partner'
  if(current==='partner'){
    return (
      <div className="role-switch">
        <a href="/user/login" className="btn secondary" style={{padding:'6px 10px'}}>User Login</a>
        <a href="/user/register" className="btn" style={{padding:'6px 10px'}}>User Register</a>
      </div>
    )
  }

  return (
    <div className="role-switch">
      <a href="/food-partner/login" className="btn secondary" style={{padding:'6px 10px'}}>Partner Login</a>
      <a href="/food-partner/register" className="btn" style={{padding:'6px 10px'}}>Partner Register</a>
    </div>
  )
}

export default RoleSwitch
