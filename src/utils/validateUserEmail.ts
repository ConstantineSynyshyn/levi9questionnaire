const patternValidationFactory =
  (pattern: string | RegExp) =>
  (candidate: string): boolean =>
    pattern instanceof RegExp
      ? pattern.test(candidate)
      : new RegExp(pattern, "u").test(candidate)

const validUserEmailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/u

export const isValidUserEmail = patternValidationFactory(validUserEmailPattern)
