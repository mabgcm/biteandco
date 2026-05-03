import { useCallback, useEffect, useState } from 'react';
import About from '../components/About';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import Testimonials from '../components/Testimonials';
import WeeklyMenuCTA from '../components/WeeklyMenuCTA';
import menuItems from '../data/menu.json';

const pageTitle = 'Bite & Co | Homemade Turkish Meals in Barrie & Simcoe';
const pageDescription = 'Bite & Co offers limited homemade Turkish meals, desserts, bakery items, and halal dishes around Barrie and Simcoe. Contact us at least one day ahead to schedule.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'Bite & Co',
  url: 'https://biteandco.ca/',
  image: 'https://biteandco.ca/assets/img/menu/tiramisu.png',
  description: 'Limited homemade Turkish meals, desserts, bakery items, and halal dishes around Barrie and Simcoe, made fresh by request with at least one day advance notice.',
  telephone: '+14372196444',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barrie',
    addressRegion: 'ON',
    addressCountry: 'CA'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Barrie'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Simcoe County'
    }
  ],
  servesCuisine: ['Turkish', 'Homemade', 'Halal', 'Dessert', 'Bakery'],
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61575647294934',
    'https://www.instagram.com/biteandco.ca/'
  ],
  hasMenu: {
    '@type': 'Menu',
    url: 'https://biteandco.ca/#menu',
    hasMenuSection: ['main', 'desserts', 'bakery', 'snacks'].map(category => ({
      '@type': 'MenuSection',
      name: {
        main: 'Main Dishes',
        desserts: 'Desserts',
        bakery: 'Bakery',
        snacks: 'Snacks'
      }[category],
      hasMenuItem: menuItems
        .filter(item => item.category === category)
        .map(item => ({
          '@type': 'MenuItem',
          name: item.name
        }))
    }))
  },
  potentialAction: {
    '@type': 'ContactAction',
    target: 'sms:+14372196444'
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    document.body.classList.add('index-page');
    return () => document.body.classList.remove('index-page');
  }, []);

  const showSection = useCallback((section) => {
    setActiveSection(section);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }, []);

  const showAllSections = useCallback(() => {
    setActiveSection(null);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }, []);

  const renderMainContent = () => {
    if (activeSection === 'home') return <Hero />;
    if (activeSection === 'about') return <About />;
    if (activeSection === 'menu') {
      return (
        <>
          <Menu />
        </>
      );
    }
    if (activeSection === 'testimonials') return <Testimonials />;

    return (
      <>
        <Hero />
        <About />
        <Menu />
        <WeeklyMenuCTA />
        <Testimonials />
      </>
    );
  };

  return (
    <>
      <Seo title={pageTitle} description={pageDescription}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Seo>

      <Navbar activeSection={activeSection} onSectionChange={showSection} onShowAll={showAllSections} />
      <main className="main">
        {renderMainContent()}
      </main>
      <Footer />
    </>
  );
}
