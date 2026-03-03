import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ESGForm from "./components/ESGForm";

function App() {
  const [activeTab, setActiveTab] = useState("monitor");

  const renderContent = () => {
    switch (activeTab) {
      case "monitor":
        return (
          <>
            <div className="mb-8 animate-in fade-in">
              <h2 className="text-3xl font-bold text-white mb-2">Sustainability Dashboard</h2>
              <p className="text-neutral-400">Monitor emissions, compare sustainability profiles, and detect greenwashing with Gemini AI.</p>
            </div>
            <Dashboard />
          </>
        );
      case "analysis":
        return (
          <>
            <div className="mb-8 animate-in fade-in">
              <h2 className="text-3xl font-bold text-white mb-2">AI Search & Reporting</h2>
              <p className="text-neutral-400">Enter comprehensive sustainability data to calculate ESG scores and generate intelligent reports.</p>
            </div>
            <ESGForm />
          </>
        );
      case "overview":
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Welcome to TwinTrust AI</h2>
            <p className="text-neutral-400 max-w-xl text-lg mb-8">Your complete operations center for mitigating environmental risks, verifying compliance claims, and securing your sustainable future.</p>
            <button onClick={() => setActiveTab("monitor")} className="px-6 py-3 bg-white text-neutral-900 font-semibold rounded-xl hover:bg-neutral-200 transition-colors">Launch Dashboard</button>
          </div>
        );
      case "database":
        // Fallback for visual completeness
        return (
          <div className="text-center py-20 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white mb-2">Reports Database</h2>
            <p className="text-neutral-400 mb-8">All generated sustainability reports securely logged in MongoDB.</p>
            <button onClick={() => setActiveTab("monitor")} className="px-6 py-2 border border-neutral-700 rounded-lg text-neutral-300 hover:bg-neutral-800 transition-colors">Return to Monitor</button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <header className="bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("overview")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              TwinTrust AI
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`transition-colors ${activeTab === "overview" ? "text-emerald-400" : "text-neutral-400 hover:text-emerald-300"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("monitor")}
              className={`transition-colors ${activeTab === "monitor" ? "text-emerald-400" : "text-neutral-400 hover:text-emerald-300"}`}
            >
              Digital Twin Monitor
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`transition-colors ${activeTab === "analysis" ? "text-emerald-400" : "text-neutral-400 hover:text-emerald-300"}`}
            >
              ESG Analysis Hub
            </button>
            <button
              onClick={() => setActiveTab("database")}
              className={`transition-colors ${activeTab === "database" ? "text-emerald-400" : "text-neutral-400 hover:text-emerald-300"}`}
            >
              Reports Database
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;