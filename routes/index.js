const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const router = express.Router()

router.get('/create-consultation', async (req, res) => {
   try {
      res.status(200).json({ status: true, message: 'Selamat datang di API Healme' })
   }
   catch (error) {
      res.status(400).json({ status: false, message: error.message })
   }
})

router.post('/create-consultation', async (req, res) => {
   try {
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: '191111006@mhs.stiki.ac.id',
            pass: process.env.EMAIL_PWD
         }
      });

      const text = `<h1>Welcome</h1><p>That was easy!</p>`

      const mailOptions = {
         from: '191111006@mhs.stiki.ac.id',
         to: req.body.users_email,
         subject: 'Sending Email using Nodejs Nodemailer',
         html: text
      };

      await transporter.sendMail(mailOptions, (err, info) => {
         if (err) throw err;
         res.status(200).json({ status: true, message: 'Berhasil Mengirimkan Email Yang Mulia' })
      });
   }
   catch (error) {
      res.status(400).json({ status: false, message: error.message })
   }
})

module.exports = router;