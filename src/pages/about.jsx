import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import AboutHero from '../components/about-hero.jsx';
import OurStory from '../components/our-story.jsx';
import OurPrinciples from '../components/our-principles.jsx';
import OurParent from '../components/our-parent.jsx';
import AboutCTA from '../components/about-cta.jsx';
import './about.css';

function About({ onNavigate }) {
  return (
    <main className="about-page">
      {/* Header — same as contact page */}
      <Header onNavigate={onNavigate} currentPage="about" />

      {/* About Hero */}
      <AboutHero />

      {/* Our Story section */}
      <OurStory />

      {/* Our Principles section */}
      <OurPrinciples />

      {/* Parent Company section */}
      <OurParent />

      {/* Ready to Learn CTA section */}
      <AboutCTA onNavigate={onNavigate} />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default About;
