const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.sendStatus(401);


try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured');
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
} catch (err) {
res.sendStatus(403);
}
};