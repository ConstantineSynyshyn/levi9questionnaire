import React from "react";

const useOnWindowLeave = (message?: string): void => {
  React.useEffect(() => {
    const beforeunloadHandler = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      return (event.returnValue = message);
    };
    window.addEventListener("beforeunload", beforeunloadHandler);

    return () =>
      window.removeEventListener("beforeunload", beforeunloadHandler);
  }, [message]);
};

export default useOnWindowLeave;
