import { Request, Response } from "express";
import UserModel from "../models/userModel";

export const vote = async (req: Request, res: Response) => {
  try {
    console.log('the bode: ', req.body);
    const { users } = req.body;
    const response = await UserModel.updateMany({}, users, { new: true});
    return res.status(200).json({
      success: true,
      content: response
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error
    })
  }
};
