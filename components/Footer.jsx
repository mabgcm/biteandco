export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer id="footer" className="footer dark-background">
        <div className="container">
          <div className="row gy-3 justify-content-center">
            <div className="col-lg-4 col-md-6 text-center">
              <h4>Follow Us</h4>
              <p className="mb-3">Serving around Barrie and Simcoe only. Orders are limited and scheduled at least one day in advance.</p>
              <div className="social-links d-flex justify-content-center">
                <a href="https://www.facebook.com/profile.php?id=61575647294934" target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Bite & Co Facebook"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/biteandco.ca/" className="instagram" target="_blank" rel="noopener noreferrer" aria-label="Bite & Co Instagram"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>© {year} <strong className="px-1 sitename">Bite &amp; Co</strong>. All Rights Reserved</p>
        </div>
      </footer>

      <a href="sms:14372196444" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Text Bite & Co to order">
        <i className="bi bi-chat-dots whatsapp-icon"></i>
      </a>
      <a href="https://m.me/61575647294934" target="_blank" rel="noopener noreferrer" id="messenger-button" className="d-none scroll-top d-flex align-items-center justify-content-center" aria-label="Message Bite & Co on Messenger">
        <i className="bi bi-messenger"></i>
      </a>
    </>
  );
}
