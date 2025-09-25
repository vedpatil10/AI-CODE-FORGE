import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download, Eye, EyeOff, Code2, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './CodeDisplay.css';

const CodeDisplay = ({ code, language, prompt }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    const extension = getFileExtension(language);
    const filename = `generated-code-${Date.now()}.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Code downloaded!');
  };

  const getFileExtension = (lang) => {
    const extensions = {
      javascript: 'js',
      python: 'py',
      react: 'jsx',
      html: 'html',
      css: 'css',
      java: 'java',
      cpp: 'cpp',
      csharp: 'cs',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs'
    };
    return extensions[lang] || 'txt';
  };

  const getLanguageLabel = (lang) => {
    const labels = {
      javascript: 'JavaScript',
      python: 'Python',
      react: 'React JSX',
      html: 'HTML',
      css: 'CSS',
      java: 'Java',
      cpp: 'C++',
      csharp: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      go: 'Go',
      rust: 'Rust'
    };
    return labels[lang] || lang;
  };

  if (!code) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="code-display"
    >
      <div className="code-header">
        <div className="code-title">
          <Code2 className="title-icon" />
          <h3>Generated Code</h3>
          <span className="language-badge">{getLanguageLabel(language)}</span>
        </div>
        
        <div className="code-actions">
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="action-btn"
            title="Toggle line numbers"
          >
            {showLineNumbers ? <EyeOff className="btn-icon" /> : <Eye className="btn-icon" />}
          </button>
          
          <button
            onClick={copyToClipboard}
            className="action-btn"
            title="Copy code"
          >
            <Copy className="btn-icon" />
          </button>
          
          <button
            onClick={downloadCode}
            className="action-btn"
            title="Download code"
          >
            <Download className="btn-icon" />
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="action-btn expand-btn"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <EyeOff className="btn-icon" /> : <Eye className="btn-icon" />}
          </button>
        </div>
      </div>

      {prompt && (
        <div className="prompt-info">
          <FileText className="prompt-icon" />
          <span className="prompt-text">
            <strong>Prompt:</strong> {prompt}
          </span>
        </div>
      )}

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="code-container"
      >
        <div className="code-wrapper">
          <SyntaxHighlighter
            language={language === 'react' ? 'jsx' : language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              borderRadius: '0 0 12px 12px',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}
            codeTagProps={{
              style: {
                fontFamily: 'Fira Code, Consolas, Monaco, monospace'
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeDisplay;
