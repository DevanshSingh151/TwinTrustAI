import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [simulateValue, setSimulateValue] = useState(0);
  const [simulatedEquipment, setSimulatedEquipment] = useState("");

  const getIndustryEquipments = (industry) => {
    const ind = industry?.toLowerCase() || "";
    if (ind.includes("tech")) return ["AI-Driven Server Cooling", "High-Efficiency HVAC", "Liquid Cooled Racks"];
    if (ind.includes("manufactur")) return ["Smart Assembly Motors", "Automated Waste Sorting", "Solar Boiler System"];
    if (ind.includes("retail")) return ["LED Retrofit Sensors", "Electric Delivery Fleet", "Smart Thermostats"];
    if (ind.includes("transport") || ind.includes("logistics")) return ["EV Fleet Upgrade", "Aerodynamic Trailer Addons", "AI Route Optimization"];
    return ["Energy-Efficient Lighting", "HVAC Modernization", "Smart Grid Integration"];
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  useEffect(() => {
    const defaultCompany = companies.find(c => c._id === selected);
    if (defaultCompany) {
      setSimulateValue(defaultCompany.renewablePercentage);
      setSimulatedEquipment("");
    }
  }, [selected, companies]);

  const analyze = async () => {
    if (!selected) return;
    setLoading(true);
    setAnalysis("");
    try {
      const res = await fetch(
        `http://localhost:5000/api/analyze/${selected}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            simulatedRenewable: Number(simulateValue),
            simulatedEquipment: simulatedEquipment
          })
        }
      );
      const data = await res.json();
      setAnalysis(data.aiAnalysis);
      setHash(data.dataHash);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const company = companies.find(c => c._id === selected);

  const chartData = company
    ? {
      labels: company.yearlyEmissions.map(e => e.year),
      datasets: [
        {
          label: "CO2 Emissions (Metric Tons)",
          data: company.yearlyEmissions.map(e => e.value),
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          hoverBackgroundColor: "rgba(52, 211, 153, 1)",
          borderRadius: 6,
          barThickness: 40,
        }
      ]
    }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "rgba(255, 255, 255, 0.7)" }
      },
      x: {
        grid: { display: false },
        ticks: { color: "rgba(255, 255, 255, 0.7)" }
      }
    },
    plugins: {
      legend: { labels: { color: "rgba(255, 255, 255, 0.9)" } },
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-neutral-900/40 border border-neutral-800/50 p-6 rounded-2xl backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>

        <div className="flex-1 w-full relative z-10">
          <h2 className="text-2xl font-semibold mb-2 text-white">Digital Twin Configurator</h2>
          <p className="text-neutral-400 text-sm mb-4">Select an industry entity to simulate its sustainability profile and uncover hidden ESG risks.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3 transition-all hover:bg-neutral-900"
              onChange={e => setSelected(e.target.value)}
              value={selected}
            >
              <option value="">-- Choose Target Company --</option>
              {companies.map(c => (
                <option key={c._id} value={c._id}>
                  {c.companyName} ({c.industry})
                </option>
              ))}
            </select>

            {selected && company && (
              <div className="flex-1 flex flex-col justify-center min-w-[200px] gap-2">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-neutral-400">Simulate Renewables:</span>
                    <span className="text-emerald-400 font-bold">{simulateValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="0" max="100"
                    value={simulateValue}
                    onChange={(e) => setSimulateValue(e.target.value)}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="pt-1">
                  <label className="text-xs text-neutral-400 mb-1 block">Virtual Equipment Prototype:</label>
                  <select
                    className="bg-neutral-900 border border-neutral-700 text-emerald-400 text-xs rounded-lg focus:ring-1 focus:ring-emerald-500 block w-full p-1.5 outline-none transition-colors hover:border-emerald-500/50"
                    value={simulatedEquipment}
                    onChange={(e) => setSimulatedEquipment(e.target.value)}
                  >
                    <option value="">-- Baseline Configuration --</option>
                    {getIndustryEquipments(company.industry).map(eq => (
                      <option key={eq} value={eq}>{eq}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={analyze}
              disabled={!selected || loading}
              className={`px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center min-w-[160px]
                ${!selected
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5"
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : "Analyze Entity"}
            </button>
          </div>
        </div>
      </div>

      {company && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entity Profile Metrics */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl backdrop-blur-sm shadow-md">
              <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Entity Telemetry
              </h3>

              <div className="space-y-5">
                <div className="group">
                  <p className="text-sm text-neutral-400 mb-1">Renewable Energy Share</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">{company.renewablePercentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-1.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${company.renewablePercentage}%` }}></div>
                  </div>
                </div>

                <div className="group border-t border-neutral-800/50 pt-4">
                  <p className="text-sm text-neutral-400 mb-1">Water Usage</p>
                  <span className="text-2xl font-semibold text-neutral-200">{company.waterUsage.toLocaleString()} <span className="text-sm text-neutral-500">gallons/yr</span></span>
                </div>

                <div className="group border-t border-neutral-800/50 pt-4">
                  <p className="text-sm text-neutral-400 mb-1">Waste Generated</p>
                  <span className="text-2xl font-semibold text-neutral-200">{company.wasteGenerated.toLocaleString()} <span className="text-sm text-neutral-500">tons/yr</span></span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 p-5 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-semibold">Public Statement</p>
              <p className="text-neutral-300 text-sm leading-relaxed border-l-2 border-emerald-500 pl-3 italic relative z-10">
                "{company.sustainabilityClaim}"
              </p>
            </div>
          </div>

          {/* Emissions Graph */}
          <div className="lg:col-span-2 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl backdrop-blur-md flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Historical Emissions Profile</h3>
              <div className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 rounded border border-neutral-700">Digital Twin Scope 1 & 2</div>
            </div>
            <div className="flex-1 w-full h-[300px] relative">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Result */}
      {analysis && (
        <div id="ai-report-content" className="bg-neutral-900 border border-emerald-900/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)] relative mt-4 animate-in slide-in-from-bottom-5 duration-700">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-cyan-500"></div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg" data-html2canvas-ignore>
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">TwinTrust Simulator Report</h3>
              </div>

              <div className="flex items-center gap-3" data-html2canvas-ignore>
                <div className="text-xs bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 font-mono text-neutral-400 block">
                  Hash: <span className="text-emerald-400">{hash.substring(0, 10)}...</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-neutral-950/50 rounded-xl p-5 border border-neutral-800 font-mono text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap shadow-inner relative">
                <div className="absolute inset-0 bg-scan-line opacity-5 pointer-events-none rounded-xl" style={{ backgroundSize: '100% 4px', backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)' }}></div>
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;