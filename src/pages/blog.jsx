import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import BlogHero from '../components/blog-hero.jsx';
import BlogGrid from '../components/blog-grid.jsx';

function Blog({ onNavigate }) {
  return (
    <main className="blog-page">
      {/* Header — standard light header like home */}
      <Header onNavigate={onNavigate} currentPage="blog" />

      {/* Blog Hero with Blog-Hero.png */}
      <BlogHero />

      {/* Interactive Blog Cards Grid with Filters */}
      <BlogGrid />

      {/* Footer — standard black like home */}
      <Footer />
    </main>
  );
}

export default Blog;
