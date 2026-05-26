import React from 'react';
import './blog-hero.css';

function BlogHero() {
  return (
    <section className="blog-hero" aria-labelledby="blog-hero-heading">
      <div className="blog-hero__container">
        
        {/* Heading */}
        <h1 id="blog-hero-heading" className="blog-hero__title">
          Insights &amp; Ideas
        </h1>

        {/* Description */}
        <p className="blog-hero__desc">
          AI, marketing, branding, and copywriting — perspectives from the Monkey Tribe team and the world of modern advertising.
        </p>

      </div>
    </section>
  );
}

export default BlogHero;
