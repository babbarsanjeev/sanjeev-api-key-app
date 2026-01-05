"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";

function ProtectedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  useEffect(() => {
    const validateKey = async () => {
      const key = searchParams.get("key");

      if (!key) {
        showToast("Invalid API Key", "error");
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch("/api/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key }),
        });

        const data = await response.json();

        if (data.valid) {
          setIsValid(true);
          setKeyName(data.keyName || "");
          showToast("valid api key, /protected can be accessed", "success");
        } else {
          setIsValid(false);
          showToast("Invalid API Key", "error");
        }
      } catch (error) {
        console.error("Validation error:", error);
        setIsValid(false);
        showToast("Invalid API Key", "error");
      } finally {
        setIsValidating(false);
      }
    };

    validateKey();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Protected Resource</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            {isValidating ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Validating API Key...</p>
              </div>
            ) : isValid ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Granted!</h2>
                  <p className="text-gray-500">
                    Your API key has been validated successfully.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mt-0.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <polyline points="9 12 11.5 14.5 16 10"></polyline>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-green-800">Protected Content Unlocked</h3>
                      <p className="text-green-700 text-sm mt-1">
                        {keyName ? `Authenticated with key: "${keyName}"` : "You now have access to protected resources."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">What you can do now:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Access protected API endpoints
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      Make authenticated requests
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      View and manage your data
                    </li>
                  </ul>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => router.push("/playground")}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Test Another Key
                  </button>
                  <button
                    onClick={() => router.push("/dashboards")}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                  <p className="text-gray-500">
                    The API key you provided is invalid or has expired.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 mt-0.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-red-800">Authentication Failed</h3>
                      <p className="text-red-700 text-sm mt-1">
                        Please check your API key and try again, or create a new one.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => router.push("/playground")}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => router.push("/dashboards")}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Create API Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Notification toast={toast} />
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <ProtectedContent />
    </Suspense>
  );
}

