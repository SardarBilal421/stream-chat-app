# AI Chat Application

A modern real-time chat application built with React and Stream Chat, featuring an AI coach that provides intelligent responses. The application demonstrates clean architecture, real-time messaging, and seamless AI integration.

## Repository Structure

This repository contains two main branches:

- `frontend`: Contains the React application with Stream Chat integration
- `backend`: Contains the Node.js server for AI processing and authentication

## Demo

Check out the application demo:

[![AI Chat Application Demo]
https://www.loom.com/share/d8d350bf41164024a6ef0f3a6a40faf8

## Features

- 🚀 Real-time chat functionality using Stream Chat
- 🤖 AI coaching with intelligent responses
- 🎨 Modern UI with Tailwind CSS
- ⚡ Loading states and typing indicators
- 🛡️ Error handling and retry mechanisms
- 📱 Responsive design

## Tech Stack

### Frontend

- React with TypeScript
- Stream Chat React SDK
- Tailwind CSS
- React Hot Toast
- Vite

### Backend

- Node.js
- Express
- Stream Chat Server SDK
- JWT for authentication

## Getting Started

### Frontend Setup

1. Clone the repository and switch to frontend branch:

```bash
git clone <repository-url>
git checkout frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_ENDPOINT=http://localhost:5000
```

4. Start the development server:

```bash
npm run dev
```

### Backend Setup

1. Switch to backend branch:

```bash
git checkout backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
PORT=5000
AI_COACH_USER_ID=your_ai_coach_user_id
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the server:

```bash
npm start
```

## Project Structure

### Frontend Structure

```
src/
├── components/
│   ├── Chat/
│   │   ├── ChatWindow.tsx
│   │   └── states/
│   └── UI/
├── hooks/
├── services/
├── types/
└── screens/
```

### Backend Structure

```
src/
├── controllers/
├── config/
├── routes/
└── services/
```

## Environment Variables

### Frontend Variables

- `VITE_STREAM_API_KEY`: Your Stream Chat API key
- `VITE_API_ENDPOINT`: Backend API endpoint

### Backend Variables

- `STREAM_API_KEY`: Your Stream Chat API key
- `STREAM_API_SECRET`: Your Stream Chat API secret
- `PORT`: Server port (default: 5000)
