const supabase = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
try {
const { name, email, password, role } = req.body;


const hashedPassword = await bcrypt.hash(password, 10);


const { data, error } = await supabase.from('usersss').insert([
{ name, email, password: hashedPassword, role: role || 'customer' }
]);


if (error) return res.status(400).json({ error: error.message });


res.json({ message: 'User registered successfully' });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};

exports.login = async (req, res) => {
try {
const { email, password } = req.body;


const { data: user, error } = await supabase
.from('usersss')
.select('*')
.eq('email', email)
.single();


if (error || !user)
return res.status(400).json({ msg: 'User not found' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch)
return res.status(400).json({ msg: 'Invalid password' });


const token = jwt.sign(
{ id: user.id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: '1d' }
);

res.json({ token, role: user.role, name: user.name });
} catch (err) {
res.status(500).json({ error: 'Server error' });
}
};