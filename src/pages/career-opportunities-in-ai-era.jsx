import React, { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import './ai-integrated-digital-marketing.css';
import './career-opportunities-in-ai-era.css';

function CareerOpportunitiesInAiEra({ onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress((window.scrollY / totalHeight) * 100);
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
    <main className="ai-blog-page career-ai-page">
      <div
        className="ai-scroll-track"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Header onNavigate={onNavigate} currentPage="blog" />

      <section className="ai-blog-hero" aria-labelledby="career-ai-hero-heading">
        <div className="ai-blog-hero__container">
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

          <div className="ai-blog-hero__badge-wrap">
            <span className="ai-blog-hero__badge">
              <span className="ai-blog-hero__badge-dot" aria-hidden="true" />
              CAREER &amp; FUTURE OF WORK
            </span>
          </div>

          <h1 id="career-ai-hero-heading" className="ai-blog-hero__title">
            Career <br />
            Opportunities in <br />
            the AI Era: What the <br />
            Future Holds for <br />
            You
          </h1>

          <p className="ai-blog-hero__desc">
            AI is not replacing careers &mdash; it is creating entirely new ones. Discover the most in-demand roles, skills, and pathways shaping the future of work in the age of artificial intelligence.
          </p>

          <div className="ai-blog-hero__author-badge">
            <div className="ai-blog-hero__author-avatar">M</div>
            <span className="ai-blog-hero__author-name">Monkey Tribe</span>
            <span className="ai-blog-hero__author-dot" aria-hidden="true">&bull;</span>
            <span className="ai-blog-hero__author-date">Friday, May 15, 2026</span>
            <span className="ai-blog-hero__author-dot" aria-hidden="true">&bull;</span>
            <span className="ai-blog-hero__author-read-time">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ai-blog-hero__clock-icon">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              6 min read
            </span>
          </div>
        </div>
      </section>

      <div className="ai-blog-body-wrapper">
        <div className="ai-blog-line-container" aria-hidden="true">
          <div className="ai-vertical-line" />
        </div>

        <section className="ai-content-section">
          <div className="ai-content-container">
            <h2 className="ai-content-heading">
              Career Opportunities in the AI Era: What the Future Holds for You
            </h2>

            <p className="ai-content-para">
              The conversation around AI and careers has been dominated by fear &mdash; fear of automation, fear of redundancy, fear of being left behind. But here is the truth that most headlines miss: <strong>AI is not eliminating careers. It is multiplying them.</strong>
            </p>

            <p className="ai-content-para">
              The professionals who will thrive in the next decade are not those who avoid AI &mdash; they are those who learn to work <em>with it</em>, <em>through it</em>, and <em>ahead</em> of it.
            </p>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-means-section">
          <div className="ai-means-container">
            <div className="ai-means-header-wrap">
              <span className="ai-means-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-means-heading">
                The Shift Is Already Happening
              </h2>
              <div className="ai-means-line-decor" aria-hidden="true" />
            </div>

            <p className="ai-means-para">
              According to the World Economic Forum, AI and automation will displace approximately 85 million jobs by 2025 &mdash; but simultaneously create <strong>97 million new roles.</strong> That is a net gain of 12 million positions, and the gap between those who benefit and those who don't comes down to one thing: <strong>adaptability.</strong>
            </p>

            <p className="ai-means-para-extra">
              The question is not whether AI will affect your career. It already is. The question is whether you are positioned to ride the wave or be swept under it.
            </p>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-pillars-section">
          <div className="ai-pillars-container">
            <div className="ai-pillars-header-wrap">
              <span className="ai-pillars-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-pillars-heading">
                The Most In-Demand AI-Era Careers
              </h2>
              <div className="ai-pillars-line-decor" aria-hidden="true" />
            </div>

            <div className="ai-pillar-block">
              <div className="ai-pillar-subheading-wrap">
                <span className="ai-pillar-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-pillar-subheading">
                  1. AI Prompt Engineer
                </h3>
              </div>

              <p className="ai-pillar-para">
                One of the most exciting new roles to emerge in recent years, prompt engineers design and optimise the instructions given to AI systems to produce the best possible outputs. Think of it as learning to speak the language of machines &mdash; fluently, creatively, and strategically.
              </p>

              <p className="ai-pillar-practice">
                <strong>Why it matters:</strong> Every company using AI tools needs people who can extract maximum value from them. This is no longer a niche skill &mdash; it is a core business competency.
              </p>

              <p className="ai-pillar-practice career-ai-skill-line">
                <strong>Skills needed:</strong> Critical thinking, language precision, systems thinking, domain expertise.
              </p>
            </div>

            <div className="ai-pillar-block">
              <div className="ai-pillar-subheading-wrap">
                <span className="ai-pillar-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-pillar-subheading">
                  2. AI Marketing Strategist
                </h3>
              </div>

              <p className="ai-pillar-para">
                Traditional digital marketers are evolving into AI marketing strategists &mdash; professionals who use AI tools to automate campaigns, generate content at scale, analyse audience behaviour, and personalise customer journeys in real time.
              </p>

              <p className="ai-pillar-practice">
                <strong>Why it matters:</strong> Marketing budgets are shifting toward AI-augmented strategies. Brands that use AI effectively are outperforming those that don't by significant margins.
              </p>

              <p className="ai-pillar-practice career-ai-skill-line">
                <strong>Skills needed:</strong> Digital marketing fundamentals, data literacy, AI tool proficiency, creative direction.
              </p>
            </div>

            <div className="ai-pillar-block">
              <div className="ai-pillar-subheading-wrap">
                <span className="ai-pillar-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-pillar-subheading">
                  3. Brand Strategist &amp; Storyteller
                </h3>
              </div>

              <p className="ai-pillar-para">
                In a world flooded with AI-generated content, <strong>human-led brand strategy</strong> becomes more valuable, not less. The ability to define a brand's voice, values, and narrative &mdash; and to ensure AI-generated content stays true to that identity &mdash; is a premium skill.
              </p>

              <p className="ai-pillar-practice">
                <strong>Why it matters:</strong> AI can produce content, but it cannot replace the strategic thinking behind a brand. Human creativity and cultural intelligence remain irreplaceable.
              </p>

              <p className="ai-pillar-practice career-ai-skill-line">
                <strong>Skills needed:</strong> Brand positioning, consumer psychology, storytelling, creative direction.
              </p>
            </div>

            <div className="ai-pillar-block">
              <div className="ai-pillar-subheading-wrap">
                <span className="ai-pillar-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-pillar-subheading">
                  4. AI Content Strategist
                </h3>
              </div>

              <p className="ai-pillar-para">
                Content strategists who understand how to blend human creativity with AI efficiency are in enormous demand. This role involves planning content ecosystems, briefing AI tools effectively, editing and refining AI outputs, and maintaining brand consistency across channels.
              </p>

              <p className="ai-pillar-practice">
                <strong>Why it matters:</strong> Content is still king &mdash; but the volume and speed at which it needs to be produced has changed dramatically. AI-literate content strategists bridge the gap.
              </p>

              <p className="ai-pillar-practice career-ai-skill-line">
                <strong>Skills needed:</strong> Content planning, SEO, editorial judgment, AI tool fluency.
              </p>
            </div>

            <div className="ai-pillar-block">
              <div className="ai-pillar-subheading-wrap">
                <span className="ai-pillar-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-pillar-subheading">
                  5. Data Analyst &amp; AI Interpreter
                </h3>
              </div>

              <p className="ai-pillar-para">
                As AI systems generate more data than ever before, the ability to interpret, contextualise, and act on that data is a critical skill. AI interpreters translate machine outputs into human decisions.
              </p>

              <p className="ai-pillar-practice">
                <strong>Why it matters:</strong> Data without interpretation is noise. Businesses need professionals who can turn AI insights into strategy.
              </p>

              <p className="ai-pillar-practice career-ai-skill-line">
                <strong>Skills needed:</strong> Data literacy, statistical thinking, visualisation, business acumen.
              </p>
            </div>

            <div className="ai-pillar-block">
              <div className="ai-pillar-subheading-wrap">
                <span className="ai-pillar-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-pillar-subheading">
                  6. UX Designer for AI Products
                </h3>
              </div>

              <p className="ai-pillar-para">
                As AI-powered products proliferate, the need for designers who understand how humans interact with AI systems is growing rapidly. This includes designing conversational interfaces, AI dashboards, and personalised user experiences.
              </p>

              <p className="ai-pillar-practice">
                <strong>Why it matters:</strong> The best AI product in the world fails if users cannot understand or trust it. Human-centred design is the bridge.
              </p>

              <p className="ai-pillar-practice career-ai-skill-line">
                <strong>Skills needed:</strong> UX/UI design, psychology, prototyping, AI product knowledge.
              </p>
            </div>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-tools-section">
          <div className="ai-tools-container">
            <div className="ai-tools-header-wrap">
              <span className="ai-tools-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-tools-heading">
                Skills That Will Define the AI Era
              </h2>
              <div className="ai-tools-line-decor" aria-hidden="true" />
            </div>

            <p className="ai-tools-intro career-ai-tools-intro">
              Regardless of which career path you choose, certain skills will be universally valuable in the AI era:
            </p>

            <ul className="ai-tool-list career-ai-skills-list">
              <li>
                <strong>AI Literacy</strong> &mdash; Understanding what AI can and cannot do
              </li>
              <li>
                <strong>Prompt Engineering</strong> &mdash; Communicating effectively with AI systems
              </li>
              <li>
                <strong>Critical Thinking</strong> &mdash; Evaluating AI outputs with discernment
              </li>
              <li>
                <strong>Creative Problem-Solving</strong> &mdash; Bringing human ingenuity to AI-assisted work
              </li>
              <li>
                <strong>Emotional Intelligence</strong> &mdash; The one thing AI cannot replicate
              </li>
              <li>
                <strong>Continuous Learning</strong> &mdash; The willingness to adapt as tools evolve
              </li>
            </ul>

            <div className="ai-pillar-quote-card career-ai-quote-card">
              <span className="ai-pillar-quote-icon" aria-hidden="true">&ldquo;</span>
              <p className="ai-pillar-quote-text">
                The most future-proof skill is not a technical one &mdash; it is the ability to keep learning.
              </p>
            </div>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-tools-section">
          <div className="ai-tools-container">
            <div className="ai-tools-header-wrap">
              <span className="ai-tools-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-tools-heading">
                Industries Being Transformed by AI
              </h2>
              <div className="ai-tools-line-decor" aria-hidden="true" />
            </div>

            <p className="ai-tools-intro career-ai-tools-intro">
              AI is not confined to the tech sector. It is reshaping every industry:
            </p>

            <ul className="ai-tool-list career-ai-skills-list">
              <li>
                <strong>Advertising &amp; Marketing</strong> &mdash; AI-generated campaigns, personalised ads, predictive analytics
              </li>
              <li>
                <strong>Education</strong> &mdash; Personalised learning, AI tutors, automated assessment
              </li>
              <li>
                <strong>Healthcare</strong> &mdash; Diagnostic AI, drug discovery, patient management
              </li>
              <li>
                <strong>Finance</strong> &mdash; Fraud detection, algorithmic trading, personalised financial advice
              </li>
              <li>
                <strong>Legal</strong> &mdash; Contract analysis, legal research, compliance automation
              </li>
              <li>
                <strong>Creative Industries</strong> &mdash; AI-assisted design, music, writing, and video production
              </li>
            </ul>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-framework-section">
          <div className="ai-framework-container">
            <div className="ai-framework-header-wrap">
              <span className="ai-framework-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-framework-heading">
                How to Future-Proof Your Career
              </h2>
              <div className="ai-framework-line-decor" aria-hidden="true" />
            </div>

            <div className="ai-framework-step">
              <div className="ai-framework-subheading-wrap">
                <span className="ai-framework-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-framework-subheading">
                  Step 1: Audit Your Current Skills
                </h3>
              </div>
              <p className="ai-framework-para">
                Identify which parts of your role are repetitive and process-driven (high automation risk) versus creative, relational, and strategic (low automation risk). Double down on the latter.
              </p>
            </div>

            <div className="ai-framework-step">
              <div className="ai-framework-subheading-wrap">
                <span className="ai-framework-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-framework-subheading">
                  Step 2: Learn AI Tools in Your Domain
                </h3>
              </div>
              <p className="ai-framework-para">
                You do not need to become a data scientist. You need to understand the AI tools relevant to your field and learn to use them effectively. Start with the tools your industry is already adopting.
              </p>
            </div>

            <div className="ai-framework-step">
              <div className="ai-framework-subheading-wrap">
                <span className="ai-framework-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-framework-subheading">
                  Step 3: Develop Your Human Edge
                </h3>
              </div>
              <p className="ai-framework-para">
                Empathy, creativity, ethical judgment, and cultural intelligence are deeply human capabilities. Invest in developing these &mdash; they are your competitive advantage in an AI world.
              </p>
            </div>

            <div className="ai-framework-step">
              <div className="ai-framework-subheading-wrap">
                <span className="ai-framework-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="ai-framework-subheading">
                  Step 4: Commit to Continuous Learning
                </h3>
              </div>
              <p className="ai-framework-para">
                The AI landscape is evolving at an unprecedented pace. Professionals who build a habit of continuous learning will always stay ahead of the curve.
              </p>
            </div>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-ethics-section">
          <div className="ai-ethics-container">
            <div className="ai-ethics-header-wrap">
              <span className="ai-ethics-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-ethics-heading">
                The Monkey Tribe Perspective
              </h2>
              <div className="ai-ethics-line-decor" aria-hidden="true" />
            </div>

            <p className="ai-ethics-para">
              At Monkey Tribe, we believe that the AI era is not a threat to human potential &mdash; it is the greatest amplifier of it. Our courses are designed to give you the practical skills, strategic thinking, and creative confidence to thrive in this new landscape.
            </p>

            <p className="ai-ethics-para-extra">
              Whether you are a marketer, a brand professional, a copywriter, or someone just starting out &mdash; there has never been a better time to invest in your AI education.
            </p>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-takeaways-section">
          <div className="ai-takeaways-container">
            <div className="ai-takeaways-header-wrap">
              <span className="ai-takeaways-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-takeaways-heading">
                Key Takeaways
              </h2>
              <div className="ai-takeaways-line-decor" aria-hidden="true" />
            </div>

            <ul className="ai-takeaways-list">
              <li>
                AI is creating more careers than it is eliminating &mdash; but only for those who adapt
              </li>
              <li>
                The most in-demand roles combine AI literacy with human creativity and strategic thinking
              </li>
              <li>
                Skills like prompt engineering, AI marketing, and brand strategy are among the fastest-growing in the job market
              </li>
              <li>
                Future-proofing your career requires continuous learning, not a one-time qualification
              </li>
              <li>
                The human edge &mdash; creativity, empathy, judgment &mdash; remains irreplaceable
              </li>
            </ul>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>
          </div>
        </section>

        <section className="ai-grow-faster-section career-ai-ready-section">
          <div className="ai-grow-faster-container">
            <div className="ai-grow-faster-header-wrap">
              <span className="ai-grow-faster-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="ai-grow-faster-heading">
                Ready to Begin?
              </h2>
              <div className="ai-grow-faster-line-decor" aria-hidden="true" />
            </div>

            <p className="ai-grow-faster-para">
              Explore our flagship courses &mdash; <strong>PromptX</strong>, <strong>GrowthX</strong>, <strong>BrandX</strong>, and <strong>CopyCraft</strong> &mdash; and take the first step toward a career built for the AI era.
            </p>

            <div className="ai-slider-dots-container" aria-hidden="true">
              <span className="ai-slider-dot ai-slider-dot--active" />
              <div className="ai-slider-line" />
              <span className="ai-slider-dot ai-slider-dot--inactive" />
            </div>

            <div className="ai-explore-topics-wrap">
              <span className="ai-explore-topics-eyebrow">EXPLORE TOPICS</span>
              <div className="ai-topics-pills-list">
                <span className="ai-topic-pill">#AI careers</span>
                <span className="ai-topic-pill">#future of work</span>
                <span className="ai-topic-pill">#upskilling</span>
                <span className="ai-topic-pill">#artificial intelligence</span>
                <span className="ai-topic-pill">#jobs</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="ai-author-section">
        <div className="ai-author-container">
          <div className="ai-author-card">
            <div className="ai-author-avatar-wrap">
              <div className="ai-author-avatar-inner">
                <span>M</span>
              </div>
            </div>
            <div className="ai-author-info">
              <span className="ai-author-eyebrow">WRITTEN BY</span>
              <h3 className="ai-author-name">Monkey Tribe</h3>
              <p className="ai-author-desc">
                Content creator and writer sharing insights and stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="ai-footer-accent" aria-hidden="true" />
      <Footer />
    </main>
  );
}

export default CareerOpportunitiesInAiEra;
