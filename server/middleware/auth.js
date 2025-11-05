const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async function (req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ message: 'No token' })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('_id name email')
    if (!user) return res.status(401).json({ message: 'User not found' })
    req.user = { id: user._id, name: user.name, email: user.email }
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
