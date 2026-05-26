import { useEffect, useState } from "react";
import "./header.css";

import logo from "../assets/logo.png";

const Header = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <header className={`header${isScrolled ? " header--scrolled" : ""}`}>
      <div className="header-container">
        {/* Left */}
        <div className="header-logo" onClick={handleHomeClick}>
          <img src={logo} alt="Monkey Tribe" />
        </div>

        {/* Center */}
        <nav className="header-nav">
          <a
            href="#"
            className={currentPage === "home" ? "active" : ""}
            onClick={handleHomeClick}
          >
            Home
          </a>
          <a
            href="#"
            className={currentPage === "courses" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('courses');
            }}
          >
            Courses
          </a>
          <a
            href="#"
            className={currentPage === "programmes" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('programmes');
            }}
          >
            Programmes
          </a>
          <a
            href="#"
            className={currentPage === "webinars" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('webinars');
            }}
          >
            Webinars
          </a>
          <a
            href="#"
            className={currentPage === "blog" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('blog');
            }}
          >
            Blog
          </a>
          <a
            href="#"
            className={currentPage === "about" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('about');
            }}
          >
            About
          </a>
          <a
            href="#"
            className={currentPage === "contact" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('contact');
            }}
          >
            Contact
          </a>
        </nav>

        {/* Right */}
        <div className="header-actions">
          <button
            className="explore-btn"
            onClick={() => { if (onNavigate) onNavigate('courses') }}
          >
            Explore Courses
          </button>

          <button 
            className="register-btn"
            onClick={() => { if (onNavigate) onNavigate('register') }}
          >
            Register Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
