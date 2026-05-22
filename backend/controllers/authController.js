const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // 2. HASH THE PASSWORD
        // '10' is the salt rounds (standard for security/speed balance)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user with the HASHED password, not the plain one
        user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role 
        });

        await user.save();
        res.status(201).json({ message: "User Registered Successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // 2. Compare password (Entered vs Hashed in DB)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // 3. Create JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};