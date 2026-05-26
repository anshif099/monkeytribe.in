import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import RegisterHero from '../components/register-hero.jsx';
import RegisterForm from '../components/register-form.jsx';
import './register.css';

function Register({ onNavigate }) {
  return (
    <main className="register-page">
      {/* Header — transparent header overlay like contact/about */}
      <Header onNavigate={onNavigate} currentPage="register" />

      {/* Secure Enrolment Hero */}
      <RegisterHero />

      {/* Registration Wizard Form */}
      <RegisterForm />

      {/* Solid brand yellow line separating form from footer */}
      <div className="register-footer-accent" aria-hidden="true" />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Register;
