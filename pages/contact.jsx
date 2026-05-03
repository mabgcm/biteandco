import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import contact from '../data/contact.json';

const pageTitle = 'Contact Bite & Co | Homemade Meal Orders in Barrie & Simcoe';
const pageDescription = 'Contact Bite & Co to request homemade Turkish meals, desserts, bakery items, and halal dishes around Barrie and Simcoe.';

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: pageTitle,
  url: 'https://biteandco.ca/contact',
  description: pageDescription,
  mainEntity: {
    '@type': 'FoodEstablishment',
    name: 'Bite & Co',
    url: 'https://biteandco.ca/',
    telephone: '+14372196444',
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barrie',
      addressRegion: 'ON',
      addressCountry: 'CA'
    },
    areaServed: ['Barrie', 'Simcoe County']
  }
};

export default function ContactPage() {
  useEffect(() => {
    document.body.classList.add('index-page');
    return () => document.body.classList.remove('index-page');
  }, []);

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} path="/contact">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }} />
      </Seo>

      <Navbar activeSection="contact" />
      <main className="main">
        <section id="contact" className="menu section">
          <div className="container section-title">
            <h2>Contact</h2>
            <p><span>Contact</span> <span className="description-title">to Order</span></p>
          </div>
          <div className="container">
            <div className="tab-content">
              <div className="tab-pane fade active show">
                <div className="tab-header text-center">
                  <p>{contact.serviceArea}</p>
                  <h3>{contact.businessName}</h3>
                </div>
                <div className="row gy-5 justify-content-center">
                  <div className="col-lg-4 menu-item">
                    <i className="bi bi-chat-dots" style={{ fontSize: '48px', color: 'var(--accent-color)' }}></i>
                    <h4>Text to Order</h4>
                    <p className="ingredients">{contact.phone}</p>
                    <p>{contact.orderNotice}</p>
                    <p className="price">Text Message</p>
                    <a className="btn btn-danger btn-lg" href={contact.smsHref}>Text to Order</a>
                  </div>
                  <div className="col-lg-4 menu-item">
                    <i className="bi bi-messenger" style={{ fontSize: '48px', color: 'var(--accent-color)' }}></i>
                    <h4>Messenger</h4>
                    <p className="ingredients">Facebook Messenger</p>
                    <p>Send us your preferred meal, date, and serving size.</p>
                    <p className="price">Message Us</p>
                    <a className="btn btn-primary btn-lg" href={contact.messengerUrl} target="_blank" rel="noopener noreferrer">Message on Facebook</a>
                  </div>
                  <div className="col-lg-4 menu-item">
                    <i className="bi bi-info-circle" style={{ fontSize: '48px', color: 'var(--accent-color)' }}></i>
                    <h4>Details</h4>
                    <p className="ingredients">{contact.email}</p>
                    <p>{contact.hours}</p>
                    <p className="price">{contact.serviceArea}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={`${contact.businessName} Facebook`}><i className="bi bi-facebook"></i></a>
                      <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${contact.businessName} Instagram`}><i className="bi bi-instagram"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
