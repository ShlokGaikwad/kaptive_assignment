const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(4);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).send("Email or password is wrong");
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    res.status(400).send("Invalid password");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ msg: "login successful", token });
});

module.exports = userRouter;
