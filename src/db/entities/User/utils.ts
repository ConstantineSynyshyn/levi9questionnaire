import { TaskCategory } from "@constants/configuration";
import { QuestionWithOptionsList } from "../../../types/question";
import { InitialUseQuestions } from "./types";

export const prepareInitialQuestion = (
  questions: QuestionWithOptionsList
): InitialUseQuestions =>
  [...questions].reduce((list: InitialUseQuestions, item, index) => {
    const {
      category,
      difficultyLevel,
      id,
      options,
      questionText,
      data,
      taskType = TaskCategory.QUIZ,
    } = item;
    return [
      ...list,
      {
        category,
        difficultyLevel,
        id,
        questionText,
        data,
        taskType,
        options: JSON.parse(JSON.stringify(options)),
        internalQuestionId: index + 1,
      },
    ];
  }, []);
