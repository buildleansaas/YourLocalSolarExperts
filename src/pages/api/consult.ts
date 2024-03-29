// pages/api/sendForm.ts

import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  const { name, email, phone, referral, howCanIHelp } = JSON.parse(req.body);

  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "au.witherow@gmail.com",
        pass: "fbtworxdlosrowse",
      },
      secure: true,
    });

    await transporter.sendMail({
      from: "au.witherow@gmail.com",
      to: "au.witherow@gmail.com",
      subject: `[Your Local Solar Experts] Lead: ${name}.`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        comments: ${howCanIHelp}
        referral: ${referral}
      `,
    });

    return res.status(200).send("ok");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
