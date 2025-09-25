# Setup Instructions

## Prerequisites

Before running this application, make sure you have the following installed:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - This includes npm (Node Package Manager)

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Installation Steps

1. **Open Command Prompt or PowerShell as Administrator**

2. **Navigate to the project directory**
   ```cmd
   cd C:\Users\HP\ai-code-generator
   ```

3. **Install root dependencies**
   ```cmd
   npm install
   ```

4. **Install server dependencies**
   ```cmd
   cd server
   npm install
   cd ..
   ```

5. **Install client dependencies**
   ```cmd
   cd client
   npm install
   cd ..
   ```

6. **Set up environment variables**
   - Copy `server\env.example` to `server\.env`
   - Edit `server\.env` and add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-openai-api-key-here
     ```

## Running the Application

### Option 1: Run both frontend and backend together
```cmd
npm run dev
```

### Option 2: Run separately
```cmd
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Troubleshooting

### If npm is not recognized:
1. Restart your command prompt/PowerShell
2. Make sure Node.js is installed correctly
3. Try running: `node --version` and `npm --version`

### If port 3000 or 5000 is already in use:
1. Kill the process using the port
2. Or change the ports in the respective package.json files

### If you don't have an OpenAI API key:
- The application will work in demo mode with mock responses
- To get a real API key, visit: https://platform.openai.com/

## Building for Production

```cmd
npm run build
```

This will create a production build in the `client/build` directory.
