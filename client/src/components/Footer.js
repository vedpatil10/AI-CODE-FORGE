import React from 'react';
import { motion } from 'framer-motion';
import { Github, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="footer-content">
        <p className="footer-text">
          Made with <Heart className="heart-icon" /> using React & Node.js
        </p>
        <div className="footer-links">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Github className="link-icon" />
            GitHub
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
