import { useEffect, useState } from "react";

import { ROUTES } from "@constants/routes";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const useHandleAutoRegistration = (hash: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    const handleRequest = async () => {
      const response: ReturnType<typeof signIn> = await signIn("hash", {
        hash,
        redirect: false,
      });
      setIsLoading(false);
      if (response && response?.status === 200 && !response?.error) {
        router.push(ROUTES.INDEX);
        return;
      }
      if (response?.error) {
        setError(response?.error);
      }
    };
    handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [isLoading, error];
};

export default useHandleAutoRegistration;
