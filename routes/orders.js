const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.post('/', async (req, res) => {
  const { user_id, total, items } = req.body;
  const { error } = await supabase.from('orderss').insert([{ user_id, total, items, status: 'Pending' }]);
  if (error) return res.status(400).json(error);
  res.json({ message: 'Order placed successfully' });
});

router.put('/:id/status', auth, admin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { error } = await supabase.from('orderss').update({ status }).eq('id', id);
  if (error) return res.status(400).json(error);

  res.json({ message: 'Status updated' });
});

router.get('/', auth, async (req, res) => {
  const { data, error } = await supabase.from('orderss').select('*');
  if (error) return res.status(400).json(error);
  res.json(data);
});

module.exports = router;
