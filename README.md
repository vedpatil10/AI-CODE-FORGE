# AI Code Generator

A full-stack application that generates code using AI based on text prompts. Built with React frontend and Node.js backend.

## Features

- 🤖 **AI-Powered Code Generation**: Generate code in multiple programming languages using AI
- 🎨 **Modern UI**: Beautiful, responsive interface with smooth animations
- 📝 **Multiple Languages**: Support for JavaScript, Python, React, HTML, CSS, Java, C++, C#, PHP, Ruby, Go, and Rust
- 📋 **Copy to Clipboard**: Easy code copying functionality
- 💾 **Download Code**: Export generated code as files
- 📚 **Generation History**: Keep track of recent code generations
- 🎯 **Syntax Highlighting**: Beautiful code display with syntax highlighting
- ⚡ **Real-time Generation**: Fast and responsive code generation

## Tech Stack

### Frontend
- React 18
- Framer Motion (animations)
- React Syntax Highlighter
- Lucide React (icons)
- React Hot Toast (notifications)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- OpenAI API integration
- CORS enabled
- Helmet for security

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   - Copy `server/env.example` to `server/.env`
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-openai-api-key-here
     ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 3000).

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a description of the code you want to generate
3. Select the programming language
4. Click "Generate Code" or press Ctrl+Enter
5. View the generated code with syntax highlighting
6. Copy or download the code as needed

## API Endpoints

### POST `/api/generate-code`
Generates code based on a text prompt.

**Request Body:**
```json
{
  "prompt": "Create a function that sorts an array of numbers",
  "language": "javascript"
}
```

**Response:**
```json
{
  "code": "// Generated code here...",
  "language": "javascript",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET `/api/health`
Health check endpoint.

## Project Structure

```
ai-code-generator/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── CodeDisplay.js
│   │   │   ├── CodeGenerator.js
│   │   │   ├── Footer.js
│   │   │   └── Header.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   ├── package.json
│   └── env.example        # Environment variables template
├── package.json           # Root package.json
└── README.md
```

## Features in Detail

### Code Generation
- Supports 12+ programming languages
- Fallback mock responses when API key is not provided
- Error handling with user-friendly messages

### User Interface
- Responsive design that works on all devices
- Smooth animations and transitions
- Dark/light theme support
- Intuitive user experience

### Code Display
- Syntax highlighting for all supported languages
- Line numbers toggle
- Copy to clipboard functionality
- Download as file
- Expandable/collapsible view

### History Management
- Keep track of recent generations
- Quick reload from history
- Clear history functionality

## Development

### Running in Development Mode
```bash
# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client
```

### Building for Production
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the `server` directory:

```env
OPENAI_API_KEY=your-openai-api-key-here
PORT=5000
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Demo

The application includes a demo mode that works without an OpenAI API key, generating mock code responses for testing purposes.

## Support

For issues and questions, please create an issue in the repository.
