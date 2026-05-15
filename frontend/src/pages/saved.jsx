import React, { useState, useEffect } from "react";
import "../styles/reels.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import api from "../utils/api";

const Saved = () => {
  const navigate = useNavigate();
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const response = api.get("/api/food/saved")
    .then(response => {
      const savedFoods = response.data.savedFoods.map((item) =>({
        _id: item.food._id,
        video: item.food.video,
        description: item.food.description
      }))

      setSavedVideos(savedFoods)
    })
  }, []);

  return (
    <div className="reels-container">
      <div>
        <button className="back-btn back-btn-fixed" onClick={() => navigate(-1)} aria-label="Back">←</button>
      </div>
      {savedVideos.length === 0 ? (
        <p style={{ color: "#fff", textAlign: "center", marginTop: "50%" }}>
          No saved videos yet.
        </p>
      ) : (
        savedVideos.map((item) => (
          <section className="reel" key={item._id}>
            <video
              className="reel-video"
              src={item.video}
              muted
              loop
              autoPlay
              playsInline
            />
            <div className="reel-overlay">
              <div className="reel-description">{item.description}</div>
              <Link
                className="reel-visit"
                to={"/restaurant/" + item.foodPartner}
              >
                Visit restaurant
              </Link>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Saved;
