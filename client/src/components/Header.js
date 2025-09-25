import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-content">
        <div className="logo">
          <Code className="logo-icon" />
          <h1>AI Code Generator</h1>
        </div>
        <div className="tagline">
          <Sparkles className="sparkle-icon" />
          <span>Transform ideas into code with AI</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
