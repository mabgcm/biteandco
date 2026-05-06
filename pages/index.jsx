import { useEffect, useMemo, useState } from 'react';
import Bakery from '../components/home/Bakery';
import Desserts from '../components/home/Desserts';
import FinalCTA from '../components/home/FinalCTA';
import HomeHero from '../components/home/HomeHero';
import MainDishes from '../components/home/MainDishes';
import ProductOrderModal from '../components/home/ProductOrderModal';
import SocialProof from '../components/home/SocialProof';
import ValueStrip from '../components/home/ValueStrip';
import WeeklyMeals from '../components/home/WeeklyMeals';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import contact from '../data/contact.json';
import homepage from '../data/homepage.json';
import menuItems from '../data/menu.json';
import weeklyMenu from '../data/weeklyMenu.json';

const pageTitle = 'Bite & Co | Fresh Homemade Meals in Barrie & Simcoe';
const pageDescription = 'Shop fresh homemade meals from Bite & Co. Cooked fresh, never frozen, and available by scheduled order around Barrie and Simcoe.';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'Bite & Co',
  url: 'https://biteandco.ca/',
  image: 'https://biteandco.ca/assets/img/menu/ovenchicken.png',
  description: pageDescription,
  telephone: contact.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barrie',
    addressRegion: 'ON',
    addressCountry: 'CA'
  },
  areaServed: ['Barrie', 'Simcoe County'],
  servesCuisine: ['Homemade', 'Turkish', 'Halal'],
  priceRange: '$$',
  hasMenu: {
    '@type': 'Menu',
    url: 'https://biteandco.ca/menu',
    hasMenuItem: menuItems.map(item => ({
      '@type': 'MenuItem',
      name: item.name,
      image: `https://biteandco.ca${item.image}`,
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'CAD'
      }
    }))
  },
  potentialAction: {
    '@type': 'OrderAction',
    target: contact.smsHref
  }
};

function byIds(items, ids) {
  return ids
    .map(id => items.find(item => item.id === id))
    .filter(Boolean);
}

const weeklyDayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    document.body.classList.add('index-page');
    return () => document.body.classList.remove('index-page');
  }, []);

  const mainDishProducts = useMemo(() => menuItems.filter(item => item.category === 'main'), []);
  const dessertProducts = useMemo(() => menuItems.filter(item => item.category === 'desserts'), []);
  const bakeryProducts = useMemo(() => menuItems.filter(item => item.category === 'bakery'), []);
  const weeklyMeals = useMemo(() => {
    return weeklyMenu
      .filter(item => item.day)
      .sort((first, second) => weeklyDayOrder.indexOf(first.day) - weeklyDayOrder.indexOf(second.day))
      .slice(0, 7);
  }, []);
  const heroImages = useMemo(() => {
    const uniqueImages = new Map();

    menuItems.forEach(item => {
      if (!item.image || uniqueImages.has(item.image)) return;
      uniqueImages.set(item.image, {
        src: item.image,
        alt: item.alt || item.name
      });
    });

    return Array.from(uniqueImages.values());
  }, []);

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} image="https://biteandco.ca/assets/img/menu/ovenchicken.png">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Seo>

      <Navbar />
      <main className="main shop-home">
        <HomeHero hero={homepage.hero} orderHref={contact.smsHref} images={heroImages} />
        <MainDishes products={mainDishProducts} onOrder={setSelectedProduct} />
        <Desserts products={dessertProducts} onOrder={setSelectedProduct} />
        <Bakery products={bakeryProducts} onOrder={setSelectedProduct} />
        <ValueStrip items={homepage.valueStrip} />
        <WeeklyMeals meals={weeklyMeals} />
        <SocialProof />
        <FinalCTA content={homepage.finalCta} orderHref={contact.smsHref} />
      </main>
      <ProductOrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </>
  );
}
