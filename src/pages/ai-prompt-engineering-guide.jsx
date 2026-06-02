import React, { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import './ai-prompt-engineering-guide.css';

function AiPromptEngineeringGuide({ onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="prompt-blog-page">
      {/* ── Scroll Progress Tracking Line ── */}
      <div 
        className="prompt-scroll-track" 
        style={{ width: `${scrollProgress}%` }} 
        aria-hidden="true" 
      />
      {/* ── Header ── */}
      <Header onNavigate={onNavigate} currentPage="blog" />

      {/* ── Hero Section ── */}
      <section className="prompt-blog-hero" aria-labelledby="prompt-blog-hero-heading">
        <div className="prompt-blog-hero__container">

          {/* Back to Blog Button */}
          <button
            className="prompt-blog-hero__back"
            onClick={() => onNavigate && onNavigate('blog')}
            aria-label="Back to Blog"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Blog
          </button>

          {/* Category Badge Pill */}
          <div className="prompt-blog-hero__badge-wrap">
            <span className="prompt-blog-hero__badge">
              <span className="prompt-blog-hero__badge-dot" aria-hidden="true" />
              AI & TECHNOLOGY
            </span>
          </div>

          {/* Giant Premium Title */}
          <h1 id="prompt-blog-hero-heading" className="prompt-blog-hero__title">
            AI Prompt Engineering: <br />
            The Art and Science of <br />
            Talking to Machines
          </h1>

          {/* Description Paragraph */}
          <p className="prompt-blog-hero__desc">
            Prompt engineering is the most powerful new skill of <br />
            the AI era. Learn what it is, why it matters, and how <br />
            mastering it can transform the way you work, create, <br />
            and think.
          </p>

          {/* Author Badge Pill */}
          <div className="prompt-blog-hero__author-badge">
            <div className="prompt-blog-hero__author-avatar">M</div>
            <span className="prompt-blog-hero__author-name">Monkey Tribe</span>
            <span className="prompt-blog-hero__author-dot" aria-hidden="true">•</span>
            <span className="prompt-blog-hero__author-date">Sunday, May 17, 2026</span>
            <span className="prompt-blog-hero__author-dot" aria-hidden="true">•</span>
            <span className="prompt-blog-hero__author-read-time">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="prompt-blog-hero__clock-icon">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              7 min read
            </span>
          </div>

        </div>
      </section>

      {/* ── Blog Body Wrapper with Left Vertical Gradient Line ── */}
      <div className="prompt-blog-body-wrapper">
        <div className="prompt-blog-line-container" aria-hidden="true">
          <div className="prompt-vertical-line" />
        </div>

        {/* ── Blog Content Section ── */}
        <section className="prompt-content-section">
          <div className="prompt-content-container">
            <h2 className="prompt-content-heading">
              AI Prompt Engineering: The Art and Science of Talking to Machines
            </h2>
            <p className="prompt-content-para">
              Imagine having access to the most capable assistant in human history — one that can write, analyse, code, strategise, teach, and create at extraordinary speed. Now imagine that most people are using it at about 10% of its potential.
            </p>
            <p className="prompt-content-para">
              That is the current state of AI adoption. And the gap between 10% and 100% is called <strong>prompt engineering</strong>.
            </p>

            {/* ── Slider / Pagination Indicator ── */}
            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* ── What Is Prompt Engineering Section ── */}
        <section className="prompt-definition-section">
          <div className="prompt-definition-container">
            <div className="prompt-definition-header-wrap">
              <span className="prompt-definition-bullet-decor" aria-hidden="true">•</span>
              <h2 className="prompt-definition-heading">
                What Is Prompt Engineering?
              </h2>
              <div className="prompt-definition-line-decor" aria-hidden="true" />
            </div>

            <p className="prompt-definition-para">
              Prompt engineering is the practice of designing, refining, and optimising the instructions you give to an AI system to produce the best possible outputs. It is the discipline of communicating with AI — precisely, strategically, and creatively.
            </p>
            <p className="prompt-definition-para">
              Think of it this way: a large language model (LLM) like GPT-5 or Claude is an extraordinarily powerful engine. Prompt engineering is knowing how to drive it.
            </p>
            <p className="prompt-definition-para">
              The same AI tool, given two different prompts, can produce outputs that are worlds apart in quality, relevance, and usefulness. The difference is not the tool — it is the person behind the prompt.
            </p>

            {/* ── Slider / Pagination Indicator ── */}
            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* ── Why Prompt Engineering Matters Section ── */}
        <section className="prompt-matters-section">
          <div className="prompt-matters-container">
            <div className="prompt-matters-header-wrap">
              <span className="prompt-matters-bullet-decor" aria-hidden="true">•</span>
              <h2 className="prompt-matters-heading">
                Why Prompt Engineering Matters
              </h2>
              <div className="prompt-matters-line-decor" aria-hidden="true" />
            </div>

            {/* Block 1 */}
            <div className="prompt-matters-block">
              <div className="prompt-matters-subheading-wrap">
                <span className="prompt-matters-bullet-decor-small" aria-hidden="true">•</span>
                <h3 className="prompt-matters-subheading">
                  The Quality Gap Is Real
                </h3>
              </div>

              <p className="prompt-definition-para">
                Here is a simple example. Consider two prompts for the same task:
              </p>

              <span className="prompt-matters-label">Weak prompt:</span>
              <div className="prompt-quote-card">
                <span className="prompt-quote-icon" aria-hidden="true">“</span>
                <p className="prompt-quote-text">
                  "Write me a social media post about our new course."
                </p>
              </div>

              <span className="prompt-matters-label">Strong prompt:</span>
              <div className="prompt-quote-card">
                <span className="prompt-quote-icon" aria-hidden="true">“</span>
                <p className="prompt-quote-text">
                  "Write a LinkedIn post for Monkey Tribe announcing the launch of PromptX, our AI Prompt Engineering course. The tone should be confident and inspiring, aimed at marketing professionals aged 25–40 who are curious about AI but haven't started learning yet. End with a clear call to action. Keep it under 200 words."
                </p>
              </div>

              <p className="prompt-definition-para">
                The second prompt will produce a dramatically better result — not because the AI is different, but because the instruction is richer, more specific, and more contextually aware.
              </p>
            </div>

            {/* Block 2 */}
            <div className="prompt-matters-block">
              <div className="prompt-matters-subheading-wrap">
                <span className="prompt-matters-bullet-decor-small" aria-hidden="true">•</span>
                <h3 className="prompt-matters-subheading">
                  It Is a Transferable Skill
                </h3>
              </div>

              <p className="prompt-definition-para">
                Prompt engineering is not tied to a single AI tool. The principles apply across ChatGPT, Claude, Gemini, Midjourney, and every AI system you will encounter. Learn the skill once, apply it everywhere.
              </p>
            </div>

            {/* Block 3 */}
            <div className="prompt-matters-block">
              <div className="prompt-matters-subheading-wrap">
                <span className="prompt-matters-bullet-decor-small" aria-hidden="true">•</span>
                <h3 className="prompt-matters-subheading">
                  It Is Already a Career
                </h3>
              </div>

              <p className="prompt-definition-para">
                Companies are hiring prompt engineers at salaries that rival senior software developers. Marketing teams, content studios, law firms, healthcare providers, and financial institutions are all looking for professionals who can extract maximum value from AI systems.
              </p>
            </div>

            {/* ── Slider / Pagination Indicator ── */}
            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>
      </div>

      {/* ── Visual Yellow Footer Accent Line ── */}
      <div className="prompt-footer-accent" aria-hidden="true" />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}

export default AiPromptEngineeringGuide;
