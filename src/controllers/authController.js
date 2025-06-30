const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const uid = `UID${
      new Date().toLocaleDateString().replace(/\//g, "") + nanoid(10)
    }`

    const userId = uid.toUpperCase();

    const existingEmail = await prisma.users.findUnique({
      where: { email },
    });

    if (existingEmail)
      return res.status(400).json({ message: "Email already exist!" });

    const hashedPw = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        id: userId,
        fullname: fullname,
        email: email,
        password: hashedPw,
      },
    });

    res
      .status(200)
      .json({
        message: "Register success",
        user: { id: user.id, fullname: user.fullname, email: user.email },
      });
    } catch (e) {
      console.error(e);
    res.status(500).json({ error: "Internal server error!" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(req.body);

    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    const validPw = await bcrypt.compare(password, user.password);

    if(!validPw) return res.status(401).json({ message: "Invalid password!" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    if (user && validPw) {
      res.status(200).json({ id: user.id, email: user.email, token });
      console.log("login successful")
    }
    
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
