import React, { useState } from 'react';
import './blog-grid.css';

function BlogGrid({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  const topTags = ['#AI', '#AI careers', '#AI marketing', '#ChatGPT', '#GrowthX'];

  const articles = [
    {
      id: 1,
      category: 'Digital Marketing',
      categoryLabel: 'DIGITAL MARKETING',
      title: 'AI-Integrated Digital Marketing: How Smart Marketers Are Winning in 2026',
      excerpt: 'AI has fundamentally changed what is possible in digital marketing. From hyper-personalised campaigns to predictive...',
      date: 'May 19, 2026',
      readTime: '8 min read',
      author: 'Monkey Tribe',
      tags: ['#AI marketing', '#digital marketing', '#content strategy', '#GrowthX']
    },
    {
      id: 2,
      category: 'AI & Technology',
      categoryLabel: 'AI & TECHNOLOGY',
      title: 'AI Prompt Engineering: The Art and Science of Talking to Machines',
      excerpt: 'Prompt engineering is the most powerful new skill of the AI era. Learn what it is, why it matters, and how mastering it can...',
      date: 'May 17, 2026',
      readTime: '7 min read',
      author: 'Monkey Tribe',
      tags: ['#prompt engineering', '#AI', '#ChatGPT']
    },
    {
      id: 3,
      category: 'Career & Future of Work',
      categoryLabel: 'CAREER & FUTURE OF WORK',
      title: 'Career Opportunities in the AI Era: What the Future Holds for You',
      excerpt: 'AI is not replacing careers — it is creating entirely new ones. Discover the most in-demand roles, skills, and pathways...',
      date: 'May 15, 2026',
      readTime: '6 min read',
      author: 'Monkey Tribe',
      tags: ['#AI careers', '#future of work', '#upskilling', '#AI']
    }
  ];

  // Map article id -> page slug for navigation
  const articlePageMap = {
    1: 'ai-integrated-digital-marketing',
    2: 'ai-prompt-engineering-guide',
    3: 'career-opportunities-in-ai-era',
  };
  // Filtering Logic
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('all'); // Toggle off
    } else {
      setSelectedTag(tag); // Filter by selected tag
    }
  };

  return (
    <section className="blog-grid" aria-labelledby="blog-grid-heading">
      <div className="blog-grid__container">
        
        {/* Filters Bar */}
        <div className="blog-grid__filters">
          
          {/* Dropdown Category Selector */}
          <div className="blog-grid__dropdown-wrapper">
            <select 
              className="blog-grid__select" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              aria-label="Filter by category"
            >
              <option value="all">Filter by category</option>
              <option value="AI & Technology">AI &amp; Technology</option>
              <option value="Career & Future of Work">Career &amp; Future of Work</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          {/* Top Tag Pills */}
          <div className="blog-grid__tags-wrapper">
            <span className="blog-grid__tags-label">Tags:</span>
            <div className="blog-grid__tags-list">
              {topTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`blog-grid__tag-btn ${selectedTag === tag ? 'blog-grid__tag-btn--active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Posts Count */}
        <div className="blog-grid__count" role="status">
          {filteredArticles.length} {filteredArticles.length === 1 ? 'post' : 'posts'}
        </div>

        {/* Card Grid */}
        <div className="blog-grid__layout">
          {filteredArticles.map((article) => {
            const slug = articlePageMap[article.id];
            return (
            <article
              key={article.id}
              className={`blog-grid__card${slug ? ' blog-grid__card--link' : ''}`}
              onClick={slug && onNavigate ? () => onNavigate(slug) : undefined}
              role={slug ? 'button' : undefined}
              tabIndex={slug ? 0 : undefined}
              onKeyDown={slug && onNavigate ? (e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate(slug); } : undefined}
              aria-label={slug ? `Read article: ${article.title}` : undefined}
            >
              
              {/* Category pill */}
              <div className="blog-grid__card-category">
                <span className="blog-grid__card-badge">{article.categoryLabel}</span>
              </div>

              {/* Title */}
              <h2 id={`article-heading-${article.id}`} className="blog-grid__card-title">
                {article.title}
              </h2>

              {/* Description */}
              <p className="blog-grid__card-desc">
                {article.excerpt}
              </p>

              {/* Metadata */}
              <div className="blog-grid__card-meta">
                <span>{article.date}</span>
                <span className="blog-grid__card-meta-dot">•</span>
                <span>{article.readTime}</span>
                <span className="blog-grid__card-meta-dot">•</span>
                <span>{article.author}</span>
              </div>

              {/* Tags inside card */}
              <div className="blog-grid__card-tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="blog-grid__card-tag">{tag}</span>
                ))}
              </div>

              {/* Read More arrow — only for articles with a dedicated page */}
              {articlePageMap[article.id] && (
                <div className="blog-grid__card-readmore">
                  <span>Read Article</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}

            </article>
            );
          })}
        </div>

      </div>
      
      {/* Visual Yellow accent line dividing from the footer */}
      <div className="blog-grid__footer-accent" aria-hidden="true" />
    </section>
  );
}

export default BlogGrid;
