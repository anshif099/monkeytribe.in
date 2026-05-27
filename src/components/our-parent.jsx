import React from 'react';
import './our-parent.css';

function OurParent() {
  const capabilities = [
    'Brand Strategy',
    'Digital Marketing',
    'Creative Campaigns',
    'Media Planning'
  ];

  return (
    <section className="our-parent" aria-labelledby="our-parent-heading">
      <div className="our-parent__container">
        
        {/* Left Column: Descriptive Copy */}
        <div className="our-parent__content-column">
          <span className="our-parent__eyebrow">OUR PARENT COMPANY</span>
          <h2 id="our-parent-heading" className="our-parent__heading">
            <a
              href="https://creativemonkeys.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="our-parent__link"
            >
              Creative Monkeys<br />
              Advertising Pvt. Ltd.
            </a>
          </h2>
          
          <div className="our-parent__text">
            <p>
              A full-service advertising and brand strategy agency with expertise in digital marketing, creative campaigns, brand identity, and media planning. The agency behind Monkey Tribe — and the reason our courses are built differently.
            </p>
            <p>
              When you learn with Monkey Tribe, you're learning from an agency that lives and breathes the work. Not a training company that teaches about marketing — an agency that does it.
            </p>
          </div>
        </div>

        {/* Right Column: Dark Capabilities Card */}
        <div className="our-parent__card-column">
          <div className="our-parent__card">
            
            {/* Concentric circles background graphic */}
            <div className="our-parent__card-decor" aria-hidden="true">
              <div className="our-parent__decor-circle our-parent__decor-circle--inner" />
              <div className="our-parent__decor-circle our-parent__decor-circle--outer" />
            </div>

            {/* Card Content */}
            <div className="our-parent__card-content">
              <div className="our-parent__card-accent-line" aria-hidden="true" />
              
              <span className="our-parent__card-eyebrow">A DIVISION OF</span>
              
              <h3 className="our-parent__card-heading">
                <a
                  href="https://creativemonkeys.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="our-parent__card-link"
                >
                  Creative Monkeys
                  <span className="our-parent__card-subheading">Advertising Pvt. Ltd.</span>
                </a>
              </h3>

              <ul className="our-parent__capabilities-list">
                {capabilities.map((cap, index) => (
                  <li key={index} className="our-parent__capability-item">
                    <span className="our-parent__bullet" aria-hidden="true">•</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default OurParent;
