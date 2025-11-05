const Student = require('../models/Student')

exports.list = async (req, res) => {
  try {
    const { q } = req.query
    const filter = q
      ? { $or: [{ name: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }, { course: new RegExp(q, 'i') }] }
      : {}
    const students = await Student.find(filter).sort({ createdAt: -1 })
    res.json({ students })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.count = async (req, res) => {
  try {
    const count = await Student.countDocuments()
    res.json({ count })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.get = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) return res.status(404).json({ message: 'Not found' })
    res.json({ student })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.create = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body
    if (!name || !email || !phone || !course) return res.status(400).json({ message: 'All fields are required' })
    const exists = await Student.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already exists' })
    const student = await Student.create({ name, email, phone, course })
    res.status(201).json({ student })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.update = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, course },
      { new: true, runValidators: true }
    )
    if (!student) return res.status(404).json({ message: 'Not found' })
    res.json({ student })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.remove = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}
