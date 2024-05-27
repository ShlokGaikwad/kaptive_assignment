const express = require("express");
const authenticateToken = require("../middleware/auth.middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const reportRouter = express.Router();

reportRouter.get("/monthly", authenticateToken, async (req, res) => {
  const { month, year } = req.query;

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.id,
        date: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${parseInt(month) + 1}-01`),
        },
      },
      include: { category: true },
    });

    const report = transactions.reduce(
      (acc, transaction) => {
        acc.total += transaction.amount;
        acc.categories[transaction.category.name] =
          (acc.categories[transaction.category.name] || 0) + transaction.amount;
        return acc;
      },
      { total: 0, categories: {} }
    );

    res.send(report);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

reportRouter.get("/category-wise", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch all transactions for the user
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
    });

    // Aggregate the total amount per category
    const categoryReport = transactions.reduce((acc, transaction) => {
      const categoryName = transaction.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += transaction.amount;
      return acc;
    }, {});

    res.json(categoryReport);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = reportRouter;
