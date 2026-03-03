const mongoose = require("mongoose");
const Company = require("./models/Company");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/esg-platform";

const seedData = [
  {
    companyName: "EcoTech Industries",
    industry: "Manufacturing",
    yearlyEmissions: [
      { year: 2021, value: 1200 },
      { year: 2022, value: 1050 },
      { year: 2023, value: 900 }
    ],
    renewablePercentage: 65,
    waterUsage: 50000,
    wasteGenerated: 1500,
    sustainabilityClaim: "We have reduced our carbon footprint by 25% over the last 3 years and aim to be carbon neutral by 2030."
  },
  {
    companyName: "GreenFuture Energy",
    industry: "Energy",
    yearlyEmissions: [
      { year: 2021, value: 5000 },
      { year: 2022, value: 3000 },
      { year: 2023, value: 1200 }
    ],
    renewablePercentage: 90,
    waterUsage: 20000,
    wasteGenerated: 500,
    sustainabilityClaim: "Transitioning to 100% renewable sources by 2025. Massive reduction in reliance on fossil fuels."
  },
  {
    companyName: "FastFashion Corp",
    industry: "Textiles",
    yearlyEmissions: [
      { year: 2021, value: 2500 },
      { year: 2022, value: 2600 },
      { year: 2023, value: 2750 }
    ],
    renewablePercentage: 10,
    waterUsage: 150000,
    wasteGenerated: 8000,
    sustainabilityClaim: "We are committed to eco-friendly practices and sustainable cotton sourcing."
  },
  {
    companyName: "AgriGrow Solutions",
    industry: "Agriculture",
    yearlyEmissions: [
      { year: 2021, value: 800 },
      { year: 2022, value: 820 },
      { year: 2023, value: 810 }
    ],
    renewablePercentage: 30,
    waterUsage: 300000,
    wasteGenerated: 2000,
    sustainabilityClaim: "Utilizing precision agriculture to cut down water waste and chemical runoff."
  },
  {
    companyName: "CloudNet Systems",
    industry: "Technology",
    yearlyEmissions: [
      { year: 2021, value: 400 },
      { year: 2022, value: 450 },
      { year: 2023, value: 500 }
    ],
    renewablePercentage: 45,
    waterUsage: 12000,
    wasteGenerated: 100,
    sustainabilityClaim: "All our data centers will be powered by renewable energy in the next decade."
  },
  {
    companyName: "SteelWorks Inc.",
    industry: "Metallurgy",
    yearlyEmissions: [
      { year: 2021, value: 15000 },
      { year: 2022, value: 14500 },
      { year: 2023, value: 14200 }
    ],
    renewablePercentage: 5,
    waterUsage: 80000,
    wasteGenerated: 12000,
    sustainabilityClaim: "Investing in green steel technologies to lower blast furnace emissions."
  },
  {
    companyName: "UrbanTransit Co",
    industry: "Transportation",
    yearlyEmissions: [
      { year: 2021, value: 3500 },
      { year: 2022, value: 3300 },
      { year: 2023, value: 2800 }
    ],
    renewablePercentage: 40,
    waterUsage: 5000,
    wasteGenerated: 800,
    sustainabilityClaim: "Electrifying 50% of our public transit fleet by 2026."
  },
  {
    companyName: "OceanBreeze Shipping",
    industry: "Logistics",
    yearlyEmissions: [
      { year: 2021, value: 8000 },
      { year: 2022, value: 7800 },
      { year: 2023, value: 8200 }
    ],
    renewablePercentage: 2,
    waterUsage: 40000,
    wasteGenerated: 3500,
    sustainabilityClaim: "We use the latest fuel-efficient engines and are exploring biofuel alternatives."
  },
  {
    companyName: "BuildRight Construction",
    industry: "Construction",
    yearlyEmissions: [
      { year: 2021, value: 4500 },
      { year: 2022, value: 4600 },
      { year: 2023, value: 4400 }
    ],
    renewablePercentage: 15,
    waterUsage: 60000,
    wasteGenerated: 9000,
    sustainabilityClaim: "Implementing circular economy principles to recycle up to 60% of our building waste."
  },
  {
    companyName: "PureHealth Pharma",
    industry: "Healthcare",
    yearlyEmissions: [
      { year: 2021, value: 1200 },
      { year: 2022, value: 1150 },
      { year: 2023, value: 1100 }
    ],
    renewablePercentage: 50,
    waterUsage: 45000,
    wasteGenerated: 600,
    sustainabilityClaim: "Ensuring zero-emission packaging for all over-the-counter products."
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");
    await Company.deleteMany({});
    console.log("Cleared existing companies.");
    await Company.insertMany(seedData);
    console.log("Seeded 10 companies successfully.");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error seeding data: ", err);
    process.exit(1);
  });
