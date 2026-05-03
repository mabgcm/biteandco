import { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import WeeklyMealPlan from '../components/WeeklyMealPlan';

const pageTitle = 'Weekly Menu Orders | Bite & Co Barrie & Simcoe';
const pageDescription = 'Order Bite & Co next week homemade meals by day for one or more people around Barrie and Simcoe.';

export default function WeeklyMenuPage() {
  useEffect(() => {
    document.body.classList.add('index-page');
    return () => document.body.classList.remove('index-page');
  }, []);

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} path="/weekly-menu" />

      <Navbar activeSection="weekly-menu" />
      <main className="main">
        <WeeklyMealPlan />
      </main>
      <Footer />
    </>
  );
}
