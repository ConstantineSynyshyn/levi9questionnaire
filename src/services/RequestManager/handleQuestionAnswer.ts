import formidable from "formidable";

import { storeAnswers } from "@db/entities/User";
import {
  getCurrentQuestion,
  getQuizQuestionInfo,
} from "@services/QuestionManager/manageQuiz";
import { NextApiRequest, NextApiResponse } from "next";

const handleQuestionAnswer = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { currentQuestion, total } = await getCurrentQuestion();
  const form = new formidable.IncomingForm();
  if (!currentQuestion) {
    return res
      .status(400)
      .json({ status: "error", message: "There are no more active questions" });
  }
  form.parse(req, async (err: any, fields: any, files: any) => {
    if (fields?.answer) {
      const answers = {
        id: currentQuestion?.id!,
        internalQuestionId: currentQuestion?.internalQuestionId!,
        answer: JSON.parse(fields?.answer),
      };
      console.log('answers', answers);
      await storeAnswers(
        [answers],
        total === currentQuestion?.internalQuestionId
      );
      const nextQuestion = await getQuizQuestionInfo();
      return res.status(200).json(nextQuestion);
    }
    return res
      .status(400)
      .json({ status: "error", message: "Please, fill choose the answer" });
  });
};

export default handleQuestionAnswer;
