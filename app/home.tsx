// components/Home.js
import React from 'react';
// import './Home.css'; // Ensure you create this file and include the CSS

const Home = () => {
  return (
    <div className="home">
      {/* <header className="header">
        <div className="logo">Streamer Pro</div>
        <button className="cta-btn">Get Started</button>
      </header> */}

      <section className="hero">
        <div className="hero-text">
          <h1>Stream to the World</h1>
          <p>Effortlessly connect with your audience through live streaming and interactive chats.</p>
          <button className="cta-btn">Join Now</button>
        </div>
        {/* <div className="hero-image">
          <img src="https://via.placeholder.com/400" alt="Streaming Demo" />
        </div> */}
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Live Streaming</h3>
          <p>Broadcast with high-quality, low-latency streams to a global audience.</p>
        </div>
        <div className="feature-card">
          <h3>Live Chat</h3>
          <p>Engage in real-time with your viewers, building a stronger community.</p>
        </div>
      </section>

      {/* <footer className="footer">
        <p>&copy; 2024 Streamer Pro. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
