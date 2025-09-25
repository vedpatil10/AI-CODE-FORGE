import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import CodeGenerator from './components/CodeGenerator';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeGenerated = (code) => {
    setGeneratedCode(code);
  };

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  return (
    <div className="App">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Header />
      
      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container"
        >
          <CodeGenerator 
            onCodeGenerated={handleCodeGenerated}
            onLoadingChange={handleLoadingChange}
            generatedCode={generatedCode}
            isLoading={isLoading}
          />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
