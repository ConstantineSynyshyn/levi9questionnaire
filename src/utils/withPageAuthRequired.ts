import { ROUTES } from "@constants/routes"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/client"

export const withPageAuthRequired =
  (getServerSideCallback?: GetServerSideProps) =>
  async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)
    if (!session) {
      return {
        redirect: {
          destination: ROUTES.AUTH,
          permanent: false,
        },
      }
    }

    return {
      props: {
        ...getServerSideCallback?.(context),
        session,
      },
    }
  }
