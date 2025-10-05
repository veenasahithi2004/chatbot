# AI Learning Chatbot with Interactive Avatar

## Overview

This is an AI-powered educational chatbot application featuring a live animated avatar with interactive states (idle, listening, thinking, speaking). The platform allows users to upload knowledge base files and engage in conversational learning experiences. Built with a modern React frontend using shadcn/ui components and an Express backend with planned PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens

**Design System**
- Custom color palette supporting light/dark modes with purple-blue primary colors inspired by educational platforms
- Typography: Inter font family for UI, JetBrains Mono for technical content
- Responsive design with mobile-first breakpoints
- Consistent elevation patterns using opacity-based overlays

**Component Architecture**
- `AvatarDisplay`: Manages animated avatar states with visual feedback
- `ChatInterface`: Scrollable message container with auto-scroll behavior
- `ChatMessage`: Individual message bubbles with role-based styling
- `MessageInput`: Text input with voice recognition support via Web Speech API
- `KnowledgeBaseManager`: File upload interface with drag-and-drop support
- `ThemeToggle`: Light/dark mode switcher with localStorage persistence

**Key Frontend Features**
- Web Speech API integration for voice input
- Real-time avatar state transitions (idle → listening → thinking → speaking)
- File upload with drag-and-drop for knowledge base management
- Responsive design optimized for desktop and mobile
- Custom toast notifications for user feedback

### Backend Architecture

**Technology Stack**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for HTTP server
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: Neon serverless PostgreSQL (via @neondatabase/serverless)
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions

**Server Structure**
- `server/index.ts`: Main Express application with middleware setup and error handling
- `server/routes.ts`: Route registration module (currently minimal, ready for API endpoints)
- `server/storage.ts`: Storage abstraction layer with in-memory implementation as fallback
- `server/vite.ts`: Vite middleware integration for development mode

**Database Schema**
- `users` table with UUID primary keys, username/password authentication fields
- Schema defined using Drizzle ORM with Zod validation integration
- Migration system configured via drizzle-kit

**API Design Philosophy**
- RESTful endpoints prefixed with `/api`
- JSON request/response format
- Request/response logging with duration tracking
- Credential-based authentication (cookies)

### External Dependencies

**Core UI Libraries**
- **Radix UI**: Comprehensive set of accessible component primitives (accordion, dialog, dropdown, popover, scroll-area, select, slider, tabs, toast, tooltip, etc.)
- **class-variance-authority**: Type-safe component variant management
- **cmdk**: Command palette component for keyboard-driven interfaces
- **embla-carousel-react**: Carousel/slider functionality

**Data & State Management**
- **TanStack React Query v5**: Server state synchronization with configurable caching
- **React Hook Form**: Form state management with @hookform/resolvers for validation
- **Zod**: Schema validation integrated with Drizzle ORM via drizzle-zod

**Database & Backend**
- **Neon Serverless PostgreSQL**: Managed PostgreSQL database service
- **Drizzle ORM**: Type-safe database queries and migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

**Development Tools**
- **Vite**: Development server with HMR and production bundler
- **esbuild**: Server-side code bundling for production
- **TypeScript**: Full-stack type safety
- **Replit Plugins**: Development tooling for Replit environment (@replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner)

**Font & Typography**
- **Google Fonts**: Inter (UI text) and JetBrains Mono (code/technical) loaded via CDN

**Date Handling**
- **date-fns**: Date formatting and manipulation utility library

**Build Configuration**
- Path aliases configured: `@/` (client), `@shared/` (shared), `@assets/` (assets)
- ESM module format throughout the project
- Strict TypeScript configuration with incremental builds