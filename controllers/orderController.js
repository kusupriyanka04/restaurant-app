const supabase = require('../config/db');


exports.placeOrder = async (req, res) => {
const { user_id, total } = req.body;


try {
    const { error } = await supabase.from('orderss').insert([
      { user_id, total, items, status: 'Pending' }
    ]);

    if (error) return res.status(400).json(error);
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};