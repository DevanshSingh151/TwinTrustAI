# TwinTrust AI – Sustainability Digital Twin 🌍  

An AI-powered ESG (Environmental, Social, and Governance) Intelligence Platform designed to transform corporate sustainability data into actionable insights. TwinTrust AI features dynamic digital twin simulations, intelligent greenwashing detection, and real-time generative reports using Google Gemini AI.

![TwinTrust AI](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success?logo=mongodb)

---

## ✨ Features

- **Interactive ESG Dashboard**: Visualize historical emissions, renewable energy share, water usage, and waste statistics using beautifully animated Chart.js elements.
- **Digital Twin Simulator**: Project hypothetical infrastructure upgrades (e.g., *AI-Driven Server Cooling*, *EV Fleet Upgrades*) or tweak renewable energy percentages to predict future carbon footprint reductions.
- **AI Analytics & Greenwashing Detection**: Gemini AI parses public sustainability statements against hardcore telemetry data to verify corporate claims and expose inconsistencies.
- **Dynamic Equipment Prototyping**: Context-aware machinery simulations based strictly on the entity's target industry.
- **Immutable Hashing**: Secures the underlying generation telemetry with SHA-256 signatures for authentic data trails.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS (for modern glassmorphism & dark-mode aesthetics), React-Chartjs-2
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **AI Engine**: Google GenAI (`gemini-2.5-flash`)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine. You will also need an active [Google Gemini API Key](https://aistudio.google.com/).

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/DevanshSingh151/TwinTrustAI.git
cd TwinTrustAI
\`\`\`

### 2. Backend Setup
\`\`\`bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure Environment Variables
# Create a .env file in the backend directory
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://localhost:27017/twintrust" >> .env
echo "GEMINI_API_KEY=your_gemini_api_key_here" >> .env

# Seed the database with sample industries and start server
node seed.js
node server.js
\`\`\`

### 3. Frontend Setup
Open a new terminal window.
\`\`\`bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

### 4. Unleash the Twin
Navigate to **\`http://localhost:5173\`** in your browser. Select an initial entity profile and test the real-time AI Generative limits inside the Digital Twin Configurator.

---

## 🔒 Environment Variable Reference
Your root `.env` must be situated in the `backend/` folder.
- `PORT=5000` (The Express server port)
- `MONGO_URI=mongodb://localhost:27017/twintrust` (Your local or remote Atlas Mongo Database connection string)
- `GEMINI_API_KEY=` (Your private Google GenAI API Secret)

---

## 🤝 Contributing
TwinTrust AI was engineered with scale and presentation in mind. PRs for additional Twin Models, enhanced telemetry modules, or UX improvements are highly encouraged.

<p align="center"><i>Made with ❤️ for a Greener Future.</i></p>
