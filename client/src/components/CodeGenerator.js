import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Download, RefreshCw, Code2, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CodeDisplay from './CodeDisplay';
import './CodeGenerator.css';

const CodeGenerator = ({ onCodeGenerated, onLoadingChange, generatedCode, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [history, setHistory] = useState([]);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' }
  ];

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    onLoadingChange(true);
    
    try {
      const response = await axios.post('/api/generate-code', {
        prompt: prompt.trim(),
        language: language
      });

      const newCode = {
        id: Date.now(),
        prompt: prompt.trim(),
        language: language,
        code: response.data.code,
        timestamp: new Date().toISOString()
      };

      onCodeGenerated(response.data.code);
      setHistory(prev => [newCode, ...prev.slice(0, 9)]); // Keep last 10 items
      toast.success('Code generated successfully!');
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Failed to generate code. Please try again.');
    } finally {
      onLoadingChange(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      generateCode();
    }
  };

  const clearHistory = () => {
    setHistory([]);
    onCodeGenerated('');
    toast.success('History cleared');
  };

  const loadFromHistory = (item) => {
    setPrompt(item.prompt);
    setLanguage(item.language);
    onCodeGenerated(item.code);
  };

  return (
    <div className="code-generator">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="generator-card"
      >
        <div className="card-header">
          <h2>Generate Code with AI</h2>
          <p>Describe what you want to build and let AI generate the code for you</p>
        </div>

        <div className="input-section">
          <div className="prompt-container">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the code you want to generate... (e.g., 'Create a function that sorts an array of numbers')"
              className="prompt-input"
              rows="4"
              disabled={isLoading}
            />
            <div className="input-footer">
              <span className="hint">Press Ctrl+Enter to generate</span>
              <div className="char-count">{prompt.length}/500</div>
            </div>
          </div>

          <div className="controls">
            <div className="language-selector">
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isLoading}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              onClick={generateCode}
              disabled={isLoading || !prompt.trim()}
              className="generate-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <RefreshCw className="btn-icon spinning" />
              ) : (
                <Send className="btn-icon" />
              )}
              {isLoading ? 'Generating...' : 'Generate Code'}
            </motion.button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3>Recent Generations</h3>
              <button onClick={clearHistory} className="clear-btn">
                Clear History
              </button>
            </div>
            <div className="history-list">
              {history.map(item => (
                <motion.div
                  key={item.id}
                  className="history-item"
                  onClick={() => loadFromHistory(item)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="history-content">
                    <div className="history-prompt">{item.prompt}</div>
                    <div className="history-meta">
                      <span className="history-language">{item.language}</span>
                      <span className="history-time">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {generatedCode && (
        <CodeDisplay 
          code={generatedCode} 
          language={language}
          prompt={prompt}
        />
      )}
    </div>
  );
};

export default CodeGenerator;
