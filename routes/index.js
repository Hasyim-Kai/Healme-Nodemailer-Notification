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
         port: 465,
         secure: true,
         auth: {
            user: '191111006@mhs.stiki.ac.id',
            pass: process.env.EMAIL_PWD
         },
         tls: {
            // secureProtocol: "TLSv1_method"
            rejectUnauthorized: true
         },
      });

      const text = `<p style="color:#fd5aff;
  font-size:6em;
  font-weight:500;
  text-align:center;
  margin:0;">Hi from Healme</p>
  <p style="font-size:2em;text-align:center;color:#3D3D3D;">A New Consultation Schedule has Created!</p>
  <p style="font-size:2em;text-align:center;color:#3D3D3D;margin:2rem 0;">Check it now, only on Healme</p>`

      const mailOptions = {
         from: '191111006@mhs.stiki.ac.id',
         to: req.body.users_email,
         subject: 'New Consultation Schedule',
         html: text
      };

      if (!Array.isArray(req.body.users_email)) throw { message: "The Parameter should be an Email inside an Array" };
      await transporter.sendMail(mailOptions, (err, info) => {
         if (err) throw err;
         // if (err) throw { real_message: err.message, message: 'Something Went Wrong in API Server' };
         res.status(200).json({ status: true, message: 'Berhasil Mengirimkan Email Yang Mulia' })
      });
   }
   catch (error) {
      res.status(400).json({ status: false, message: error.message })
   }
})

module.exports = router;