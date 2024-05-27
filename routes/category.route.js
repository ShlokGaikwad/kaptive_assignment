const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authenticateToken = require("../middleware/auth.middleware");
const prisma = new PrismaClient();

const categoryRouter = express.Router();

// routes/finance.js
categoryRouter.get("/categories", authenticateToken, async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.send(categories);
  } catch (err) {
    res.status(400).send(err);
  }
});

// routes/finance.js
categoryRouter.post("/category", authenticateToken, async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = categoryRouter;
