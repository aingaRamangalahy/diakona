import { Request, Response } from "express";
import UserModel, { User } from "../models/userModel";

export const vote = async (req: Request, res: Response) => {
  try {
    console.log('the bode: ', req.body);
    const bulkUpdateOperations = req.body.map((updatedUser: User) => {
      const { _id, vote } = updatedUser;
      // Create a bulk update operation for each document
      return {
        updateOne: {
          filter: { _id: _id },
          update: { $set: { vote: vote } },
        },
      };
    });
    // Use bulkWrite to execute multiple update operations
    const result = await UserModel.bulkWrite(bulkUpdateOperations);
    return res.status(200).json({
      success: true,
      content: result
    })
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      success: false,
      content: error
    })
  }
};
