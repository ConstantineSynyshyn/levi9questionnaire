import React from "react";
import { getSession } from "next-auth/client";

import type { Page } from "../types/page";

const IndexPage: Page = () => {
  return (
    <div>
      Here, when user is authenticated and authorized you can rdirect him to
      quiz! :)
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default IndexPage;
