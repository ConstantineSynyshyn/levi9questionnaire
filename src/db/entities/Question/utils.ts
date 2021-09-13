import { v4 } from "uuid";
import {
  QuestionCategory,
  QuestionWithOptions,
  QuestionWithOptionsList,
} from "../../../types/question";
import { ImportQuestionType, ImportQuestionTypeFile } from "./types";

export const mapImportFileWithQuestionScheme = (
  content: ImportQuestionTypeFile
): QuestionWithOptionsList =>
  [...content].map((initialQuestion: ImportQuestionType) => {
    const {
      text,
      options,
      category = QuestionCategory.JAVASCRIPT,
      difficultyLevel = 0,
      data = "",
    } = initialQuestion;
    let questionRelatedProps = {
      questionText: text,
      ...(data ? { data } : undefined),
    };
    if (text.includes("\n")) {
      const lines = text.split("\n");
      questionRelatedProps = {
        questionText: lines.shift() as string,
        data: lines.join("\n"),
      };
    }
    return {
      category,
      difficultyLevel,
      id: v4(),
      options: convertPlainOptionsToObject(options),
      ...questionRelatedProps,
    };
  });

export const convertPlainOptionsToObject = (
  options: ImportQuestionType["options"]
): QuestionWithOptions["options"] =>
  [...options].map((text: string, index: number) => ({
    text,
    id: v4(),
    isCorrect: index === 0,
  }));
