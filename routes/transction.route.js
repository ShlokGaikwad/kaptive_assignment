const express = require("express");
const authenticateToken = require("../middleware/auth.middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const transactionRouter = express.Router();

transactionRouter.post("/transaction", authenticateToken, async (req, res) => {
  const { amount, type, categoryId } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        categoryId,
        userId: req.user.id,
      },
    });
    res.status(201).send(transaction);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

transactionRouter.get("/transactions", authenticateToken, async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      include: { category: true },
    });
    res.send(transactions);
  } catch (err) {
    res.status(400).send(err);
  }
});

transactionRouter.put(
  "/transaction/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const { amount, type, categoryId } = req.body;
    const userId = req.user.userId;

    try {
      const transaction = await prisma.transaction.updateMany({
        where: { id: parseInt(id), userId },
        data: { amount, type, categoryId },
      });

      if (transaction.count === 0) {
        return res
          .status(404)
          .json({ error: "Transaction not found or not authorized" });
      }

      res.json({ message: "Transaction updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update transaction" });
    }
  }
);

// Delete a transaction
transactionRouter.delete(
  "/transaction/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
      const transaction = await prisma.transaction.deleteMany({
        where: { id: parseInt(id), userId },
      });

      if (transaction.count === 0) {
        return res
          .status(404)
          .json({ error: "Transaction not found or not authorized" });
      }

      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete transaction" });
    }
  }
);

module.exports = transactionRouter;
