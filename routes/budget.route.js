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
  try {
    const budget = await prisma.budget.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json(budget);
  } catch (err) {
    res.status(400).send(err);
  }
});

budgetRouter.put("/budget/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { amount, categoryId, startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    const budget = await prisma.budget.updateMany({
      where: { id: parseInt(id), userId },
      data: {
        amount,
        categoryId,
      },
    });

    if (budget.count === 0) {
      return res
        .status(404)
        .json({ error: "Budget not found or not authorized" });
    }

    res.json({ message: "Budget updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Delete a budget
budgetRouter.delete("/budget/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const budget = await prisma.budget.deleteMany({
      where: { id: parseInt(id), userId },
    });

    if (budget.count === 0) {
      res.status(404).json({ error: "Budget not found " });
    }

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete budget" });
  }
});

module.exports = budgetRouter;
