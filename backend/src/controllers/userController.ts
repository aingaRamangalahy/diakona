import { Request, Response } from "express";
import UserModel from "../models/userModel";
import xlsx from "node-xlsx";
import { cwd } from "process";
import path from "path";

interface ExtRequest extends Request {
  file?: Express.Multer.File;
}

export const importUsers = async (req: ExtRequest, res: Response) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: "Please provide a file path." });
  }
  
  if (!file.originalname.endsWith(".xlsx")) {
    
    return res.status(401).json({ error: "Please provide an xlsx file." });
  }
  try {
      const filePath = path.join(cwd(), "uploads", file.filename);
      const workSheetsFromFile = xlsx.parse(filePath);
      // Assuming the first sheet is the one of interest
      const sheetData = workSheetsFromFile[0].data;
      // Extract keys from the first array
      const keys = sheetData[0];

      // Process the rest of the arrays and build an array of objects
      const processedData = sheetData.slice(1).map((item) => {
        const obj = {} as any;
        keys.forEach((key, index) => {
          obj[key] = item[index];
        });
        return obj;
      });

      const existingUsers = await UserModel.find({});
      if (existingUsers.length > 0) {
        await UserModel.deleteMany({});
      }

      const results = await UserModel.insertMany(processedData)
      // Implement your logic to save data to the user's database
    return res.status(200).json({ success: true, content: results });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({ success: true, content: users })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
