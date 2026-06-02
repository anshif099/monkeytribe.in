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

        {/* Core Principles of Effective Prompting Section */}
        <section className="prompt-principles-section">
          <div className="prompt-principles-container">
            <div className="prompt-principles-header-wrap">
              <span className="prompt-principles-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-principles-heading">
                The Core Principles of Effective <br /> Prompting
              </h2>
              <div className="prompt-principles-line-decor" aria-hidden="true" />
            </div>

            <div className="prompt-principles-block">
              <div className="prompt-principles-subheading-wrap">
                <span className="prompt-principles-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-principles-subheading">
                  1. Be Specific and Contextual
                </h3>
              </div>

              <p className="prompt-principles-para">
                Vague prompts produce vague outputs. The more context you provide &mdash; about your audience, your goal, your tone, your constraints &mdash; the better the result.
              </p>

              <p className="prompt-principles-example">
                <strong>Instead of:</strong> "Summarise this article." <strong>Try:</strong> "Summarise this article in 3 bullet points for a non-technical audience. Focus on the business implications, not the technical details."
              </p>
            </div>

            <div className="prompt-principles-block">
              <div className="prompt-principles-subheading-wrap">
                <span className="prompt-principles-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-principles-subheading">
                  2. Assign a Role
                </h3>
              </div>

              <p className="prompt-principles-para">
                AI systems respond powerfully to role assignments. When you tell an AI to act as a specific expert, it draws on patterns associated with that expertise.
              </p>

              <p className="prompt-principles-example">
                <strong>Example:</strong> "You are a senior brand strategist with 15 years of experience in FMCG. Review the following brand brief and identify the three biggest strategic gaps."
              </p>
            </div>

            <div className="prompt-principles-block">
              <div className="prompt-principles-subheading-wrap">
                <span className="prompt-principles-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-principles-subheading">
                  3. Use the Chain-of-Thought Technique
                </h3>
              </div>

              <p className="prompt-principles-para">
                For complex tasks, ask the AI to think step by step before giving its final answer. This dramatically improves the quality of reasoning.
              </p>

              <p className="prompt-principles-example">
                <strong>Example:</strong> "Before answering, think through the problem step by step. Then give me your recommendation."
              </p>
            </div>

            <div className="prompt-principles-block">
              <div className="prompt-principles-subheading-wrap">
                <span className="prompt-principles-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-principles-subheading">
                  4. Provide Examples (Few-Shot Prompting)
                </h3>
              </div>

              <p className="prompt-principles-para">
                Show the AI what good looks like. Providing one or two examples of the output you want dramatically improves consistency and quality.
              </p>

              <p className="prompt-principles-example">
                <strong>Example:</strong> "Here are two examples of the tone I want: [Example 1] [Example 2]. Now write a third in the same style about [topic]."
              </p>
            </div>

            <div className="prompt-principles-block">
              <div className="prompt-principles-subheading-wrap">
                <span className="prompt-principles-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-principles-subheading">
                  5. Iterate and Refine
                </h3>
              </div>

              <p className="prompt-principles-para">
                The first output is rarely the final output. Treat prompting as a conversation &mdash; refine, redirect, and build on each response.
              </p>

              <p className="prompt-principles-label">
                Refinement prompts:
              </p>

              <ul className="prompt-principles-list">
                <li>"Make this more concise."</li>
                <li>"Rewrite the opening &mdash; it needs to be more compelling."</li>
                <li>"Add more specific examples to support the second point."</li>
              </ul>
            </div>

            <div className="prompt-principles-block">
              <div className="prompt-principles-subheading-wrap">
                <span className="prompt-principles-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-principles-subheading">
                  6. Set Constraints
                </h3>
              </div>

              <p className="prompt-principles-para">
                Constraints are not limitations &mdash; they are creative parameters that sharpen the output.
              </p>

              <p className="prompt-principles-label">
                Examples of useful constraints:
              </p>

              <ul className="prompt-principles-list">
                <li>Word count: "Keep this under 150 words."</li>
                <li>Format: "Present this as a numbered list."</li>
                <li>Tone: "Write in a warm, conversational tone &mdash; avoid corporate jargon."</li>
                <li>Audience: "This is for first-year university students with no prior knowledge of marketing."</li>
              </ul>
            </div>

            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* Advanced Prompting Techniques Section */}
        <section className="prompt-advanced-section">
          <div className="prompt-advanced-container">
            <div className="prompt-advanced-header-wrap">
              <span className="prompt-advanced-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-advanced-heading">
                Advanced Prompting Techniques
              </h2>
              <div className="prompt-advanced-line-decor" aria-hidden="true" />
            </div>

            <div className="prompt-advanced-block">
              <div className="prompt-advanced-subheading-wrap">
                <span className="prompt-advanced-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-advanced-subheading">
                  The RISEN Framework
                </h3>
              </div>

              <p className="prompt-advanced-para">
                A structured approach to building powerful prompts:
              </p>

              <ul className="prompt-advanced-list">
                <li>Role &mdash; Who is the AI in this interaction?</li>
                <li>Instructions &mdash; What exactly do you want it to do?</li>
                <li>Steps &mdash; What process should it follow?</li>
                <li>End Goal &mdash; What does success look like?</li>
                <li>Narrows &mdash; What constraints apply?</li>
              </ul>
            </div>

            <div className="prompt-advanced-block">
              <div className="prompt-advanced-subheading-wrap">
                <span className="prompt-advanced-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-advanced-subheading">
                  Prompt Chaining
                </h3>
              </div>

              <p className="prompt-advanced-para">
                Break complex tasks into a sequence of smaller prompts, where each output feeds into the next. This is particularly powerful for multi-stage creative or analytical work.
              </p>

              <p className="prompt-advanced-label">
                Example chain:
              </p>

              <ul className="prompt-advanced-list">
                <li>"Analyse the target audience for this product."</li>
                <li>"Based on that analysis, identify the top 3 emotional triggers we should address."</li>
                <li>"Now write a campaign concept that activates those triggers."</li>
              </ul>
            </div>

            <div className="prompt-advanced-block">
              <div className="prompt-advanced-subheading-wrap">
                <span className="prompt-advanced-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-advanced-subheading">
                  System Prompts and Personas
                </h3>
              </div>

              <p className="prompt-advanced-para">
                When using AI tools that allow system-level instructions, use them to establish a persistent persona, tone, and set of rules that apply across the entire conversation.
              </p>
            </div>

            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* Common Prompt Engineering Mistakes Section */}
        <section className="prompt-mistakes-section">
          <div className="prompt-mistakes-container">
            <div className="prompt-mistakes-header-wrap">
              <span className="prompt-mistakes-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-mistakes-heading">
                Common Prompt Engineering <br /> Mistakes
              </h2>
              <div className="prompt-mistakes-line-decor" aria-hidden="true" />
            </div>

            <ul className="prompt-mistakes-list">
              <li>
                <strong>Being too vague</strong> &mdash; "Write something good" tells the AI nothing useful
              </li>
              <li>
                <strong>Overloading a single prompt</strong> &mdash; Break complex tasks into steps
              </li>
              <li>
                <strong>Ignoring tone and audience</strong> &mdash; Always specify who you are writing for
              </li>
              <li>
                <strong>Accepting the first output</strong> &mdash; Iteration is where the magic happens
              </li>
              <li>
                <strong>Not providing context</strong> &mdash; AI has no knowledge of your specific situation unless you share it
              </li>
              <li>
                <strong>Forgetting constraints</strong> &mdash; Without boundaries, outputs tend to be generic
              </li>
            </ul>

            <div className="prompt-mistakes-quote-card">
              <span className="prompt-mistakes-quote-icon" aria-hidden="true">&ldquo;</span>
              <p className="prompt-mistakes-quote-text">
                The best prompt engineers are not just technically skilled &mdash; they are clear thinkers who know exactly what they want.
              </p>
            </div>

            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* Prompt Engineering Across Industries Section */}
        <section className="prompt-industries-section">
          <div className="prompt-industries-container">
            <div className="prompt-industries-header-wrap">
              <span className="prompt-industries-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-industries-heading">
                Prompt Engineering Across Industries
              </h2>
              <div className="prompt-industries-line-decor" aria-hidden="true" />
            </div>

            <div className="prompt-industries-block">
              <div className="prompt-industries-subheading-wrap">
                <span className="prompt-industries-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-industries-subheading">
                  Marketing &amp; Advertising
                </h3>
              </div>

              <ul className="prompt-industries-list">
                <li>Generating campaign concepts and ad copy variations</li>
                <li>Creating audience personas and customer journey maps</li>
                <li>Producing SEO-optimised content at scale</li>
                <li>Analysing competitor messaging and identifying gaps</li>
              </ul>
            </div>

            <div className="prompt-industries-block">
              <div className="prompt-industries-subheading-wrap">
                <span className="prompt-industries-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-industries-subheading">
                  Brand Strategy
                </h3>
              </div>

              <ul className="prompt-industries-list">
                <li>Developing brand voice guidelines</li>
                <li>Writing brand manifestos and positioning statements</li>
                <li>Generating naming options and taglines</li>
                <li>Stress-testing brand strategy against market scenarios</li>
              </ul>
            </div>

            <div className="prompt-industries-block">
              <div className="prompt-industries-subheading-wrap">
                <span className="prompt-industries-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-industries-subheading">
                  Education &amp; Training
                </h3>
              </div>

              <ul className="prompt-industries-list">
                <li>Creating course outlines and lesson plans</li>
                <li>Generating quiz questions and assessment rubrics</li>
                <li>Personalising learning content for different audiences</li>
                <li>Producing case studies and worked examples</li>
              </ul>
            </div>

            <div className="prompt-industries-block">
              <div className="prompt-industries-subheading-wrap">
                <span className="prompt-industries-bullet-decor-small" aria-hidden="true">&bull;</span>
                <h3 className="prompt-industries-subheading">
                  Business Operations
                </h3>
              </div>

              <ul className="prompt-industries-list">
                <li>Drafting proposals, reports, and presentations</li>
                <li>Summarising research and synthesising insights</li>
                <li>Automating repetitive writing tasks</li>
                <li>Building internal knowledge bases</li>
              </ul>
            </div>

            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* The Future of Prompt Engineering Section */}
        <section className="prompt-future-section">
          <div className="prompt-future-container">
            <div className="prompt-future-header-wrap">
              <span className="prompt-future-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-future-heading">
                The Future of Prompt Engineering
              </h2>
              <div className="prompt-future-line-decor" aria-hidden="true" />
            </div>

            <p className="prompt-future-para">
              As AI systems become more capable, the nature of prompt engineering will evolve. We are moving from simple text prompts toward:
            </p>

            <ul className="prompt-future-list">
              <li>
                <strong>Multimodal prompting</strong> &mdash; Combining text, images, audio, and video in a single instruction
              </li>
              <li>
                <strong>Agentic prompting</strong> &mdash; Designing prompts that enable AI to take autonomous, multi-step actions
              </li>
              <li>
                <strong>Personalised AI systems</strong> &mdash; Building AI assistants that understand your specific context, preferences, and goals over time
              </li>
            </ul>

            <p className="prompt-future-para prompt-future-para--closing">
              The professionals who invest in prompt engineering today are building a skill that will only become more valuable as these capabilities expand.
            </p>

            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* Key Takeaways Section */}
        <section className="prompt-takeaways-section">
          <div className="prompt-takeaways-container">
            <div className="prompt-takeaways-header-wrap">
              <span className="prompt-takeaways-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-takeaways-heading">
                Key Takeaways
              </h2>
              <div className="prompt-takeaways-line-decor" aria-hidden="true" />
            </div>

            <ul className="prompt-takeaways-list">
              <li>
                Prompt engineering is the practice of designing instructions that get the best possible outputs from AI systems
              </li>
              <li>
                Specificity, context, role assignment, and iteration are the foundations of effective prompting
              </li>
              <li>
                Advanced techniques like chain-of-thought, few-shot prompting, and prompt chaining unlock dramatically better results
              </li>
              <li>
                Prompt engineering is a transferable skill that applies across all AI tools and industries
              </li>
              <li>
                It is already a recognised and well-compensated career path &mdash; and demand is growing fast
              </li>
            </ul>

            <div className="prompt-slider-dots-container" aria-hidden="true">
              <span className="prompt-slider-dot prompt-slider-dot--active" />
              <div className="prompt-slider-line" />
              <span className="prompt-slider-dot prompt-slider-dot--inactive" />
            </div>
          </div>
        </section>

        {/* Learn Prompt Engineering with Monkey Tribe Section */}
        <section className="prompt-learn-section">
          <div className="prompt-learn-container">
            <div className="prompt-learn-header-wrap">
              <span className="prompt-learn-bullet-decor" aria-hidden="true">&bull;</span>
              <h2 className="prompt-learn-heading">
                Learn Prompt Engineering with <br /> Monkey Tribe
              </h2>
              <div className="prompt-learn-line-decor" aria-hidden="true" />
            </div>

            <p className="prompt-learn-para">
              Our <strong>PromptX</strong> course is designed to take you from curious beginner to confident prompt engineer. You will learn the frameworks, techniques, and real-world applications that turn AI from a novelty into a genuine professional superpower.
            </p>

            <div className="prompt-learn-divider" aria-hidden="true">
              <span className="prompt-learn-divider-line" />
              <span className="prompt-learn-dot prompt-learn-dot--active" />
              <span className="prompt-learn-dot" />
              <span className="prompt-learn-dot prompt-learn-dot--muted" />
              <span className="prompt-learn-divider-line" />
            </div>

            <div className="prompt-explore-topics-wrap">
              <span className="prompt-explore-topics-eyebrow">EXPLORE TOPICS</span>
              <div className="prompt-topics-pills-list">
                <span className="prompt-topic-pill">#prompt engineering</span>
                <span className="prompt-topic-pill">#AI</span>
                <span className="prompt-topic-pill">#ChatGPT</span>
                <span className="prompt-topic-pill">#LLM</span>
                <span className="prompt-topic-pill">#productivity</span>
                <span className="prompt-topic-pill">#PromptX</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Author Card Section */}
      <section className="prompt-author-section">
        <div className="prompt-author-container">
          <div className="prompt-author-divider" aria-hidden="true">
            <span className="prompt-author-divider-line" />
            <span className="prompt-author-divider-accent" />
            <span className="prompt-author-divider-line" />
          </div>

          <div className="prompt-author-card">
            <div className="prompt-author-avatar-wrap">
              <div className="prompt-author-avatar-inner">
                <span>M</span>
              </div>
            </div>
            <div className="prompt-author-info">
              <span className="prompt-author-eyebrow">WRITTEN BY</span>
              <h3 className="prompt-author-name">Monkey Tribe</h3>
              <p className="prompt-author-desc">
                Content creator and writer sharing insights and stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Accent Line */}
      <div className="prompt-footer-accent" aria-hidden="true" />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}

export default AiPromptEngineeringGuide;
