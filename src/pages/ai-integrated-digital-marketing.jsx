import React, { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import './ai-integrated-digital-marketing.css';

function AiIntegratedDigitalMarketing({ onNavigate }) {
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
    <main className="ai-blog-page">
      {/* ── Scroll Progress Tracking Line ── */}
      <div 
        className="ai-scroll-track" 
        style={{ width: `${scrollProgress}%` }} 
        aria-hidden="true" 
      />

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

          {/* Description Paragraph */}
          <p className="ai-blog-hero__desc">
            AI has fundamentally changed what is possible in <br />
            digital marketing. From hyper-personalised <br />
            campaigns to predictive analytics, discover how to <br />
            harness AI to grow brands faster, smarter, and more <br />
            efficiently.
          </p>

          {/* Author Badge Pill */}
          <div className="ai-blog-hero__author-badge">
            <div className="ai-blog-hero__author-avatar">M</div>
            <span className="ai-blog-hero__author-name">Monkey Tribe</span>
            <span className="ai-blog-hero__author-dot" aria-hidden="true">•</span>
            <span className="ai-blog-hero__author-date">Tuesday, May 19, 2026</span>
            <span className="ai-blog-hero__author-dot" aria-hidden="true">•</span>
            <span className="ai-blog-hero__author-read-time">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ai-blog-hero__clock-icon">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              8 min read
            </span>
          </div>

        </div>
      </section>

      {/* ── Blog Body Wrapper with Left Vertical Gradient Line ── */}
      <div className="ai-blog-body-wrapper">
        <div className="ai-blog-line-container" aria-hidden="true">
          <div className="ai-vertical-line" />
        </div>

        {/* ── Blog Content Section ── */}
        <section className="ai-content-section">
        <div className="ai-content-container">
          <h1 className="ai-content-heading">
            AI-Integrated Digital Marketing: How Smart Marketers Are Winning in 2026
          </h1>
          <p className="ai-content-para">
            Digital marketing has always been about reaching the right person, with the right message, at the right time. For decades, that goal remained aspirational — constrained by budget, bandwidth, and the limits of human capacity.
          </p>
          <p className="ai-content-para">
            AI has changed that equation entirely.
          </p>
          <p className="ai-content-para">
            In 2026, the most effective marketers are not those with the biggest teams or the largest budgets. They are those who have learned to integrate AI into every layer of their marketing strategy — from research and ideation to execution and optimisation.
          </p>
          <p className="ai-content-para">
            This is not the future of marketing. It is the present. And the gap between AI-integrated marketers and those still working the old way is widening every month.
          </p>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Means Section ── */}
      <section className="ai-means-section">
        <div className="ai-means-container">
          <div className="ai-means-header-wrap">
            <span className="ai-means-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-means-heading">
              What AI-Integrated Digital Marketing <br /> Actually Means
            </h2>
            <div className="ai-means-line-decor" aria-hidden="true" />
          </div>

          <p className="ai-means-para">
            AI-integrated digital marketing is not about replacing marketers with machines. It is about <strong>augmenting human creativity and strategy with machine speed and intelligence</strong>.
          </p>

          <p className="ai-means-subpara">
            It means using AI to:
          </p>

          <ul className="ai-means-list">
            <li>Research audiences and competitors faster and more deeply</li>
            <li>Generate content ideas and first drafts at scale</li>
            <li>Personalise messaging for different audience segments automatically</li>
            <li>Optimise campaigns in real time based on performance data</li>
            <li>Predict which strategies will work before you spend a rupee</li>
          </ul>

          <p className="ai-means-para-extra">
            The marketer's role shifts from execution to <strong>direction</strong> — setting strategy, making creative judgments, and ensuring the AI-generated work reflects genuine brand intelligence.
          </p>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Pillars Section ── */}
      <section className="ai-pillars-section">
        <div className="ai-pillars-container">
          <div className="ai-pillars-header-wrap">
            <span className="ai-pillars-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-pillars-heading">
              The Five Pillars of AI-Integrated <br /> Marketing
            </h2>
            <div className="ai-pillars-line-decor" aria-hidden="true" />
          </div>

          <div className="ai-pillar-block">
            <div className="ai-pillar-subheading-wrap">
              <span className="ai-pillar-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-pillar-subheading">
                Pillar 1: AI-Powered Audience Intelligence
              </h3>
            </div>

            <p className="ai-pillar-para">
              Understanding your audience has always been the foundation of great marketing. AI makes that understanding deeper, faster, and more actionable than ever before.
            </p>

            <p className="ai-pillar-subpara">
              What AI enables:
            </p>

            <ul className="ai-pillar-list">
              <li>Analysing thousands of customer reviews, social comments, and forum posts to identify unmet needs and emotional triggers</li>
              <li>Building detailed audience personas based on behavioural data, not just demographics</li>
              <li>Predicting audience segments most likely to convert based on historical patterns</li>
              <li>Identifying emerging trends before they peak — giving you a first-mover advantage</li>
            </ul>

            <p className="ai-pillar-practice">
              <strong>In practice:</strong> A brand launching a new skincare product can use AI to analyse competitor reviews, identify the top complaints customers have about existing products, and build a campaign that directly addresses those pain points — all before spending a single rupee on creative production.
            </p>
          </div>

          <div className="ai-pillar-block">
            <div className="ai-pillar-subheading-wrap">
              <span className="ai-pillar-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-pillar-subheading">
                Pillar 2: AI-Driven Content Creation
              </h3>
            </div>

            <p className="ai-pillar-para">
              Content is the engine of digital marketing — and AI has supercharged it. Marketers who once struggled to produce two blog posts a week can now publish daily, across multiple formats and channels, without sacrificing quality.
            </p>

            <p className="ai-pillar-subpara">
              What AI enables:
            </p>

            <ul className="ai-pillar-list">
              <li>Generating SEO-optimised blog posts, social captions, email copy, and ad scripts at scale</li>
              <li>Adapting a single piece of content for multiple platforms and audience segments automatically</li>
              <li>Maintaining brand voice consistency across all AI-generated content</li>
              <li>A/B testing multiple content variations simultaneously to identify what resonates</li>
            </ul>

            <p className="ai-pillar-practice">
              <strong>The critical caveat:</strong> AI-generated content requires human editorial judgment. The best AI-integrated content teams use AI to produce volume and speed, then apply human creativity and brand intelligence to elevate the output. AI writes the first draft; humans make it brilliant.
            </p>

            {/* ── Quote / Formula Card ── */}
            <div className="ai-pillar-quote-card">
              <span className="ai-pillar-quote-icon" aria-hidden="true">“</span>
              <p className="ai-pillar-quote-text">
                The winning formula: AI for scale, humans for soul.
              </p>
            </div>
          </div>

          <div className="ai-pillar-block">
            <div className="ai-pillar-subheading-wrap">
              <span className="ai-pillar-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-pillar-subheading">
                Pillar 3: Hyper-Personalisation at Scale
              </h3>
            </div>

            <p className="ai-pillar-para">
              Personalisation has been a marketing buzzword for years. AI has finally made it genuinely achievable — not just for enterprise brands with massive data teams, but for businesses of every size.
            </p>

            <p className="ai-pillar-subpara">
              What AI enables:
            </p>

            <ul className="ai-pillar-list">
              <li>Delivering personalised email content based on individual behaviour, preferences, and purchase history</li>
              <li>Dynamically adjusting website content for different visitor segments in real time</li>
              <li>Creating personalised ad experiences that adapt based on where a user is in the customer journey</li>
              <li>Sending communications at the optimal time for each individual recipient</li>
            </ul>

            <p className="ai-pillar-practice">
              <strong>Why it matters:</strong> Studies consistently show that personalised marketing outperforms generic messaging by significant margins — higher open rates, higher click-through rates, higher conversion rates. AI makes personalisation scalable.
            </p>
          </div>

          <div className="ai-pillar-block">
            <div className="ai-pillar-subheading-wrap">
              <span className="ai-pillar-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-pillar-subheading">
                Pillar 4: Predictive Analytics and Campaign Optimisation
              </h3>
            </div>

            <p className="ai-pillar-para">
              One of the most powerful applications of AI in marketing is its ability to predict outcomes and optimise performance — before, during, and after campaigns.
            </p>

            <p className="ai-pillar-subpara">
              What AI enables:
            </p>

            <ul className="ai-pillar-list">
              <li>Predicting which audience segments will respond best to a given campaign</li>
              <li>Identifying the optimal budget allocation across channels before launch</li>
              <li>Automatically adjusting bids, targeting, and creative in real time based on performance signals</li>
              <li>Forecasting campaign outcomes with greater accuracy than traditional methods</li>
            </ul>

            <p className="ai-pillar-practice">
              <strong>In practice:</strong> Instead of waiting until the end of a campaign to analyse what worked, AI-integrated marketers receive real-time signals and can make adjustments mid-flight — shifting budget toward what is working and away from what is not.
            </p>
          </div>

          <div className="ai-pillar-block">
            <div className="ai-pillar-subheading-wrap">
              <span className="ai-pillar-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-pillar-subheading">
                Pillar 5: Conversational Marketing and AI-Powered Customer Journeys
              </h3>
            </div>

            <p className="ai-pillar-para">
              The customer journey is no longer linear — and AI is enabling marketers to engage customers at every touchpoint, in real time, at scale.
            </p>

            <p className="ai-pillar-subpara">
              What AI enables:
            </p>

            <ul className="ai-pillar-list">
              <li>AI chatbots that qualify leads, answer questions, and guide customers through the purchase journey 24/7</li>
              <li>Conversational email sequences that adapt based on how recipients engage</li>
              <li>AI-powered customer service that resolves common queries instantly while escalating complex issues to humans</li>
              <li>Personalised retargeting that speaks to exactly where a customer dropped off in the journey</li>
            </ul>
          </div>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Tools Section ── */}
      <section className="ai-tools-section">
        <div className="ai-tools-container">
          <div className="ai-tools-header-wrap">
            <span className="ai-tools-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-tools-heading">
              AI Tools Every Digital Marketer Should <br /> Know
            </h2>
            <div className="ai-tools-line-decor" aria-hidden="true" />
          </div>

          {/* Category 1 */}
          <div className="ai-tool-category">
            <div className="ai-tool-subheading-wrap">
              <span className="ai-tool-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-tool-subheading">Content & Copy</h3>
            </div>
            <ul className="ai-tool-list">
              <li>
                <strong>ChatGPT / Claude / Gemini</strong> — Long-form content, ad copy, email sequences, social captions
              </li>
              <li>
                <strong>Jasper / Copy.ai</strong> — Marketing-specific AI writing tools
              </li>
              <li>
                <strong>Canva AI</strong> — AI-assisted design for social and display assets
              </li>
            </ul>
          </div>

          {/* Category 2 */}
          <div className="ai-tool-category">
            <div className="ai-tool-subheading-wrap">
              <span className="ai-tool-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-tool-subheading">SEO & Research</h3>
            </div>
            <ul className="ai-tool-list">
              <li>
                <strong>Semrush AI / Ahrefs</strong> — AI-powered keyword research and competitor analysis
              </li>
              <li>
                <strong>Surfer SEO</strong> — AI content optimisation for search rankings
              </li>
              <li>
                <strong>Perplexity</strong> — AI-powered research and synthesis
              </li>
            </ul>
          </div>

          {/* Category 3 */}
          <div className="ai-tool-category">
            <div className="ai-tool-subheading-wrap">
              <span className="ai-tool-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-tool-subheading">Analytics & Optimisation</h3>
            </div>
            <ul className="ai-tool-list">
              <li>
                <strong>Google Analytics 4 with AI insights</strong> — Predictive metrics and audience intelligence
              </li>
              <li>
                <strong>Meta Advantage+</strong> — AI-automated campaign optimisation on Facebook and Instagram
              </li>
              <li>
                <strong>Google Performance Max</strong> — AI-driven cross-channel campaign management
              </li>
            </ul>
          </div>

          {/* Category 4 */}
          <div className="ai-tool-category">
            <div className="ai-tool-subheading-wrap">
              <span className="ai-tool-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-tool-subheading">Personalisation & Automation</h3>
            </div>
            <ul className="ai-tool-list">
              <li>
                <strong>HubSpot AI</strong> — AI-powered CRM, email, and marketing automation
              </li>
              <li>
                <strong>Klaviyo</strong> — AI-driven email personalisation for e-commerce
              </li>
              <li>
                <strong>Drift / Intercom</strong> — AI-powered conversational marketing
              </li>
            </ul>
          </div>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Framework Section ── */}
      <section className="ai-framework-section">
        <div className="ai-framework-container">
          <div className="ai-framework-header-wrap">
            <span className="ai-framework-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-framework-heading">
              Building an AI-Integrated Marketing <br /> Strategy: A Framework
            </h2>
            <div className="ai-framework-line-decor" aria-hidden="true" />
          </div>

          {/* Step 1 */}
          <div className="ai-framework-step">
            <div className="ai-framework-subheading-wrap">
              <span className="ai-framework-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-framework-subheading">Step 1: Audit Your Current Stack</h3>
            </div>
            <p className="ai-framework-para">
              Identify where AI can add the most value in your existing marketing workflow. Look for high-volume, repetitive tasks (content production, reporting, A/B testing) as your starting points.
            </p>
          </div>

          {/* Step 2 */}
          <div className="ai-framework-step">
            <div className="ai-framework-subheading-wrap">
              <span className="ai-framework-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-framework-subheading">Step 2: Start with One Channel</h3>
            </div>
            <p className="ai-framework-para">
              Do not try to AI-integrate everything at once. Pick one channel — email, social, or SEO — and build your AI workflow there first. Learn, refine, then expand.
            </p>
          </div>

          {/* Step 3 */}
          <div className="ai-framework-step">
            <div className="ai-framework-subheading-wrap">
              <span className="ai-framework-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-framework-subheading">Step 3: Establish Your Brand Voice Guidelines</h3>
            </div>
            <p className="ai-framework-para">
              Before using AI for content creation, document your brand voice clearly. AI needs guardrails — tone, vocabulary, values, and what to avoid. This is what keeps AI-generated content on-brand.
            </p>
          </div>

          {/* Step 4 */}
          <div className="ai-framework-step">
            <div className="ai-framework-subheading-wrap">
              <span className="ai-framework-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-framework-subheading">Step 4: Build a Human-AI Workflow</h3>
            </div>
            <p className="ai-framework-para">
              Define clearly what AI does and what humans do in your content and campaign process. A typical workflow:
            </p>
            <ul className="ai-framework-list">
              <li>AI generates research insights and content briefs</li>
              <li>AI produces first drafts</li>
              <li>Human editor refines, elevates, and approves</li>
              <li>AI optimises distribution and timing</li>
              <li>Human strategist interprets results and sets direction</li>
            </ul>
          </div>

          {/* Step 5 */}
          <div className="ai-framework-step">
            <div className="ai-framework-subheading-wrap">
              <span className="ai-framework-bullet-decor-small" aria-hidden="true">•</span>
              <h3 className="ai-framework-subheading">Step 5: Measure What Matters</h3>
            </div>
            <p className="ai-framework-para">
              AI generates enormous amounts of data. Define your key metrics upfront — and resist the temptation to track everything. Focus on the metrics that connect directly to business outcomes.
            </p>
          </div>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Ethics Section ── */}
      <section className="ai-ethics-section">
        <div className="ai-ethics-container">
          <div className="ai-ethics-header-wrap">
            <span className="ai-ethics-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-ethics-heading">
              The Ethical Dimension of AI Marketing
            </h2>
            <div className="ai-ethics-line-decor" aria-hidden="true" />
          </div>

          <p className="ai-ethics-para">
            With great power comes great responsibility. AI-integrated marketing raises important ethical questions that every marketer must grapple with:
          </p>

          <ul className="ai-ethics-list">
            <li>
              <strong>Transparency</strong> — Should customers know when they are interacting with AI-generated content?
            </li>
            <li>
              <strong>Data privacy</strong> — How is the data powering personalisation being collected and used?
            </li>
            <li>
              <strong>Authenticity</strong> — At what point does AI-generated content undermine genuine brand voice?
            </li>
            <li>
              <strong>Bias</strong> — AI systems can perpetuate and amplify biases present in training data
            </li>
          </ul>

          <p className="ai-ethics-para-extra">
            The best AI-integrated marketers are not just technically skilled — they are ethically thoughtful. They use AI to serve customers better, not to manipulate them.
          </p>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Skills Gap Section ── */}
      <section className="ai-skills-gap-section">
        <div className="ai-skills-gap-container">
          <div className="ai-skills-gap-header-wrap">
            <span className="ai-skills-gap-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-skills-gap-heading">
              The Skills Gap — and the Opportunity
            </h2>
            <div className="ai-skills-gap-line-decor" aria-hidden="true" />
          </div>

          <p className="ai-skills-gap-para">
            Here is the uncomfortable truth: most marketing teams are significantly behind the curve on AI integration. The tools are available. The results are proven. But the skills to use them effectively are still rare.
          </p>

          <p className="ai-skills-gap-para">
            This is the opportunity. Marketers who invest in AI literacy now — who learn to use these tools strategically, creatively, and ethically — are positioning themselves at the front of a wave that is only going to grow.
          </p>

          <p className="ai-skills-gap-para-extra">
            The question is not whether AI will transform digital marketing. It already has. The question is whether you will be among those leading the transformation.
          </p>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Key Takeaways Section ── */}
      <section className="ai-takeaways-section">
        <div className="ai-takeaways-container">
          <div className="ai-takeaways-header-wrap">
            <span className="ai-takeaways-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-takeaways-heading">
              Key Takeaways
            </h2>
            <div className="ai-takeaways-line-decor" aria-hidden="true" />
          </div>

          <ul className="ai-takeaways-list">
            <li>
              AI-integrated marketing is about augmenting human creativity with machine intelligence — not replacing marketers
            </li>
            <li>
              The five pillars are: audience intelligence, content creation, hyper-personalisation, predictive analytics, and conversational marketing
            </li>
            <li>
              The winning formula is AI for scale and speed, humans for strategy and soul
            </li>
            <li>
              Building an AI-integrated marketing strategy requires clear brand voice guidelines, defined human-AI workflows, and focused measurement
            </li>
            <li>
              The skills gap is real — and it represents a significant career opportunity for marketers who invest in AI literacy now
            </li>
          </ul>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>
        </div>
      </section>

      {/* ── Blog Grow Faster Section ── */}
      <section className="ai-grow-faster-section">
        <div className="ai-grow-faster-container">
          <div className="ai-grow-faster-header-wrap">
            <span className="ai-grow-faster-bullet-decor" aria-hidden="true">•</span>
            <h2 className="ai-grow-faster-heading">
              Grow Faster with Monkey Tribe
            </h2>
            <div className="ai-grow-faster-line-decor" aria-hidden="true" />
          </div>

          <p className="ai-grow-faster-para">
            Our <strong>GrowthX</strong> course is built for marketers who want to harness AI to grow brands faster, smarter, and more efficiently. From AI content strategy to automated campaign management, GrowthX gives you the practical skills to lead in the AI marketing era.
          </p>

          {/* ── Slider / Pagination Indicator ── */}
          <div className="ai-slider-dots-container" aria-hidden="true">
            <span className="ai-slider-dot ai-slider-dot--active" />
            <div className="ai-slider-line" />
            <span className="ai-slider-dot ai-slider-dot--inactive" />
          </div>

          {/* ── Explore Topics ── */}
          <div className="ai-explore-topics-wrap">
            <span className="ai-explore-topics-eyebrow">EXPLORE TOPICS</span>
            <div className="ai-topics-pills-list">
              <span className="ai-topic-pill">#AI marketing</span>
              <span className="ai-topic-pill">#digital marketing</span>
              <span className="ai-topic-pill">#content strategy</span>
              <span className="ai-topic-pill">#automation</span>
              <span className="ai-topic-pill">#GrowthX</span>
              <span className="ai-topic-pill">#campaigns</span>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ── Blog Author Card Section ── */}
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

      {/* ── Footer Accent Line ── */}
      <div className="ai-footer-accent" aria-hidden="true" />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}

export default AiIntegratedDigitalMarketing;
