import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserEmail } from '@services/utils';
import * as path from "path";

import { createQuestionsByInputFile } from "@db/entities/Question";

const handleQuestionUpload = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const email = await getUserEmail(req);
  if (!email) {
    return res.status(401).json({
      message: 'authorisation required',
    });
  }
  const form = new formidable.IncomingForm();
  form.parse(req, async (err: any, fields: any, files: any) => {
    if (files?.file) {
      try {
        const buffer = fs.readFileSync(files.file.path);
        const result = await createQuestionsByInputFile(
          JSON.parse(buffer.toString())
        );
        return res.status(201).json({ size: result?.length });
      } catch {
        return res.status(400).json({
          status: "Fail",
          message: "Invalid json",
        });
      }
    }
    return res.status(400).json({
      status: "Fail",
      message: "There was an error parsing the files",
    });
  });
};

export default handleQuestionUpload;
