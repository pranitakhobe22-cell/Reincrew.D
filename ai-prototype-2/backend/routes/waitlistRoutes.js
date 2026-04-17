const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const supabase = require('../utils/supabaseClient');

const waitlistFile = path.join(__dirname, '..', 'waitlist.json');

router.post('/', async (req, res) => {
  const { email } = req.body;
  const start = Date.now();

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  try {
    // 1. Check if email already exists in Supabase
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existing) {
      return res.status(400).json({ success: false, message: 'You are already on the waitlist!' });
    }

    // 2. Insert into Supabase
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (insertError) {
      // If table doesn't exist, try to create it or log error
      console.error('[Supabase] Insert Error:', insertError);
      throw insertError;
    }
    
    const duration = Date.now() - start;
    console.log(`[Waitlist] Added ${email} to Supabase in ${duration}ms`);
    
    res.json({ success: true, message: 'Added to waitlist!' });
  } catch (e) {
    console.error('Error handling waitlist with Supabase:', e);
    
    // Fallback to local file if Supabase fails (optional, but safer for now)
    try {
      let waitlist = [];
      if (fs.existsSync(waitlistFile)) {
        const data = fs.readFileSync(waitlistFile, 'utf8');
        waitlist = JSON.parse(data);
      }
      if (!waitlist.some(entry => entry.email === email)) {
        waitlist.push({ email, timestamp: new Date().toISOString() });
        fs.writeFileSync(waitlistFile, JSON.stringify(waitlist, null, 2));
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }

    res.status(500).json({ success: false, message: 'Server error saving waitlist data' });
  }
});

module.exports = router;
