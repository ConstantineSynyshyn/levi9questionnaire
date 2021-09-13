import { Question, QuestionWithOptions } from "../src/types/question";

export const questionsWithOptionsData: QuestionWithOptions[] = [
  {
    questionText: 'Who do you think will win Best Actress?',
    options: [
      { text: "A1", id: "1", isCorrect: true },
      { text: "B1", id: "2", isCorrect: false },
      { text: "C1", id: "3", isCorrect: false },
      { text: "D1", id: "4", isCorrect: false },
    ],
    id: '111',
    data: 'function getNumber(){\n\treturn;\n}\n\nvar numb = getNumber();\nconsole.log(numb);',
  },
  {
    questionText: 'Best Supporting Actress?',
    options: [
      { text: "A2", id: "5", isCorrect: true },
      { text: "B2", id: "6", isCorrect: false },
      { text: "C2", id: "7", isCorrect: false },
      { text: "D2", id: "8", isCorrect: false },
    ],
    id: '112',
  },
  {
    questionText: 'Best Supporting Actor?',
    options: [
      { text: "A3", id: "9", isCorrect: true },
      { text: "B3", id: "10", isCorrect: false },
      { text: "C3", id: "11", isCorrect: false },
      { text: "D3", id: "12", isCorrect: false },
    ],
    id: '113',
    data: 'var obj = {\n\tmessage: "Hello",\n\tinnerMessage: function() {\n\t\tconsole.log(this.message);\n\t}\n};\n\t\nconsole.log(obj.innerMessage());',
  },
];

export const questionData: Question[] = [
  { id: "1", questionText: "Who do you think will win Best Actress?" },
];
