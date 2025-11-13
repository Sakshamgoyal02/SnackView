import React, { useState, useEffect } from "react";
import "../styles/theme.css";
import axios from "axios";
import "../styles/create-food.css";
import {useNavigate} from 'react-router-dom'

const CreateFood = () => {
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    restaurant: "",
    video: "",
  });

      const navigate = useNavigate();


  // ✅ Separate state for preview URL
  const [videoPreview, setVideoPreview] = useState(null);

  //  Handle text input fields 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };

  //  Handle video file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFood((prev) => ({ ...prev, video: file }));

      // Clean up old preview URL
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }

      // Create a new preview URL
      const previewURL = URL.createObjectURL(file);
      setVideoPreview(previewURL);
    }
  };

  // ✅ Keep existing handleAddFood function as-is
  const handleAddFood = async (e) => {
    e.preventDefault();
    const { name, description, restaurant, video } = newFood;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("restaurant", restaurant);
    formData.append("video", video);

    const response = await axios.post("http://localhost:3000/api/food", formData, {
      withCredentials: true,
    });
    console.log(response.data);
    navigate("/");
  };

  // ✅ Cleanup video URL when component unmounts or new file selected
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  return (
    <div className="page-wrap">
      <header className="header">
        <h1>🍽️ Partner Food Listing</h1>
        <p className="subtext">
          Add and manage your restaurant’s featured dishes
        </p>
      </header>

      <form className="food-card add-form" onSubmit={handleAddFood}>
        {/* === Video Upload Box === */}
        <div className="food-video upload-box">
          <label htmlFor="videoUpload" className="upload-label">
            {videoPreview ? (
              <video
                src={videoPreview}
                controls
                style={{ width: "100%", borderRadius: "12px" }}
              />
            ) : (
              <>
                <span className="upload-icon">📹</span>
                <p>Click or drag to upload a food promo video</p>
              </>
            )}
          </label>
          <input
            type="file"
            id="videoUpload"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            hidden
          />
        </div>

        {/* === Input Fields === */}
        <div className="food-details compact">
          <input
            type="text"
            name="name"
            placeholder="🍜 Food Name"
            value={newFood.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="📝 Food Description"
            value={newFood.description}
            onChange={handleChange}
            rows="3"
          />
          <input
            type="text"
            name="restaurant"
            placeholder="🏨 Restaurant Name"
            value={newFood.restaurant}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-accent">
          ➕ Add Food Item
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
