export const DEFAULT_TIME_TO_RESPOND = 45;
export const DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND = 180;

export enum CourseName {
  FE = "FE",
  QA = "QA",
}

export const CURRENT_COURSE = CourseName.QA;

// to be able to split quiz according to different categories
export enum FEQuestionCategory {
  JAVASCRIPT = "JavaScript",
  HTML = "HTML",
  CSS = "CSS",
  GIT = "GIT",
  COMMON = "COMMON",
  ENGLISH = "ENGLISH",
}

// to be able to split quiz according to different categories
export enum QAQuestionCategory {
  TECH_STACK = "Technology stack",
  GENERAL = "General",
  WORK_PROCESS = "Work Process",
  AUTOMATION = "Test automation and coding",
}

/**
 * @TODO we use QuestionCategory everywhere.
 *        So, to not to change it everywhere, just export correct enum until dynamic implementation
 */
export { QAQuestionCategory as QuestionCategory };

export const QUESTION_AMOUNT_PER_FE_CATEGORY = {
  [FEQuestionCategory.JAVASCRIPT]: 20,
  [FEQuestionCategory.HTML]: 10,
  [FEQuestionCategory.CSS]: 7,
  [FEQuestionCategory.GIT]: 3,
};

export const QUESTION_AMOUNT_PER_QA_CATEGORY = {
  [QAQuestionCategory.GENERAL]: 25,
  [QAQuestionCategory.WORK_PROCESS]: 5,
  [QAQuestionCategory.TECH_STACK]: 3,
  [QAQuestionCategory.AUTOMATION]: 7,
};

/**
 * @TODO we use QuestionCategory everywhere.
 *        So, set correct categories untill dynamic implementation
 */
export const QUESTION_AMOUNT_PER_CATEGORY = QUESTION_AMOUNT_PER_QA_CATEGORY;

/**
 * @TODO, in general, when dynamic implementation, this will be general config where we can pick setting based on course
 *        but ideally, it should be moved on db level and admin should be able to configure that via UI and define current
 *        course
 */
export const COURSE_QUESTIONS_CONFIG = {
  [CourseName.FE]: {
    categories: [
      FEQuestionCategory.JAVASCRIPT,
      FEQuestionCategory.CSS,
      FEQuestionCategory.HTML,
      FEQuestionCategory.GIT,
    ],
    questionsAmountConfig: QUESTION_AMOUNT_PER_FE_CATEGORY,
  },
  [CourseName.QA]: {
    categories: [
      QAQuestionCategory.GENERAL,
      QAQuestionCategory.WORK_PROCESS,
      QAQuestionCategory.TECH_STACK,
      QAQuestionCategory.AUTOMATION,
    ],
    questionsAmountConfig: QUESTION_AMOUNT_PER_QA_CATEGORY,
  },
};

// to be able to split task just for quiz or as a coding task(at least for now)
export enum TaskCategory {
  QUIZ = "Quiz",
  CODING = "Coding",
}

export const BASE_APP_URL = process.env.PLATFORM_BASE_URL || "";

export const MAX_SCORE_VALUE = 3;

export enum OrderDirection {
  ASC = "asc",
  DESC = "desc",
}
