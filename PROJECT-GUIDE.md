# 🚀 Complete Project Guide: API Key Management App with AI

> A comprehensive guide to building an API Key Management system with AI-powered GitHub Summarizer.
> Created by Sanjeev Babbar | January 2026

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Setup](#project-setup)
4. [Database Setup (Supabase)](#database-setup-supabase)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [LangChain & OpenAI Integration](#langchain--openai-integration)
8. [Google SSO Authentication](#google-sso-authentication)
9. [Route Protection (Middleware)](#route-protection-middleware)
10. [Testing with Hoppscotch](#testing-with-hoppscotch)
11. [GitHub Setup](#github-setup)
12. [Vercel Deployment](#vercel-deployment)
13. [Complete Flow Diagram](#complete-flow-diagram)
14. [File Structure](#file-structure)
15. [Quick Reference Commands](#quick-reference-commands)

---

## 📌 Project Overview

### What We Built:
- **API Key Management Dashboard** - Create, Read, Update, Delete API keys
- **API Key Validation** - Validate keys with usage tracking
- **GitHub Summarizer** - AI-powered repository summarization using LangChain + OpenAI

### Live URLs:
- **Production:** https://sanjeev-api-key-app.vercel.app
- **Dashboard:** https://sanjeev-api-key-app.vercel.app/dashboards
- **GitHub Repo:** https://github.com/babbarsanjeev/sanjeev-api-key-app

---

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 16.1.1 |
| **React** | UI Library | 19.2.3 |
| **Tailwind CSS** | Styling | 4.x |
| **Supabase** | Database (PostgreSQL) | 2.47.10 |
| **LangChain** | AI Framework | 1.2.4 |
| **OpenAI** | AI Model (GPT-4o) | via LangChain |
| **NextAuth.js** | Authentication (Google SSO) | 4.24.13 |
| **Zod** | Schema Validation | 4.3.5 |
| **Yarn** | Package Manager | 1.22.22 |
| **Vercel** | Hosting | - |

---

## 🏗 Project Setup

### Step 1: Create Next.js Project
```bash
npx create-next-app@latest my-app
cd my-app
```

### Step 2: Install Dependencies
```bash
# Switch to Yarn (optional but recommended)
npm install -g yarn
yarn install

# Install required packages
yarn add @supabase/supabase-js
yarn add langchain @langchain/core @langchain/community @langchain/openai
yarn add zod
```

### Step 3: Project Structure
```
my-app/
├── app/
│   ├── api/
│   │   ├── keys/
│   │   │   ├── route.js           # GET all, POST create
│   │   │   └── [id]/
│   │   │       └── route.js       # GET one, PUT, DELETE
│   │   ├── validate/
│   │   │   └── route.js           # POST validate key
│   │   └── github-summarizer/
│   │       └── route.js           # POST summarize repo
│   ├── dashboards/
│   │   └── page.js                # Dashboard UI
│   ├── components/
│   │   ├── Sidebar.js
│   │   └── Notification.js
│   ├── layout.js
│   └── page.js
├── lib/
│   ├── supabaseClient.js          # Supabase client
│   └── chain.js                   # LangChain logic
├── .env.local                     # Environment variables
├── package.json
└── yarn.lock
```

---

## 🗄 Database Setup (Supabase)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your **Project URL** and **Anon Key**

### Step 2: Create Database Table
Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  key VARCHAR(255) UNIQUE NOT NULL,
  usage INTEGER DEFAULT 0,
  limit_value INTEGER DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for development)
CREATE POLICY "Allow all operations" ON api_keys
  FOR ALL USING (true) WITH CHECK (true);
```

### Step 3: Create Supabase Client
File: `lib/supabaseClient.js`

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
```

---

## 🔐 Environment Variables

### File: `.env.local` (Local Development)

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI
OPENAI_API_KEY=sk-proj-your-openai-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here
```

### Vercel Environment Variables

| Variable | Local Value | Production Value |
|----------|-------------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Same | Same |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same | Same |
| `OPENAI_API_KEY` | Same | Same |
| `GOOGLE_CLIENT_ID` | Same | Same |
| `GOOGLE_CLIENT_SECRET` | Same | Same |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Same | Same |

### Getting API Keys:

| Service | URL | Cost |
|---------|-----|------|
| **Supabase** | [supabase.com](https://supabase.com) | Free tier available |
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Pay per use (~$0.01/request) |

---

## 🔗 API Endpoints

### Complete URL Reference Table

#### Local Development (localhost)

| # | Method | URL | Headers | Body |
|---|--------|-----|---------|------|
| 1 | `GET` | `http://localhost:3000/api/keys` | - | - |
| 2 | `POST` | `http://localhost:3000/api/keys` | `Content-Type: application/json` | `{"name": "Key Name", "limit": 1000}` |
| 3 | `PUT` | `http://localhost:3000/api/keys/{id}` | `Content-Type: application/json` | `{"name": "New Name"}` |
| 4 | `DELETE` | `http://localhost:3000/api/keys/{id}` | - | - |
| 5 | `POST` | `http://localhost:3000/api/validate` | `Content-Type: application/json` | `{"key": "dandi-xxx..."}` |
| 6 | `POST` | `http://localhost:3000/api/github-summarizer` | `Content-Type: application/json` + `x-api-key: dandi-xxx...` | `{"repo_url": "https://github.com/owner/repo"}` |

#### Production (Vercel)

| # | Method | URL | Headers | Body |
|---|--------|-----|---------|------|
| 1 | `GET` | `https://sanjeev-api-key-app.vercel.app/api/keys` | - | - |
| 2 | `POST` | `https://sanjeev-api-key-app.vercel.app/api/keys` | `Content-Type: application/json` | `{"name": "Key Name", "limit": 1000}` |
| 3 | `PUT` | `https://sanjeev-api-key-app.vercel.app/api/keys/{id}` | `Content-Type: application/json` | `{"name": "New Name"}` |
| 4 | `DELETE` | `https://sanjeev-api-key-app.vercel.app/api/keys/{id}` | - | - |
| 5 | `POST` | `https://sanjeev-api-key-app.vercel.app/api/validate` | `Content-Type: application/json` | `{"key": "dandi-xxx..."}` |
| 6 | `POST` | `https://sanjeev-api-key-app.vercel.app/api/github-summarizer` | `Content-Type: application/json` + `x-api-key: dandi-xxx...` | `{"repo_url": "https://github.com/owner/repo"}` |

#### Quick Copy URLs

**Local:**
```
http://localhost:3000/api/keys
http://localhost:3000/api/keys/{id}
http://localhost:3000/api/validate
http://localhost:3000/api/github-summarizer
```

**Production:**
```
https://sanjeev-api-key-app.vercel.app/api/keys
https://sanjeev-api-key-app.vercel.app/api/keys/{id}
https://sanjeev-api-key-app.vercel.app/api/validate
https://sanjeev-api-key-app.vercel.app/api/github-summarizer
```

#### Your API Key
```
dandi-yh1YtDZboF8U2gqaHtZP8uiL
```

#### Web Pages (Browser)

| Page | Local URL | Production URL |
|------|-----------|----------------|
| **Home** | `http://localhost:3000` | `https://sanjeev-api-key-app.vercel.app` |
| **Dashboard** | `http://localhost:3000/dashboards` | `https://sanjeev-api-key-app.vercel.app/dashboards` |
| **Playground** | `http://localhost:3000/playground` | `https://sanjeev-api-key-app.vercel.app/playground` |

---

### Endpoint Details

### 1. GET All API Keys
```
GET /api/keys
```
**Response:**
```json
[
  {
    "id": "uuid",
    "name": "My Key",
    "key": "dandi-xxxxxxxxxxxx",
    "usage": 5,
    "limit_value": 1000
  }
]
```

### 2. POST Create API Key
```
POST /api/keys
Content-Type: application/json

{"name": "My New Key", "limit": 1000}
```

### 3. PUT Update API Key
```
PUT /api/keys/{id}
Content-Type: application/json

{"name": "Updated Name"}
```

### 4. DELETE API Key
```
DELETE /api/keys/{id}
```

### 5. POST Validate API Key
```
POST /api/validate
Content-Type: application/json

{"key": "dandi-xxxxxxxxxxxx"}
```
**Response:**
```json
{
  "valid": true,
  "message": "valid api key",
  "keyName": "My Key"
}
```

### 6. POST GitHub Summarizer (Protected)
```
POST /api/github-summarizer
Content-Type: application/json
x-api-key: dandi-xxxxxxxxxxxx

{"repo_url": "https://github.com/owner/repo"}
```
**Response:**
```json
{
  "valid": true,
  "repository": "owner/repo",
  "summary": {
    "description": "...",
    "stars": 24000,
    "language": "Python"
  },
  "ai_summary": "This repository is...",
  "cool_facts": ["Fact 1", "Fact 2"]
}
```

---

## 🤖 LangChain & OpenAI Integration

### File: `lib/chain.js`

```javascript
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Define output schema
const summarySchema = z.object({
  summary: z.string().describe("Brief summary of the repository"),
  cool_facts: z.array(z.string()).max(5).describe("Interesting facts")
});

export async function summarizeGithubReadme(readmeContent) {
  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  // Use withStructuredOutput for type-safe responses
  const structuredLlm = llm.withStructuredOutput(summarySchema);

  const prompt = `Summarize this README and list cool facts:\n${readmeContent}`;
  
  const result = await structuredLlm.invoke(prompt);
  
  return result;
}
```

### Key Concepts:
- **withStructuredOutput** - Returns typed JSON instead of raw text
- **Zod Schema** - Validates the AI response structure
- **Temperature 0.2** - Lower = more consistent/factual responses

---

## 🔐 Google SSO Authentication

### Overview
We use **NextAuth.js** with Google Provider for authentication. Users can sign in with their Google account, and their details are stored in Supabase.

### Step 1: Install NextAuth
```bash
yarn add next-auth
```

### Step 2: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Click **Create Credentials** → **OAuth client ID**
4. Application type: **Web application**
5. Add **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://your-app.vercel.app`
6. Add **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-app.vercel.app/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**

### Step 3: Create NextAuth API Route
File: `app/api/auth/[...nextauth]/route.js`

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Save user to Supabase on first login
      if (account?.provider === "google") {
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("google_id", profile.sub)
          .single();

        if (!existingUser) {
          await supabase.from("users").insert({
            google_id: profile.sub,
            email: user.email,
            name: user.name,
            image: user.image,
          });
        } else {
          await supabase
            .from("users")
            .update({ last_login: new Date().toISOString() })
            .eq("google_id", profile.sub);
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

### Step 4: Create AuthProvider Component
File: `app/components/AuthProvider.js`

```javascript
"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

### Step 5: Wrap App with AuthProvider
File: `app/layout.js`

```javascript
import AuthProvider from "./components/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### Step 6: Create SignInButton Component
File: `app/components/SignInButton.js`

```javascript
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span>{session.user?.name}</span>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
}
```

### Step 7: Create Users Table in Supabase

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  google_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON users FOR UPDATE USING (true);
```

### Step 8: Configure next.config.ts for Google Images

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## 🛡 Route Protection (Middleware)

### Overview
Protect routes so only authenticated users can access them.

### File: `middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  
  if (!secret) {
    console.warn("NEXTAUTH_SECRET not available");
    return NextResponse.next();
  }

  try {
    const token = await getToken({ req: request, secret });

    if (!token) {
      const url = new URL("/", request.url);
      url.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Protect these routes
export const config = {
  matcher: ["/dashboards/:path*"],
};
```

### What It Does:
- Checks if user has valid session token
- Redirects to home page if not authenticated
- Protects `/dashboards` and all sub-routes

---

## 🧪 Testing with Hoppscotch

### What is Hoppscotch?
Free, web-based API testing tool: [hoppscotch.io](https://hoppscotch.io)

### Testing Steps:

#### Test 1: Get All Keys
| Field | Value |
|-------|-------|
| Method | `GET` |
| URL | `http://localhost:3000/api/keys` |

#### Test 2: Create Key
| Field | Value |
|-------|-------|
| Method | `POST` |
| URL | `http://localhost:3000/api/keys` |
| Body | `{"name": "Test Key"}` |

#### Test 3: GitHub Summarizer
| Field | Value |
|-------|-------|
| Method | `POST` |
| URL | `http://localhost:3000/api/github-summarizer` |
| Header | `x-api-key: your-api-key` |
| Body | `{"repo_url": "https://github.com/facebook/react"}` |

---

## 📦 GitHub Setup

### Step 1: Initialize Git
```bash
cd your-project
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create repository (e.g., `my-api-app`)
3. Don't initialize with README

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/username/my-api-app.git
git branch -M main
git push -u origin main
```

### Step 4: Future Updates
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## 🌐 Vercel Deployment

### Step 1: Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js

### Step 2: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
| `OPENAI_API_KEY` | Your OpenAI API Key |
| `GOOGLE_CLIENT_ID` | Your Google Client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Your random secret |

### Step 3: Configure Google OAuth for Production
Add these in Google Cloud Console:
- **JavaScript origin:** `https://your-app.vercel.app`
- **Redirect URI:** `https://your-app.vercel.app/api/auth/callback/google`

### Step 4: Deploy
Click **Deploy** - Vercel builds and deploys automatically.

### Step 4: Auto-Deploy
Every `git push` to main triggers automatic redeployment!

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER FLOW                                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Dashboard  │────▶│  Create Key  │────▶│   Use Key    │
│   /dashboards│     │  POST /keys  │     │  x-api-key   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API REQUEST FLOW                              │
└─────────────────────────────────────────────────────────────────┘

Request ──▶ Validate API Key ──▶ Check Usage Limit ──▶ Process Request
   │              │                      │                    │
   │              │                      │                    ▼
   │         ┌────┴────┐           ┌─────┴─────┐      ┌──────────────┐
   │         │ Invalid │           │  Exceeded │      │ Fetch GitHub │
   │         │  401    │           │    403    │      │     Data     │
   │         └─────────┘           └───────────┘      └──────────────┘
   │                                                         │
   │                                                         ▼
   │                                                  ┌──────────────┐
   │                                                  │ Fetch README │
   │                                                  └──────────────┘
   │                                                         │
   │                                                         ▼
   │                                                  ┌──────────────┐
   │                                                  │  LangChain   │
   │                                                  │   + OpenAI   │
   │                                                  └──────────────┘
   │                                                         │
   │                                                         ▼
   │                                                  ┌──────────────┐
   ◀─────────────────────────────────────────────────│   Response   │
                                                      │   200 OK     │
                                                      └──────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                               │
└─────────────────────────────────────────────────────────────────┘

  Local Dev          GitHub              Vercel
┌──────────┐     ┌──────────┐     ┌──────────────────┐
│  Code    │────▶│  Push    │────▶│  Auto Deploy     │
│  yarn dev│     │  main    │     │  Production URL  │
└──────────┘     └──────────┘     └──────────────────┘
     │                                     │
     │                                     │
     ▼                                     ▼
localhost:3000              sanjeev-api-key-app.vercel.app
```

---

## 📁 File Structure

```
dandi/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js          # NextAuth API route
│   │   ├── keys/
│   │   │   ├── route.js              # GET/POST keys
│   │   │   └── [id]/
│   │   │       └── route.js          # PUT/DELETE key
│   │   ├── validate/
│   │   │   └── route.js              # Validate key
│   │   └── github-summarizer/
│   │       └── route.js              # AI summarizer
│   ├── dashboards/
│   │   └── page.js                   # Dashboard UI (Protected)
│   ├── components/
│   │   ├── AuthProvider.js           # SessionProvider wrapper
│   │   ├── SignInButton.js           # Google sign-in button
│   │   ├── Sidebar.js                # Navigation sidebar
│   │   └── Notification.js           # Toast notifications
│   ├── playground/
│   │   └── page.js                   # API testing page
│   ├── layout.js                     # App layout with AuthProvider
│   └── page.js                       # Home page with sign-in
├── lib/
│   ├── supabaseClient.js             # Database client
│   └── chain.js                      # LangChain + OpenAI
├── middleware.ts                     # Route protection
├── .env.local                        # Environment variables
├── package.json                      # Dependencies
├── yarn.lock                         # Lock file
├── next.config.ts                    # Next.js config (with Google images)
└── PROJECT-GUIDE.md                  # This file!
```

---

## ⚡ Quick Reference Commands

### Development
```bash
# Start dev server
yarn dev

# Install package
yarn add package-name

# Build for production
yarn build
```

### Git
```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "message"

# Push
git push origin main
```

### Terminal (Windows)
```powershell
# Kill all Node processes
taskkill /F /IM node.exe

# Navigate to project
cd "C:\path\to\project"
```

---

## 🎯 Checklist for New Projects

### Basic Setup
- [ ] Create Next.js project
- [ ] Set up Supabase database (api_keys table)
- [ ] Create `.env.local` with credentials
- [ ] Install dependencies (Supabase, LangChain, Zod)
- [ ] Create API routes
- [ ] Build dashboard UI
- [ ] Test with Hoppscotch

### Authentication (Google SSO)
- [ ] Install next-auth
- [ ] Create Google OAuth credentials in Google Cloud Console
- [ ] Create `app/api/auth/[...nextauth]/route.js`
- [ ] Create `AuthProvider` component
- [ ] Create `SignInButton` component
- [ ] Update `layout.js` with AuthProvider
- [ ] Create `middleware.ts` for route protection
- [ ] Create `users` table in Supabase
- [ ] Update `next.config.ts` for Google images

### Deployment
- [ ] Initialize Git repository
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add ALL environment variables to Vercel
- [ ] Configure Google OAuth for production URL
- [ ] Test production authentication
- [ ] Test production endpoints

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [LangChain JS Docs](https://js.langchain.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Hoppscotch](https://hoppscotch.io)

---

*Last Updated: January 7, 2026*
*Created with ❤️ using Cursor AI*

---

## 🔑 Environment Variables Reference

When deploying to Vercel, set these environment variables:

| Variable | Where to Get It |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `OPENAI_API_KEY` | OpenAI Platform → API Keys |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → Credentials |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console → Credentials |
| `NEXTAUTH_URL` | Your Vercel URL (e.g., `https://your-app.vercel.app`) |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` |

**⚠️ Never commit real credentials to Git!**

---

## 🚨 Troubleshooting

### Error: "OAuth client was not found"
- Verify `GOOGLE_CLIENT_ID` in Vercel matches Google Cloud Console
- Check for extra spaces or characters

### Error: "redirect_uri_mismatch"
- Add production redirect URI to Google Cloud Console:
  `https://your-app.vercel.app/api/auth/callback/google`

### Error: "NO_SECRET"
- Add `NEXTAUTH_SECRET` to Vercel environment variables
- Redeploy without cache

### Error: "Server configuration error"
- Verify all environment variables are set in Vercel
- Redeploy with "Use existing Build Cache" UNCHECKED

