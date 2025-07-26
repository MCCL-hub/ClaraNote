# ClaraNote - Audio Transcription and Meeting Report Generator

## Overview

ClaraNote is a modern full-stack web application that allows users to upload audio files, transcribe them using AI, generate summaries, and export professional PDF reports. The application features a complete React frontend with French language support, Express.js backend with integrated AI services, and uses Drizzle ORM for database operations with PostgreSQL. The MVP is fully functional with mock AI services that can be easily replaced with production services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom theming

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **File Upload**: Multer middleware for handling audio file uploads (MP3, WAV, M4A, max 100MB)
- **Storage**: In-memory storage implementation (MemStorage) with interface for future database integration
- **AI Services**: Integrated mock transcription and summarization services (ready for production AI integration)
- **PDF Generation**: Text-based PDF export with structured summary formatting
- **Static Files**: Serves exported PDFs and uploaded audio files
- **API**: RESTful API design with JSON responses

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Single `audio_files` table tracking the complete workflow:
  - File metadata (filename, size, path)
  - Processing status (uploaded, transcribing, transcribed, summarized, exported)
  - Content (transcription, summary, PDF path)
  - Timestamps (created_at, updated_at)

## Key Components

### File Processing Workflow
The application implements a 4-step process:
1. **Upload**: Audio file upload with validation (MP3, WAV, M4A, max 100MB)
2. **Transcription**: AI-powered speech-to-text conversion
3. **Summary**: AI-generated meeting summary with structured data
4. **Export**: PDF generation and download

### Storage Strategy
- **Current**: In-memory storage for development/testing
- **Production Ready**: Drizzle ORM configured for PostgreSQL with Neon Database
- **File Storage**: Local filesystem for uploaded audio files and generated PDFs

### UI/UX Design
- **Progressive Workflow**: Step-by-step interface with visual progress indicators
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui for consistent, accessible components
- **French Localization**: UI text and content in French

## Data Flow

1. **File Upload**:
   - Client uploads audio file via drag-and-drop or file picker
   - Server validates file type and size
   - File stored locally, metadata saved to database
   - Client receives file ID and metadata

2. **Transcription Process**:
   - Client initiates transcription request with file ID
   - Server processes audio file (mock implementation for now)
   - Transcription text stored in database
   - Client receives transcription via polling or real-time updates

3. **Summary Generation**:
   - Server analyzes transcription text
   - Generates structured summary with participants, decisions, actions
   - Summary data stored in database

4. **PDF Export**:
   - Server generates PDF report from summary data
   - PDF file stored locally
   - Download link provided to client

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Framework**: shadcn/ui, Radix UI primitives
- **Styling**: Tailwind CSS, class-variance-authority
- **Forms**: React Hook Form with Zod validation
- **Utilities**: date-fns, clsx, lucide-react icons

### Backend Dependencies
- **Core**: Express.js, TypeScript, tsx for development
- **Database**: Drizzle ORM, @neondatabase/serverless
- **File Handling**: Multer for uploads
- **Session Management**: express-session with connect-pg-simple
- **Validation**: Zod schemas

### Development Tools
- **Build**: Vite, esbuild for production
- **TypeScript**: Strict configuration with path mapping
- **Database**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite dev server with HMR for frontend
- **Backend**: tsx with nodemon-like behavior for hot reloading
- **Database**: Local PostgreSQL or Neon Database connection
- **File Storage**: Local filesystem in `uploads/` directory

### Production Build
- **Frontend**: Vite builds to `dist/public` for static serving
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL via Neon Database with connection pooling
- **File Storage**: Local filesystem or cloud storage integration
- **Process Management**: Single Node.js process serving both API and static files

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment detection
- **File paths**: Configurable upload and export directories

The application is designed to be easily deployable to platforms like Replit, Vercel, or traditional VPS hosting with minimal configuration changes.

## Recent Changes (January 2025)

### MVP Implementation Complete
- ✅ **Full Web Interface**: Complete React frontend with French language support
- ✅ **File Upload System**: Drag-and-drop interface supporting MP3, WAV, M4A files up to 100MB
- ✅ **Progressive Workflow**: 4-step process (Upload → Transcription → Summary → Export)
- ✅ **Mock AI Services**: Integrated transcription and summarization services with realistic French content
- ✅ **PDF Export**: Text-based PDF generation with structured meeting summaries
- ✅ **File Management**: File history, download links, and status tracking
- ✅ **Responsive Design**: Mobile-first UI with Tailwind CSS and shadcn/ui components

### Python Backend Integration
- 📁 **FastAPI Backend**: Created complete Python backend structure with FastAPI
- 🔧 **Service Architecture**: Modular design with separate routers for upload, transcription, summary, and export
- 🤖 **AI Services**: Mock implementations ready for Whisper and NLP integration
- 🔄 **Integration**: Node.js backend now includes integrated AI services for seamless operation

### Technical Improvements
- **API Endpoints**: Complete CRUD operations for audio files with RESTful design
- **Error Handling**: Comprehensive error handling with user-friendly French messages
- **Static File Serving**: PDF downloads and file management
- **Form Validation**: Client-side validation with Zod schemas
- **Loading States**: Progress indicators and status updates throughout workflow