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

categoryRouter.put("/category/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Delete a category
categoryRouter.delete("/category/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = categoryRouter;
