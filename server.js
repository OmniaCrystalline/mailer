/** @format */

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
    console.log('phone, theme, name', phone, theme, name)
    const responseEmail = await transporter.sendMail({
      from: process.env.MAIL,
      to: process.env.RECEIVER,
      text: `name: ${name} theme:${theme} phone:${phone}`,
      html: `<p>name: ${name} theme:${theme} phone:${phone}</p>`,
    });
    console.log('responseEmail', responseEmail)
    res.status(200).json({ responseEmail });
  } catch (err) {
    console.log('err', err, err?.message)
    res.status(400).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
