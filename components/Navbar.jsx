import { useEffect, useState } from 'react';

export default function Navbar({ activeSection, onSectionChange, onShowAll }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const usesSectionMode = Boolean(onSectionChange);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileOpen);
    return () => document.body.classList.remove('mobile-nav-active');
  }, [mobileOpen]);

  const closeMobileNav = () => setMobileOpen(false);
  const handleNavClick = (event, section) => {
    closeMobileNav();
    if (usesSectionMode) {
      event.preventDefault();
      onSectionChange(section);
    }
  };

  const handleLogoClick = (event) => {
    closeMobileNav();
    if (onShowAll) {
      event.preventDefault();
      onShowAll();
    }
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a
          href="/"
          className="logo d-flex align-items-center me-auto me-xl-0"
          aria-label="Bite & Co Home"
          onClick={handleLogoClick}
        >
          <div className="sitename" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: '2rem', margin: 0, color: 'black' }}>
            Bite &amp; Co
          </div>
          <span style={{ color: 'black', fontSize: '2rem' }}>.</span>
        </a>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href={usesSectionMode ? '#hero' : '/#hero'} className={activeSection === 'home' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'home')}>Home</a></li>
            <li><a href={usesSectionMode ? '#shop' : '/#shop'} className={activeSection === 'menu' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'menu')}>Shop</a></li>
            <li><a href="/weekly-menu" className={activeSection === 'weekly-menu' ? 'active' : ''} onClick={closeMobileNav}>Weekly Menu</a></li>
            <li><a href={usesSectionMode ? '#reviews' : '/#reviews'} className={activeSection === 'testimonials' ? 'active' : ''} onClick={(event) => handleNavClick(event, 'testimonials')}>Reviews</a></li>
            <li><a href="/contact" className={activeSection === 'contact' ? 'active' : ''} onClick={closeMobileNav}>Contact</a></li>
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? 'bi-x' : 'bi-list'}`}
            aria-label="Toggle navigation"
            role="button"
            tabIndex="0"
            onClick={() => setMobileOpen(open => !open)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') setMobileOpen(open => !open);
            }}
          />
        </nav>
        <a className="btn btn-danger btn-sm" href="sms:14372196444">Order Now</a>
      </div>
    </header>
  );
}
