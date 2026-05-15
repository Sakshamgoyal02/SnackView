import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import PartnerRegister from '../pages/PartnerRegister'
import PartnerLogin from '../pages/PartnerLogin'
import UserHomepage from '../pages/UserHomePage'
import CreateFood  from '../pages/CreateFood'
import ResProfile from '../pages/ResProfile'
import Saved from '../pages/saved'

const AppRoutes = ()=>{
    return(
      <Router>
        <Routes>
            <Route path="/" element={<UserRegister/>}/>
            <Route path="/user/login" element={<UserLogin/>}/>
            <Route path="/food-partner/register" element={<PartnerRegister/>}/>
            <Route path="/food-partner/login" element={<PartnerLogin/>}/>
            <Route path="/user/homepage" element={<UserHomepage/>}/>
            <Route path="/restaurant/:id" element={<ResProfile/>} />
            <Route path="/create-food" element={<CreateFood/>}/>
            <Route path="/saved" element={<Saved/>}/>
            
        </Routes>
      </Router>
    )
}

export default AppRoutes;

