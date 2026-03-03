const mongoose = require("mongoose");

const emissionSchema = new mongoose.Schema({
  year: Number,
  value: Number
});

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  yearlyEmissions: [emissionSchema],
  renewablePercentage: Number,
  waterUsage: Number,
  wasteGenerated: Number,
  sustainabilityClaim: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Company", companySchema);