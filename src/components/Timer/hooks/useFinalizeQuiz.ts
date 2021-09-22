import { useCallback, useState } from 'react';
import { useRouter } from "next/router";

import { FINALIZE_QUIZ } from "@constants/apiRoutes";
import { ROUTES } from "@constants/routes";

type FinalizeQuizFn = () => void;

const useFinalizeQuiz = (): FinalizeQuizFn => {
  const route = useRouter();
  const [isEnded, setIsEnded] = useState(false);
  return useCallback(() => {
    if (isEnded) {
      return;
    }
    setIsEnded(true);
    fetch(FINALIZE_QUIZ, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        route.push(ROUTES.CONGRATULATION);
      })
      .catch((error) => {
        console.log("can't finalize quiz", error);
      });
  }, [route, isEnded]);
};

export default useFinalizeQuiz;
