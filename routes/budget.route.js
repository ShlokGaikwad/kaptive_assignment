const express = require("express");
const authenticateToken = require("../middleware/auth.middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const budgetRouter = express.Router();

budgetRouter.post("/budget", authenticateToken, async (req, res) => {
  const { amount, month, year } = req.body;

  try {
    const budget = await prisma.budget.create({
      data: {
        amount,
        month,
        year,
        userId: req.user.id,
      },
    });
    res.status(201).send(budget);
  } catch (err) {
    res.status(400).send(err);
  }
});

budgetRouter.get("/budget", authenticateToken, async (req, res) => {
  const { month, year } = req.query;

  try {
    const budget = await prisma.budget.findFirst({
      where: {
        userId: req.user.id,
        month,
        year: parseInt(year),
      },
    });
    res.status(200).json(budget);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = budgetRouter;
