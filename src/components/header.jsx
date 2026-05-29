import { useEffect, useState } from "react";
import "./header.css";



const Header = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
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
          <picture>
            <source
              type="image/webp"
              srcSet="/header-logo-1x.webp 1x, /header-logo-2x.webp 2x"
            />
            <img src="/header-logo.png" alt="Monkey Tribe" width="115" height="144" />
          </picture>
        </div>

        {/* Center */}
        <nav className="header-nav">
          <a
            href="#"
            className={currentPage === "home" ? "active" : "text-foreground/60"}
            onClick={handleHomeClick}
          >
            Home
          </a>
          <a
            href="#"
            className={currentPage === "courses" ? "active" : "text-foreground/60"}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('courses');
            }}
          >
            Courses
          </a>
          <a
            href="#"
            className={currentPage === "programmes" ? "active" : "text-foreground/60"}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('programmes');
            }}
          >
            Programmes
          </a>
          <a
            href="#"
            className={currentPage === "webinars" ? "active" : "text-foreground/60"}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('webinars');
            }}
          >
            Webinars
          </a>
          <a
            href="#"
            className={currentPage === "blog" ? "active" : "text-foreground/60"}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('blog');
            }}
          >
            Blog
          </a>
          <a
            href="#"
            className={currentPage === "about" ? "active" : "text-foreground/60"}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('about');
            }}
          >
            About
          </a>
          <a
            href="#"
            className={currentPage === "contact" ? "active" : "text-foreground/60"}
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('contact');
            }}
          >
            Contact
          </a>
          <a
            href="/monkey-tribe-brochure.pdf"
            download
            className="download-brochure-btn"
            title="Download Monkey Tribe course brochure (PDF)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Brochure</span>
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

        {/* Mobile Hamburger toggle */}
        <button 
          className={`header-hamburger ${isMobileOpen ? "is-active" : ""}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile overlay menu drawer */}
      {isMobileOpen && (
        <nav className="mobile-nav-overlay" role="navigation" aria-label="Mobile Navigation Menu">
          <div className="mobile-nav-links">
            <a href="#" className={currentPage === "home" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('home'); }}>Home</a>
            <a href="#" className={currentPage === "courses" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('courses'); }}>Courses</a>
            <a href="#" className={currentPage === "programmes" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('programmes'); }}>Programmes</a>
            <a href="#" className={currentPage === "webinars" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('webinars'); }}>Webinars</a>
            <a href="#" className={currentPage === "blog" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('blog'); }}>Blog</a>
            <a href="#" className={currentPage === "about" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('about'); }}>About</a>
            <a href="#" className={currentPage === "contact" ? "active" : ""} onClick={(e) => { e.preventDefault(); setIsMobileOpen(false); if (onNavigate) onNavigate('contact'); }}>Contact</a>
            <a 
              href="/monkey-tribe-brochure.pdf" 
              download 
              className="download-brochure-btn-mobile"
              onClick={() => setIsMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Brochure</span>
            </a>
            
            <div className="mobile-nav-actions">
              <button 
                onClick={() => { setIsMobileOpen(false); if (onNavigate) onNavigate('register'); }} 
                className="register-btn"
              >
                Register Now
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
