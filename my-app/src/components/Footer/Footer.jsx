import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './styles.css';

function Footer() {
  // Define los enlaces de las redes sociales
  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://www.facebook.com/tucuenta' },
    { icon: <FaTwitter />, url: 'https://www.twitter.com/tucuenta' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/tucuenta' },
  ];

  return (
    <footer className="footer">
      <div className="footer-logo">
        <p>Proyecto Final</p>
      </div>
      <div className="social-icons">
        {socialLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
