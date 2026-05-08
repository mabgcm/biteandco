import { useEffect } from 'react';
import Footer from '../components/Footer';
import MenuShop from '../components/MenuShop';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import contact from '../data/contact.json';
import menuItems from '../data/menu.json';

const pageTitle = 'Menu | Bite & Co Homemade Meals in Barrie & Simcoe';
const pageDescription = 'Search and order Bite & Co homemade main dishes, sides, salads, mezze, desserts, bakery items, and snacks around Barrie and Simcoe.';

const menuStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Bite & Co Menu',
  url: 'https://biteandco.ca/menu',
  hasMenuItem: menuItems.map(item => ({
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    image: `https://biteandco.ca${item.image}`,
    menuAddOn: item.ingredients?.join(', '),
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url: 'https://biteandco.ca/menu'
    }
  })),
  provider: {
    '@type': 'FoodEstablishment',
    name: 'Bite & Co',
    telephone: contact.phone,
    areaServed: ['Barrie', 'Simcoe County']
  }
};

export default function MenuPage() {
  useEffect(() => {
    document.body.classList.add('index-page');
    return () => document.body.classList.remove('index-page');
  }, []);

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} path="/menu">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData) }} />
      </Seo>

      <Navbar activeSection="menu" />
      <main className="main">
        <MenuShop />
      </main>
      <Footer />
    </>
  );
}
