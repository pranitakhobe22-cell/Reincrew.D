const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const waitlistFile = path.join(__dirname, '..', 'waitlist.json');

router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  let waitlist = [];
  if (fs.existsSync(waitlistFile)) {
    try {
      const data = fs.readFileSync(waitlistFile, 'utf8');
      waitlist = JSON.parse(data);
    } catch (e) {
      console.error('Error reading waitlist.json:', e);
      // Proceed with empty list if file is corrupt
    }
  }

  // Prevent duplicates
  if (waitlist.some(entry => entry.email === email)) {
    return res.status(400).json({ success: false, message: 'You are already on the waitlist!' });
  }

  waitlist.push({
    email,
    timestamp: new Date().toISOString()
  });

  try {
    fs.writeFileSync(waitlistFile, JSON.stringify(waitlist, null, 2));
    res.json({ success: true, message: 'Added to waitlist!' });
  } catch (e) {
    console.error('Error writing to waitlist.json:', e);
    res.status(500).json({ success: false, message: 'Server error saving waitlist data' });
  }
});

module.exports = router;
