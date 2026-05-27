import React from 'react';
import './our-story.css';
import teamImg from '../assets/team.webp';

function OurStory() {
  return (
    <section className="our-story" aria-labelledby="our-story-heading">
      <div className="our-story__container">
        
        {/* Left Column: Image with Overlaid Badge */}
        <div className="our-story__media-column">
          <div className="our-story__image-wrapper">
            <img 
              src={teamImg} 
              alt="Monkey Tribe team collaborating around a table with a tablet" 
              className="our-story__image"
              width="1200"
              height="800"
              loading="lazy"
            />
            <div className="our-story__badge" role="presentation">
              <span className="our-story__badge-est">EST. 2024</span>
              <strong className="our-story__badge-brand">Monkey Tribe</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Copy Content */}
        <div className="our-story__content-column">
          <span className="our-story__eyebrow">OUR STORY</span>
          <h2 id="our-story-heading" className="our-story__heading">
            Born from a decade<br />
            of advertising craft.
          </h2>
          
          <div className="our-story__text">
            <p>
              Creative Monkeys Advertising Pvt. Ltd. has spent over a decade building brands, running campaigns, and solving real marketing problems for clients across industries. We've seen firsthand how AI is reshaping the profession.
            </p>
            <p>
              Monkey Tribe was created to bridge the gap between the AI revolution and the professionals who need to navigate it. Not with abstract theory — but with the practical, hands-on knowledge that comes from actually using these tools in live campaigns.
            </p>
            <p>
              Our courses are built by practitioners, for practitioners. Every module reflects real workflows, real tools, and real results.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default OurStory;
