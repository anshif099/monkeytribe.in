import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import './ai-integrated-digital-marketing.css';

function AiIntegratedDigitalMarketing({ onNavigate }) {
  return (
    <main className="ai-blog-page">
      {/* ── Header ── */}
      <Header onNavigate={onNavigate} currentPage="blog" />

      {/* ── Hero ── */}
      <section className="ai-blog-hero" aria-labelledby="ai-blog-hero-heading">
        <div className="ai-blog-hero__container">

          {/* Back to Blog */}
          <button
            className="ai-blog-hero__back"
            onClick={() => onNavigate && onNavigate('blog')}
            aria-label="Back to Blog"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Blog
          </button>

          {/* Category badge */}
          <div className="ai-blog-hero__badge-wrap">
            <span className="ai-blog-hero__badge">
              <span className="ai-blog-hero__badge-dot" aria-hidden="true" />
              DIGITAL MARKETING
            </span>
          </div>

          {/* Title */}
          <h1 id="ai-blog-hero-heading" className="ai-blog-hero__title">
            AI-Integrated Digital Marketing: How Smart Marketers Are Winning in 2026
          </h1>





        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}

export default AiIntegratedDigitalMarketing;
