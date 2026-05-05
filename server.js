const express  = require('express');
const { Resend } = require('resend');
const cors     = require('cors');
const path     = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY not set — emails will fail until you add it in Railway Variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  const { fname, lname, phone, appliance, issue } = req.body;

  if (!fname || !lname || !phone || !appliance) {
    return res.status(400).json({ ok: false, message: 'Please fill in all required fields.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ ok: false, message: 'Server email not configured yet.' });
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Alex Appliance Pro <info@alexappliancepro.com>',
      to:   ['info@alexappliancepro.com'],
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
    });

    if (error) {
      console.error('✗ Resend error:', error.message);
      return res.status(500).json({ ok: false, message: 'Failed to send email. Please call us directly at (832) 979-4383.' });
    }

    console.log(`✓ Repair request sent: ${appliance} — ${fname} ${lname}`);
    res.json({ ok: true, message: 'Request sent successfully.' });
  } catch (err) {
    console.error('✗ Mail error:', err.message);
    res.status(500).json({ ok: false, message: 'Failed to send email. Please call us directly at (832) 979-4383.' });
  }
});

app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
