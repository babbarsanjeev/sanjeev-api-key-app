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
8. [Testing with Hoppscotch](#testing-with-hoppscotch)
9. [GitHub Setup](#github-setup)
10. [Vercel Deployment](#vercel-deployment)
11. [Complete Flow Diagram](#complete-flow-diagram)
12. [File Structure](#file-structure)
13. [Quick Reference Commands](#quick-reference-commands)

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

### File: `.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI
OPENAI_API_KEY=sk-proj-your-openai-key-here
```

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

### Step 3: Deploy
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
│   │   ├── keys/
│   │   │   ├── route.js              # 60 lines - GET/POST keys
│   │   │   └── [id]/
│   │   │       └── route.js          # 74 lines - PUT/DELETE key
│   │   ├── validate/
│   │   │   └── route.js              # 54 lines - Validate key
│   │   └── github-summarizer/
│   │       └── route.js              # 165 lines - AI summarizer
│   ├── dashboards/
│   │   └── page.js                   # Dashboard UI
│   ├── components/
│   │   ├── Sidebar.js                # Navigation sidebar
│   │   └── Notification.js           # Toast notifications
│   ├── playground/
│   │   └── page.js                   # API testing page
│   ├── layout.js                     # App layout
│   └── page.js                       # Home page
├── lib/
│   ├── supabaseClient.js             # Database client
│   └── chain.js                      # LangChain + OpenAI
├── .env.local                        # Environment variables
├── package.json                      # Dependencies
├── yarn.lock                         # Lock file
├── tailwind.config.js                # Tailwind config
└── next.config.js                    # Next.js config
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

- [ ] Create Next.js project
- [ ] Set up Supabase database
- [ ] Create `.env.local` with credentials
- [ ] Install dependencies (Supabase, LangChain, Zod)
- [ ] Create API routes
- [ ] Build dashboard UI
- [ ] Test with Hoppscotch
- [ ] Initialize Git repository
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables to Vercel
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

*Last Updated: January 6, 2026*
*Created with ❤️ using Cursor AI*

