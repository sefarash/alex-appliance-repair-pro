const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Validate SMTP config on startup so missing vars are obvious in logs
const SMTP_HOST = process.env.SMTP_HOST || 'mail.privateemail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = process.env.SMTP_PORT ? SMTP_PORT === 465 : true;

console.log(`SMTP config — host:${SMTP_HOST} port:${SMTP_PORT} secure:${SMTP_SECURE} user:${SMTP_USER || 'MISSING'} pass:${SMTP_PASS ? '***set***' : 'MISSING'}`);
if (!SMTP_USER || !SMTP_PASS) {
  console.warn('⚠️  SMTP_USER or SMTP_PASS not set — emails will fail until you add them in Railway Variables');
}

const transporter = nodemailer.createTransport({
  host:   SMTP_HOST,
  port:   SMTP_PORT,
  secure: SMTP_SECURE,
  auth:   { user: SMTP_USER, pass: SMTP_PASS },
  tls:    { rejectUnauthorized: false },
});

app.post('/api/contact', async (req, res) => {
  const { fname, lname, phone, appliance, issue } = req.body;

  if (!fname || !lname || !phone || !appliance) {
    return res.status(400).json({ ok: false, message: 'Please fill in all required fields.' });
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('Cannot send email — SMTP credentials missing.');
    return res.status(500).json({ ok: false, message: 'Server email not configured yet.' });
  }

  const mailOptions = {
    from:    `"Alex Appliance Pro Website" <${SMTP_USER}>`,
    to:      'info@alexappliancepro.com',
    subject: `New Repair Request — ${appliance} (${fname} ${lname})`,
    text: [
      `Name:      ${fname} ${lname}`,
      `Phone:     ${phone}`,
      `Appliance: ${appliance}`,
      `Issue:     ${issue || 'Not specified'}`,
    ].join('\n'),
    html: `
      <table style="font-family:sans-serif;font-size:15px;color:#2C1A0A;border-collapse:collapse;width:100%;max-width:480px">
        <tr><td colspan="2" style="background:#C17A3A;padding:16px 20px;color:#fff;font-size:18px;font-weight:600">
          New Repair Request
        </td></tr>
        <tr><td style="padding:12px 20px;border-bottom:1px solid #eee;width:120px;color:#9A6B3E">Name</td>
            <td style="padding:12px 20px;border-bottom:1px solid #eee">${fname} ${lname}</td></tr>
        <tr><td style="padding:12px 20px;border-bottom:1px solid #eee;color:#9A6B3E">Phone</td>
            <td style="padding:12px 20px;border-bottom:1px solid #eee">${phone}</td></tr>
        <tr><td style="padding:12px 20px;border-bottom:1px solid #eee;color:#9A6B3E">Appliance</td>
            <td style="padding:12px 20px;border-bottom:1px solid #eee">${appliance}</td></tr>
        <tr><td style="padding:12px 20px;color:#9A6B3E;vertical-align:top">Issue</td>
            <td style="padding:12px 20px">${issue || 'Not specified'}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✓ Repair request sent: ${appliance} — ${fname} ${lname}`);
    res.json({ ok: true, message: 'Request sent successfully.' });
  } catch (err) {
    console.error('✗ Mail error:', err.message);
    res.status(500).json({ ok: false, message: 'Failed to send email. Please call us directly at (832) 979-4383.' });
  }
});

app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
