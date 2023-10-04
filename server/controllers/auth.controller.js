import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res, next) => {
  try {
    const payload = req.body;

    if (payload.password) {
      payload.password = await bcrypt.hash(
        payload.password,
        Number(process.env.SALT)
      );
    }
    const user = await UserModel.create(payload);
    delete user.password;
    return res.status(201).json({
      status: true,
      message: "SignUp successfully",
      data: user,
    });
  } catch (err) {
    console.log("Error while signUpUser: ", err.message);
    next(err);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const payload = req.body;

    const user = await UserModel.findOne({ email: payload.email }).lean();
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: null,
      });
    }

    const isValidPassword = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        status: false,
        message: "Wrong credentials",
        data: null,
      });
    }

    const token = jwt.sign(
      { email: payload.email, _id: user._id },
      process.env.JWT_SECRET
    );
    const expiryDate = new Date(Date.now() + 3600000);

    delete user.password;
    return res
      .cookie("accessToken", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({
        status: true,
        message: "LogIn successfully",
        data: user,
      });
  } catch (err) {
    console.log("Error while signInUser: ", err.message);
    next(err);
  }
};

export const signInWithGoogle = async (req, res, next) => {
  try {
    const payload = req.body;

    const user = await UserModel.findOne({ email: payload.email }).lean();
    if (user) {
      const token = jwt.sign(
        { email: payload.email, _id: user._id },
        process.env.JWT_SECRET
      );
      const expiryDate = new Date(Date.now() + 3600000);

      delete user.password;
      return res
        .cookie("accessToken", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({
          status: true,
          message: "LogIn successfully",
          data: user,
        });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUserPayload = {
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo
      }
      const newUser = await UserModel.create(newUserPayload);

      const token = jwt.sign(
        { email: payload.email, _id: newUser._id },
        process.env.JWT_SECRET
      );
      const expiryDate = new Date(Date.now() + 3600000);

      delete newUser.password;
      return res
        .cookie("accessToken", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({
          status: true,
          message: "LogIn successfully",
          data: newUser,
        });
    }
  } catch (err) {
    console.log("Error while singInWithGoogle: ", err);
    next(err);
  }
};
