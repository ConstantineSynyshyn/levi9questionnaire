import { v4 } from "uuid";

import {
  TaskCategory,
  COURSE_QUESTIONS_CONFIG,
  MAX_SCORE_VALUE,
  CURRENT_COURSE,
} from "@constants/configuration";
import {
  QuestionWithOptions,
  QuestionWithOptionsList,
} from "../../../types/question";
import { ImportQuestionType, ImportQuestionTypeFile } from "./types";

export const mapImportFileWithQuestionScheme = (
  content: ImportQuestionTypeFile
): QuestionWithOptionsList => {
  const defaultCategory =
    COURSE_QUESTIONS_CONFIG[CURRENT_COURSE]?.categories?.[0] || "Unknown";
  return [...content]
    .filter(
      (initialQuestion: ImportQuestionType) =>
        initialQuestion.difficultyLevel === undefined ||
        initialQuestion.difficultyLevel <= MAX_SCORE_VALUE
    )
    .map((initialQuestion: ImportQuestionType) => {
      const {
        text,
        options,
        category = defaultCategory,
        difficultyLevel = 0,
        data = "",
        taskType = TaskCategory.QUIZ,
        courseName = CURRENT_COURSE,
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
        difficultyLevel:
          typeof difficultyLevel === "string"
            ? parseInt(difficultyLevel)
            : difficultyLevel,
        id: v4(),
        taskType,
        courseName,
        options: convertPlainOptionsToObject(options),
        ...questionRelatedProps,
      };
    });
};

export const convertPlainOptionsToObject = (
  options: ImportQuestionType["options"]
): QuestionWithOptions["options"] =>
  [...options].map((text: string, index: number) => ({
    text,
    id: v4(),
    isCorrect: index === 0,
  }));
