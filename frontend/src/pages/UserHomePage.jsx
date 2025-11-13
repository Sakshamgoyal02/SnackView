import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Home as HomeIcon } from "lucide-react";
import "../styles/reels.css";
import "../styles/navbar.css";

const UserHomePage = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());
  const navigate = useNavigate();

  // assign refs for each video element
  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  // autoplay/pause when in view
  useEffect(() => {
    if (!containerRef.current) return;
    const options = { threshold: [0.25, 0.6, 0.9] };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.intersectionRatio >= 0.6) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, options);

    const vids = Array.from(containerRef.current.querySelectorAll("video"));
    vids.forEach((v) => io.observe(v));

    return () => io.disconnect();
  }, [videos]);

  // fetch videos
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        console.log("Fetched:", response.data);
        setVideos(response.data.Fooditems || []);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);

  const handleLike = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: id },
      { withCredentials: true }
    );

    console.log(response.data.message);

  
  } catch (error) {
    console.error("Error liking food:", error);
  }
};



const handleSave = async (foodId) => {
  try {
    
    setVideos((prev) =>
      prev.map((v) => (v._id === foodId ? { ...v, saved: !v.saved } : v))
    );

    // Call backend
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId },
      { withCredentials: true }
    );

    console.log("✅ Save response:", response.data);
  } catch (error) {
    console.error("❌ Error saving food:", error);

    // Rollback UI if backend fails
    setVideos((prev) =>
      prev.map((v) => (v._id === foodId ? { ...v, saved: !v.saved } : v))
    );
  }
};
  return (
    <div className="reels-root">
      <div className="reels-container" ref={containerRef}>
        {videos.length === 0 ? (
          <div className="empty-state">No videos available</div>
        ) : (
          videos.map((item) => (
            <section className="reel" key={item._id}>
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video} 
                muted
                loop
                playsInline
                preload="metadata"
              />

              <div className="reel-actions">
<button
  aria-label="Like"
  className={`icon-btn ${item.liked ? "active" : ""}`}
  onClick={() => handleLike(item._id)}
>
  <Heart
    size={22}
    strokeWidth={1.8}
    stroke={item.liked ? "red" : "white"} // outline color
    fill={item.liked ? "red" : "none"}    // inside color
  />
</button>


                <button
                  aria-label="Save"
                  className={`icon-btn ${item.saved ? "active" : ""}`}
                  onClick={() => handleSave(item._id)}
                >
                  <Bookmark size={20} strokeWidth={1.8} />
                </button>
              </div>

              <div className="reel-overlay">
                <div className="reel-description">{item.description}</div>
                <Link
                  className="reel-visit"
                  to={`/restaurant/${item.foodPartner}`}
                >
                  Visit store
                </Link>
              </div>
            </section>
          ))
        )}
      </div>

      <nav className="bottom-navbar" role="navigation" aria-label="main nav">
        <button className="nav-item" onClick={() => navigate("/")}>
          <HomeIcon size={20} strokeWidth={1.6} />
          <span>Home</span>
        </button>

        <button className="nav-item" onClick={() => navigate("/saved")}>
          <Bookmark size={20} strokeWidth={1.6} />
          <span>Saved</span>
        </button>
      </nav>
    </div>
  );
};

export default UserHomePage;
