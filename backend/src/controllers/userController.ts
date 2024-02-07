import { Request, Response } from "express";
import UserModel from "../models/userModel";

interface ExtRequext extends Request {
  file?: Express.Multer.File
}

export const importUsers = async (req: ExtRequext, res: Response) => {
  console.log("the file", req.file)
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "Please provide a file path." });
  }

  try {
    // Read Excel file and convert to JSON using Mongoose model
    // Example: const excelData = await ExcelModel.find();
    // Modify the code based on your model and logic

    res.json({ message: "import successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
