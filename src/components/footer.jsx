import "./footer.css";


const Footer = () => {
  const navigateTo = (page) => (e) => {
    e.preventDefault();
    if (window.__navigate) {
      window.__navigate(page);
    }
  };

  return (
    <footer className="footer">
      {/* ── TOP SECTION ── */}
      <div className="footer-top">
        <div className="footer-container">

          {/* Brand column */}
          <div className="footer-brand">
            <picture>
              <source type="image/webp" srcSet="/logo-sm.webp 1x, /logo.webp 2x" />
              <img src="/logo.webp" alt="Monkey Tribe" className="footer-logo" width="200" height="266" />
            </picture>
            <p className="footer-tagline">
              The education &amp; training division of{" "}
              <a
                href="https://creativemonkeys.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-tagline--highlight"
              >
                Creative Monkeys Advertising Pvt. Ltd.
              </a>{" "}
              — empowering the next generation of AI-fluent professionals.
            </p>

            {/* Social icons */}
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/monkeytribeacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                {/* Facebook */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/monkeytribe.academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                {/* Instagram */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/117134265/admin/settings/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                {/* LinkedIn */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href="https://x.com/MonkeyTribeaca"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="X (formerly Twitter)"
              >
                {/* X / Twitter */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCnLf5bC9Od954r3kk4QtJAQ"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                {/* YouTube */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f1117" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate column */}
          <nav className="footer-col" aria-label="Navigate">
            <h4 className="footer-col-heading">NAVIGATE</h4>
            <ul className="footer-col-list">
              <li><a href="#" onClick={navigateTo('home')}>Home</a></li>
              <li><a href="#" onClick={navigateTo('courses')}>Courses</a></li>
              <li><a href="#" onClick={navigateTo('programmes')}>Programmes</a></li>
              <li><a href="#" onClick={navigateTo('webinars')}>Webinars</a></li>
              <li><a href="#" onClick={navigateTo('blog')}>Blog</a></li>
              <li><a href="#" onClick={navigateTo('about')}>About</a></li>
              <li><a href="#" onClick={navigateTo('contact')}>Contact</a></li>
            </ul>
          </nav>

          {/* Courses column */}
          <nav className="footer-col" aria-label="Courses">
            <h4 className="footer-col-heading">COURSES</h4>
            <ul className="footer-col-list">
              <li><a href="#" onClick={navigateTo('promptx')}>PromptX — AI Prompt Engineering</a></li>
              <li><a href="#" onClick={navigateTo('growthx')}>GrowthX — AI Digital Marketing</a></li>
              <li><a href="#" onClick={navigateTo('brandx')}>BrandX — Brand Builder Pro</a></li>
              <li><a href="#" onClick={navigateTo('copycraft')}>CopyCraft — CopyCraft Mastery</a></li>
            </ul>
          </nav>

          {/* Get in touch column */}
          <div className="footer-col footer-col--contact">
            <h4 className="footer-col-heading">GET IN TOUCH</h4>
            <ul className="footer-col-list">
              <li>
                <a href="mailto:hello@creativemonkeys.in">hello@creativemonkeys.in</a>
              </li>
              <li className="footer-division">
                A division of{" "}
                <a
                  href="https://creativemonkeys.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-cm-link"
                >
                  <strong>Creative Monkeys Advertising Pvt. Ltd.</strong>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Monkey Tribe. A division of Creative Monkeys Advertising Pvt. Ltd. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
