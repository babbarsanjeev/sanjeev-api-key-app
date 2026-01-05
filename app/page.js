import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-zinc-900 dark:to-black">
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="w-full max-w-5xl flex items-center justify-between mb-16">
          <p className="font-mono text-sm bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700">
            Get started by editing <code className="font-bold">src/app/page.js</code>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">By</span>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={70}
              height={16}
              className="dark:invert"
            />
          </div>
        </div>

        {/* Logo */}
        <div className="mb-16">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            className="dark:invert"
            priority
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-8">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-1">
              Docs{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-1">
              Learn{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-1">
              Templates{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore starter templates for Next.js.
            </p>
          </a>

          <Link
            href="/dashboards"
            className="group p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-1">
              Manage API Keys{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access the dashboard to manage your API keys.
            </p>
          </Link>
        </div>

        {/* Deploy Card */}
        <div className="w-full max-w-5xl">
          <a
            href="https://vercel.com/new?utm_source=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all inline-block"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-1">
              Deploy{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
