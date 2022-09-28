import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = UserModel({
      ...req.body,
      passwordHash: hash,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      "secret123",
      {
        expiresIn: "1h",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "Login or password is incorrect" });

    const isValidPassword = await bcrypt.compare(
      password,
      user._doc.passwordHash
    );
    if (!isValidPassword)
      return res
        .status(404)
        .json({ message: "Login or password is incorrect" });

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      "secret123",
      {
        expiresIn: "1h",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User undefined",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
