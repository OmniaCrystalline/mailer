/** @format */

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const { phone, theme, name } = req.body;
    const responseEmail = await transporter.sendMail({
      from: process.env.MAIL,
      html: `name: ${name} theme:${theme} phone:${phone}`,
    });
    res.status(200).json({ responseEmail });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});