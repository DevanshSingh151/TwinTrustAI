import { useState } from "react";
import ReactMarkdown from "react-markdown";

function ESGForm() {
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        renewablePercentage: "",
        waterUsage: "",
        wasteGenerated: "",
        sustainabilityClaim: "",
        emissions2023: ""
    });

    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState("");
    const [hash, setHash] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalysis("");

        try {
            // 1. Save to MongoDB
            const companyPayload = {
                companyName: formData.companyName,
                industry: formData.industry,
                renewablePercentage: Number(formData.renewablePercentage),
                waterUsage: Number(formData.waterUsage),
                wasteGenerated: Number(formData.wasteGenerated),
                sustainabilityClaim: formData.sustainabilityClaim,
                yearlyEmissions: [
                    { year: 2021, value: Number(formData.emissions2023) * 1.1 }, // Mock previous years
                    { year: 2022, value: Number(formData.emissions2023) * 1.05 },
                    { year: 2023, value: Number(formData.emissions2023) }
                ]
            };

            const saveRes = await fetch("http://localhost:5000/api/company", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(companyPayload)
            });
            const savedCompany = await saveRes.json();

            // 2. Predict / Analyze with Gemini
            const analyzeRes = await fetch(`http://localhost:5000/api/analyze/${savedCompany._id}`, {
                method: "POST"
            });
            const aiData = await analyzeRes.json();

            setAnalysis(aiData.aiAnalysis);
            setHash(aiData.dataHash);

        } catch (err) {
            console.error(err);
            setAnalysis("Error analyzing data. Please check the backend connection.");
        }

        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-2xl backdrop-blur-md shadow-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-semibold mb-2 text-white">Generate Custom ESG Report</h2>
                    <p className="text-neutral-400 text-sm mb-8">Enter the entity details below. Our Gemini AI system will automatically store this down in the secure MongoDB database, run complex metrics calculations, and detect any potential greenwashing.</p>

                    <form onSubmit={submitForm} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Company / Entity Name</label>
                                <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="e.g. Acme Corp" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Industry</label>
                                <input required type="text" name="industry" value={formData.industry} onChange={handleChange}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="e.g. Technology" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Carbon Emissions (Metric Tons/Yr)</label>
                                <input required type="number" name="emissions2023" value={formData.emissions2023} onChange={handleChange}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="e.g. 5000" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Renewable Energy Share (%)</label>
                                <input required type="number" name="renewablePercentage" min="0" max="100" value={formData.renewablePercentage} onChange={handleChange}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="e.g. 45" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Water Usage (Gallons/Yr)</label>
                                <input required type="number" name="waterUsage" value={formData.waterUsage} onChange={handleChange}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="e.g. 15000" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Waste Generated (Tons/Yr)</label>
                                <input required type="number" name="wasteGenerated" value={formData.wasteGenerated} onChange={handleChange}
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="e.g. 800" />
                            </div>

                        </div>

                        <div className="space-y-2 border-t border-neutral-800/50 pt-5 mt-2">
                            <label className="text-sm font-medium text-neutral-300">Public Sustainability Claim / Statement</label>
                            <textarea required name="sustainabilityClaim" value={formData.sustainabilityClaim} onChange={handleChange} rows="3"
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none"
                                placeholder="What claims has the company made publicly regarding their environmental commitments?" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center min-w-[200px]"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating AI Report...
                                    </span>
                                ) : (
                                    <span className="flex gap-2 items-center">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        Analyze Entity
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {analysis && (
                <div id="ai-report-form-content" className="bg-neutral-900 border border-cyan-900/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)] relative mt-8 animate-in slide-in-from-bottom-5 duration-700">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-indigo-500"></div>
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/20 rounded-lg" data-html2canvas-ignore>
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Full AI Entity Report</h3>
                            </div>

                            <div className="flex items-center gap-3" data-html2canvas-ignore>
                                <div className="text-xs bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 font-mono text-neutral-400">
                                    Hash: <span className="text-cyan-400">{hash.substring(0, 10)}...</span>
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

export default ESGForm;
