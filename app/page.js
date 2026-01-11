"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignInButton from "./components/SignInButton";

// Icons
const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <KeyIcon />,
      title: "API Key Management",
      description: "Create, manage, and track API keys with usage limits and analytics. Full CRUD operations with a beautiful dashboard.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: <ShieldIcon />,
      title: "Full-stack Auth",
      description: "Add login with Google SSO in minutes. Secure authentication with NextAuth.js and session management built-in.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: <CodeIcon />,
      title: "RPC (Client ↔ Server)",
      description: "Seamless API communication with automatic validation. Type-safe requests between your frontend and backend.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: <RocketIcon />,
      title: "Simple Deployment",
      description: "Deploy to Vercel with one click. Environment variables, serverless functions, and edge caching out of the box.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: <BrainIcon />,
      title: "AI-Powered",
      description: "LangChain + OpenAI integration for intelligent GitHub repository summaries. Get insights in seconds.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    },
    {
      icon: <ZapIcon />,
      title: "And More!",
      description: "Usage tracking, rate limiting, playground for testing, beautiful UI components, and comprehensive documentation.",
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e6]">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 border-b border-[#e5dfd1]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#f0c14b] flex items-center justify-center">
              <span className="text-lg">🔑</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sanjeev API KeyForge</span>
            <span className="text-xs font-medium text-[#f0c14b] bg-[#fef9e7] px-2 py-0.5 rounded-full border border-[#f0c14b]/30">(beta)</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-full px-3 py-1.5">
              <span>👋</span> Join the list
            </a>
        </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/babbarsanjeev/sanjeev-api-key-app" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <StarIcon />
              Star us on GitHub
            </a>
            {session ? (
              <div className="flex items-center gap-3">
                {/* User Info */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm">
                  {session.user?.image ? (
          <Image
                      src={session.user.image} 
                      alt="Profile" 
                      width={28}
                      height={28}
                      className="rounded-full object-cover ring-2 ring-[#f0c14b]/50"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#f0c14b] flex items-center justify-center text-gray-900 text-xs font-bold">
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || '?'}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {session.user?.name || session.user?.email?.split('@')[0]}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </span>
                </div>
                {/* Dashboard Button */}
                <Link 
                  href="/dashboards"
                  className="px-4 py-2 text-sm font-semibold bg-[#f0c14b] hover:bg-[#e5b645] text-gray-900 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <SignInButton />
            )}
            <div className="flex items-center gap-2">
              <a href="https://github.com/babbarsanjeev/sanjeev-api-key-app" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Manage API keys{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">faster.</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#f0c14b] -z-0"></span>
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Rails-like framework for API Key Management with React, Next.js and Supabase. Build your app in a day and deploy it with a single CLI command.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link 
                  href="/dashboards"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0c14b] hover:bg-[#e5b645] text-gray-900 font-semibold rounded-lg transition-colors shadow-sm"
                >
                  <TerminalIcon />
                  Get Started
                </Link>
                <a 
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-300"
                >
                  <BookIcon />
                  Documentation
                </a>
              </div>

              {/* Works with */}
              <div className="space-y-3">
                <p className="text-sm text-gray-500 font-medium">Works with</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                    </svg>
                    <span className="text-sm font-medium">React</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                    </svg>
                    <span className="text-sm font-medium">Node.js</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                      <path d="M21.807 18.285L13.553.756a1.324 1.324 0 00-1.129-.754 1.31 1.31 0 00-1.206.626l-8.952 14.5a1.356 1.356 0 00.016 1.455l4.376 6.778a1.408 1.408 0 001.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.145zm-1.848.752L9.18 22.224a.452.452 0 01-.575-.52l3.85-18.438c.072-.345.549-.4.699-.08l7.129 15.138a.515.515 0 01-.324.713z"/>
                    </svg>
                    <span className="text-sm font-medium">Supabase</span>
                  </div>
                </div>
              </div>

              {/* Backed by */}
              <div className="mt-8 flex items-center gap-2">
                <span className="text-sm text-gray-500">Powered by</span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded border border-gray-200">
                  <span className="text-orange-500 font-bold text-sm">▲</span>
                  <span className="text-sm font-semibold text-gray-700">Vercel</span>
                </div>
              </div>
            </div>

            {/* Right side - Code Preview */}
            <div className="relative">
              {/* Main code block */}
              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl">
                {/* Tab bar */}
                <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d]">
                  <span className="text-sm text-gray-400">apiKeys.js</span>
                  <span className="text-xs text-gray-500">↗</span>
                  <span className="text-xs text-gray-600 ml-2">- KeyForge config file</span>
                  <div className="ml-auto flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                {/* Code content */}
                <div className="p-4 font-mono text-sm leading-relaxed">
                  <div><span className="text-purple-400">app</span> <span className="text-blue-400">keyForgeApp</span> <span className="text-gray-400">{'{'}</span></div>
                  <div className="pl-4"><span className="text-gray-500">title:</span> <span className="text-yellow-300">&quot;API Keys&quot;</span><span className="text-gray-400">,</span> <span className="text-green-400">// visible in the browser tab</span></div>
                  <div className="pl-4"><span className="text-gray-500">auth:</span> <span className="text-gray-400">{'{'}</span> <span className="text-green-400">// full-stack auth out-of-the-box</span></div>
                  <div className="pl-8"><span className="text-gray-500">userEntity:</span> <span className="text-blue-400">User</span><span className="text-gray-400">,</span></div>
                  <div className="pl-8"><span className="text-gray-500">methods:</span> <span className="text-gray-400">{'{'}</span> <span className="text-gray-500">google:</span> <span className="text-gray-400">{'{}'}</span><span className="text-gray-400">,</span> <span className="text-gray-500">github:</span> <span className="text-gray-400">{'{}'}</span><span className="text-gray-400">,</span> <span className="text-gray-500">email:</span> <span className="text-gray-400">{'{...}'}</span> <span className="text-gray-400">{'}'}</span></div>
                  <div className="pl-4"><span className="text-gray-400">{'}'}</span></div>
                  <div><span className="text-gray-400">{'}'}</span></div>
                  <div className="mt-4"><span className="text-purple-400">route</span> <span className="text-blue-400">RootRoute</span> <span className="text-gray-400">{'{'}</span> <span className="text-gray-500">path:</span> <span className="text-yellow-300">&quot;/&quot;</span><span className="text-gray-400">,</span> <span className="text-gray-500">to:</span> <span className="text-blue-400">MainPage</span> <span className="text-gray-400">{'}'}</span></div>
                  <div><span className="text-purple-400">page</span> <span className="text-blue-400">MainPage</span> <span className="text-gray-400">{'{'}</span></div>
                  <div className="pl-4"><span className="text-gray-500">authRequired:</span> <span className="text-orange-400">true</span><span className="text-gray-400">,</span> <span className="text-green-400">// Limit access to logged in users.</span></div>
                  <div className="pl-4"><span className="text-gray-500">component:</span> <span className="text-purple-400">import</span> <span className="text-blue-400">Main</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">&quot;@client/Main&quot;</span> <span className="text-green-400">// Your React code.</span></div>
                  <div><span className="text-gray-400">{'}'}</span></div>
                </div>
              </div>

              {/* Secondary code block - schema */}
              <div className="mt-4 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d]">
                  <span className="text-sm text-gray-400">schema.prisma</span>
                  <span className="text-xs text-gray-500">↗</span>
                  <span className="text-xs text-gray-600 ml-2">- KeyForge entities schema</span>
                  <div className="ml-auto flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <span className="text-purple-400">model</span> <span className="text-blue-400">ApiKey</span> <span className="text-gray-400">{'{ ... }'}</span> <span className="text-green-400">// Your Prisma data model.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-[#f0c14b] hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{feature.description}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#e5b645] transition-colors">
                  Learn more <ArrowRightIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User welcome (if signed in) */}
      {session && (
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800 flex items-center gap-2">
                <span className="text-xl">✅</span>
                <span>Signed in as <strong>{session.user?.email}</strong> — </span>
                <Link href="/dashboards" className="font-semibold underline hover:text-green-900">Go to Dashboard</Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#e5dfd1]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f0c14b] flex items-center justify-center">
              <span className="text-sm">🔑</span>
            </div>
            <span className="font-bold text-gray-900">Sanjeev API KeyForge</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 Sanjeev API KeyForge. Built with ❤️ by Sanjeev Babbar</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/babbarsanjeev/sanjeev-api-key-app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
              <GitHubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
