import React, { useState, useEffect, useRef } from 'react'
import '../styles/res.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios' 
import api from '../utils/api'

export default function ResProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
  
    api.get(`/api/restaurant/${id}`)
       .then(response => {
          setProfile(response.data.restaurant)
          setVideos(response.data.restaurant.foodItems)
       })
  }, [id])

  return (
    <div className="res-page">
        <div className="res-header card">
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">←</button>
          <div className="res-main">
            <h1 className="res-name">{profile?.name}</h1>
            <div className="res-sub">
              <span className="res-address">📍 {profile?.address}</span>r
            </div>
          </div>
          <div className="res-meta">
            <div className="res-rating">⭐ {profile?.rating}</div>
            <div className="muted reviews-count">({profile?.reviews} reviews)</div>
          </div>
        </div>

      <div className="res-info card">
        <div className="info-item">
          <strong>Opening hours</strong>
          <div className="muted">{profile?.opening}</div>
        </div>
        <div className="info-item">
          
        </div>
        <div className="info-item">
        </div>
      </div>

      <section className="reel-section">
        <h2 className="section-title">Food Reels</h2>
        <div className="reel-grid" >
          {videos.map((src, idx) => (
            <div className="grid-item" key={idx}>
              <video 
              className="grid-video"
              style={{objectFit: 'cover', width:'100%', height: '100%'}}
             
                src={src.video}  
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
