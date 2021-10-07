import { Container } from "@material-ui/core"
import { GetServerSideProps } from "next"
import React from "react"

import { Page } from "../../types/page"
import AutoRegistration from "@components/AutoRegistration"
import { handleAutoRegistration } from "@services/RequestManager/handleAutoRegistration"
import { getUserByEmail } from "@db/entities/User"
import { getIsValidUserEmail } from "@utils/validateUserEmail"

interface Props {
  email: string
  result?: any
  error?: any
}

const Registration: Page<Props> = (props) => {
  return <AutoRegistration {...props} />
}

Registration.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { email = "" } = query
  const candidateEmail = Array.isArray(email) ? email[0] : email
  const isValidUserEmail = getIsValidUserEmail(candidateEmail)

  if (!isValidUserEmail) {
    return {
      props: {
        error: `Can't create user for ${candidateEmail}.`,
      },
    }
  }

  const user = await getUserByEmail(candidateEmail)

  if (user.isAdmin) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  const result = await handleAutoRegistration(candidateEmail)

  if (result instanceof Error) {
    return {
      props: {},
    }
  }

  return {
    props: { email },
  }
}

export default Registration
