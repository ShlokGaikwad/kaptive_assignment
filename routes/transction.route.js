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

module.exports = transactionRouter;
