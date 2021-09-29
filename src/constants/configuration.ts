export const DEFAULT_TIME_TO_RESPOND = 15;
export const DEFAULT_OPEN_QUESTION_TIME_TO_RESPOND = 180;

// to be able to split quiz according to different categories
export enum QuestionCategory {
  JAVASCRIPT = 'JavaScript',
  HTML = 'HTML',
  CSS = 'CSS',
  GIT = 'GIT',
  COMMON = 'COMMON',
  ENGLISH = 'ENGLISH',
}

export const QUESTION_AMOUNT_PER_CATEGORY = {
  [QuestionCategory.JAVASCRIPT]: 10, //20,
  [QuestionCategory.HTML]: 5,// 10,
  [QuestionCategory.CSS]: 5, // 7,
  [QuestionCategory.GIT]: 0,//3,
};

// to be able to split task just for quiz or as a coding task(at least for now)
export enum TaskCategory {
  QUIZ = 'Quiz',
  CODING = 'Coding',
};

export const BASE_APP_URL = process.env.PLATFORM_BASE_URL || '';
