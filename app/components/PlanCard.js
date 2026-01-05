"use client";

export default function PlanCard({ totalUsage, maxLimit = 1000 }) {
  const usagePercentage = Math.min((totalUsage / maxLimit) * 100, 100);

  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
            CURRENT PLAN
          </span>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Manage Plan
          </button>
        </div>
        <h3 className="text-4xl font-bold mb-6">Researcher</h3>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">API Limit</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
          <p className="text-sm">{totalUsage.toLocaleString()}/{maxLimit.toLocaleString()} Requests</p>
        </div>
      </div>
    </div>
  );
}

