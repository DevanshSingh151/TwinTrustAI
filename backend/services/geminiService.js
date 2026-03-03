const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeESG(company, simulationData = {}) {
  const { simulatedRenewable, simulatedEquipment } = simulationData;
  const isSimulation = (simulatedRenewable !== undefined && simulatedRenewable !== null && simulatedRenewable !== company.renewablePercentage) || !!simulatedEquipment;

  let prompt = `
Analyze the ESG performance of this entity concisely.
Company: ${company.companyName}
Industry: ${company.industry}
Current Renewable Energy: ${company.renewablePercentage}%
Water Usage: ${company.waterUsage}
Waste Generated: ${company.wasteGenerated}
Claim: ${company.sustainabilityClaim}

${isSimulation ? `**DIGITAL TWIN SIMULATION ACTIVATED**
The user is simulating the following virtual replica upgrades:
${simulatedRenewable ? `- Increasing Renewable Energy from ${company.renewablePercentage}% to ${simulatedRenewable}%` : ''}
${simulatedEquipment ? `- Upgrading equipment to: ${simulatedEquipment}` : ''}

Explicitly calculate and predict the emission reduction impact and operational benefits of this change. State something like: "Based on the simulated upgrade to ${simulatedEquipment || 'Renewables'}, predictions show..."` : ''}

Provide a concise, hard-hitting report including:
1. ESG Score (0-100)
2. Risk Analysis (Very brief)
3. Greenwashing Detection (Yes/No with 1 sentence reason)
${isSimulation ? '4. Simulation Impact (Prediction of benefits from the upgraded replica scenario)' : '4. Improvement Suggestions (Top 2 only)'}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return `Error generating analysis. API output: ${error.message}`;
  }
}

module.exports = { analyzeESG };