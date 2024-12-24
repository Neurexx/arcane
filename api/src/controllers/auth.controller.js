// const User = require('../models/user.model');
// const Student = require('../models/student.model');
// const Teacher = require('../models/teacher.model');
// const jwt = require('jsonwebtoken');
import User from '../models/user.model';
import Student from '../models/student.model';
import Teacher from '../models/teacher.model';
import jwt from 'jsonwebtoken';

class AuthController {
  async register(req, res) {
    try {
      const { email, password, role, ...profileData } = req.body;

      // Create profile based on role
      let profile;
      if (role === 'student') {
        profile = await Student.create(profileData);
      } else if (role === 'teacher') {
        profile = await Teacher.create(profileData);
      }

      // Create user
      const user = await User.create({
        email,
        password,
        role,
        profile: profile._id
      });

      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email }).populate('profile');
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role, profileId: user.profile._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}