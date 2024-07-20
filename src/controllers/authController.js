

import User from '../models/user';
import * as userService from '../services/authSevice';


export const register = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    const user = new User({ username, password, isAdmin });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.loginUser(username, password);

    res.status(200).cookie("token", token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
      secure: false, 
      httpOnly: true, 
      sameSite: "strict", 
    }).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: error.message || "Error In Login API",
    });
  }
};
