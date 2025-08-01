# Sapphire Notes 💎

Just me messing around with some new tools! Built a simple note-taking app to test out tRPC, Prisma, and push notifications. Nothing fancy, just experimenting.

## 🧪 What I'm Testing/Learning

This project serves as a hands-on exploration of several modern web technologies:

- **tRPC**: End-to-end type-safe APIs without code generation
- **Prisma ORM**: Type-safe database access and schema management
- **Web Push Notifications**: Browser push notifications with VAPID keys

## ✨ Features Implemented

- **Topic-Based Organization**: Organize notes into customizable topics for better structure
- **Markdown Support**: Rich text editing with live markdown preview using CodeMirror
- **User Authentication**: Secure authentication powered by Auth0 and NextAuth.js
- **Push Notifications**: Real-time browser notifications to test Web Push API
- **Responsive Design**: Modern UI built with Tailwind CSS and DaisyUI
- **Type-Safe API**: End-to-end type safety with tRPC
- **Database Integration**: Data persistence with Prisma and PostgreSQL

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, tRPC, Express.js (for notifications)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0, NextAuth.js
- **Styling**: Tailwind CSS, DaisyUI
- **Editor**: CodeMirror with markdown support
- **Notifications**: Web Push API with VAPID

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- PostgreSQL database
- Auth0 account for authentication

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd sapphire-notes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sapphire_notes"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Auth0 Configuration
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"
AUTH0_ISSUER_BASE_URL="https://your-domain.auth0.com"

# Push Notifications (Optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-vapid-public-key"
PRIVATE_KEY="your-vapid-private-key"
VAPID_SUBJECT="mailto:your-email@example.com"

# Environment
NODE_ENV="development"
```

### 4. Database Setup

```bash
# Push the schema to your database
npm run db:push

# Optional: Open Prisma Studio to view your data
npm run db:studio
```

### 5. Start the Development Servers

#### Terminal 1: Next.js Application
```bash
npm run dev
```

#### Terminal 2: Push Notification Service (Optional)
```bash
node server.js
```

The application will be available at:
- **Main App**: http://localhost:3000
- **Push Service**: http://localhost:4000

## 📝 Usage

1. **Sign In**: Use the authentication system to create an account or sign in
2. **Create Topics**: Start by creating topics to organize your notes
3. **Add Notes**: Write notes with markdown support in the editor
4. **Enable Notifications**: Click "Allow notifications!" to receive push notifications
5. **Organize**: Switch between topics to view and manage different sets of notes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio

## 📁 Project Structure

```
sapphire-notes/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── _components/    # React components
│   │   ├── api/           # API routes
│   │   └── layout.tsx     # Root layout
│   ├── server/            # tRPC server setup
│   ├── styles/            # Global styles
│   └── trpc/              # tRPC client setup
├── server.js              # Express server for push notifications
└── ...config files
```

## 🌟 Key Components

- **NoteEditor**: Markdown editor with CodeMirror
- **NoteCard**: Display and manage individual notes
- **Content**: Main application interface with topic sidebar
- **Header**: Navigation and user interface

## 🔒 Authentication Setup

This project uses Auth0 for authentication. To set it up:

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new application
3. Configure the callback URLs:
   - Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
   - Allowed Logout URLs: `http://localhost:3000`
4. Copy your domain, client ID, and client secret to your `.env` file

## 🔔 Push Notifications Setup (Optional)

To enable push notifications:

1. Generate VAPID keys using a service like [vapidkeys.com](https://vapidkeys.com)
2. Add the keys to your `.env` file
3. Start the notification server with `node server.js`

## 🚀 Deployment

The application is configured for deployment on Vercel. Make sure to:

1. Set all environment variables in your deployment platform
2. Configure your database for production
3. Update CORS settings in `server.js` for production URLs

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the application!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
