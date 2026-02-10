const generateToken = require("../config/jwt");
const bcrypt = require(`bcryptjs`);
const User = require('../models/userSchema');

exports.signup = async (req, res) => {
  try {
    const { role, email, password, rollNumber, adminId, adminSecret } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (role === "student" && !rollNumber) {
      return res.status(400).json({ message: "Roll number required" });
    }

    if (role === "admin" && !adminId) {
      return res.status(400).json({ message: "Admin ID required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      role,
      email,
      rollNumber,
      adminId,
      password: hashedPassword
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { role, email, password, adminId } = req.body;
    const query = { role, email };

    if (role === "admin") query.adminId = adminId;

    const user = await User.findOne(query);
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid Credentials" });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};