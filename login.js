import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const images = [
  { src: "/images/img1.avif", text: "Sustainable EV technology for the future." },
  { src: "/images/img2.jpg", text: "Hybrid vehicles reduce fuel consumption." },
  { src: "/images/img3.jpg", text: "Fast charging stations for modern EVs." },
  { src: "/images/img4.jpg", text: "AI-powered smart mobility solutions." },
];

const Login = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Image changes every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-container">
      {/* Left side with rotating images */}
      <div className="image-slider">
        <div className="slider-wrapper">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slider-image ${index === currentImage ? "active" : ""}`}
            >
              <img src={image.src} alt="EV Concept" />
              <p className="image-text">{image.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side login form */}
      <div className="login-box">
        <h2 className="brand-name">EcodriveAI</h2>
        <p className="sign-in-text">Sign in</p>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
          
          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
          
          <div className="remember-forgot">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <a href="/">Forgot Password?</a>
          </div>

          <button type="submit" onClick={() => navigate("/dashboard")}>Login</button>
        </form>
        <p className="register-text">Don't have an account? <a href="/">Create one</a></p>
      </div>
    </div>
  );
};

export default Login;
