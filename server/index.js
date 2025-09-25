const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Generate code using OpenAI API
app.post('/api/generate-code', async (req, res) => {
  try {
    const { prompt, language = 'javascript' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // If no API key is provided, return a mock response for demo purposes
    if (!process.env.OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
      const mockCode = generateMockCode(prompt, language);
      return res.json({
        code: mockCode,
        language: language,
        timestamp: new Date().toISOString()
      });
    }

    const response = await axios.post(OPENAI_API_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful coding assistant. Generate clean, well-commented code based on the user's prompt. Use ${language} programming language. Only return the code without any explanations or markdown formatting.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedCode = response.data.choices[0].message.content;

    res.json({
      code: generatedCode,
      language: language,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating code:', error);
    
    // Fallback to mock response if API fails
    const mockCode = generateMockCode(req.body.prompt, req.body.language || 'javascript');
    res.json({
      code: mockCode,
      language: req.body.language || 'javascript',
      timestamp: new Date().toISOString(),
      note: 'Generated using fallback mock response'
    });
  }
});

// Generate mock code for demo purposes
function generateMockCode(prompt, language) {
  const mockCodes = {
    javascript: `// ${prompt}
function example() {
    console.log("Hello, World!");
    return "Generated code based on: ${prompt}";
}

// Usage
const result = example();
console.log(result);`,
    
    python: `# ${prompt}
def example():
    print("Hello, World!")
    return f"Generated code based on: {prompt}"

# Usage
if __name__ == "__main__":
    result = example()
    print(result)`,
    
    react: `// ${prompt}
import React, { useState } from 'react';

const ExampleComponent = () => {
    const [message, setMessage] = useState('Hello, World!');
    
    return (
        <div>
            <h1>{message}</h1>
            <p>Generated code based on: ${prompt}</p>
        </div>
    );
};

export default ExampleComponent;`,
    
    html: `<!-- ${prompt} -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Code</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Generated code based on: ${prompt}</p>
</body>
</html>`
  };

  return mockCodes[language] || mockCodes.javascript;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
