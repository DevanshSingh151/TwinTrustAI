const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const { analyzeESG } = require("../services/geminiService");
const { generateHash } = require("../services/hashService");

router.post("/company", async (req, res) => {
  const company = await Company.create(req.body);
  res.json(company);
});

router.get("/companies", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

router.post("/analyze/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);
  const simulationData = req.body || {};

  const aiResult = await analyzeESG(company, simulationData);
  const hash = generateHash(company);

  res.json({
    aiAnalysis: aiResult,
    dataHash: hash
  });
});

module.exports = router;