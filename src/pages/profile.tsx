import React from "react"

import Container from "@material-ui/core/Container"
import { Page, Profile } from "@types"
import ProfileForm from "@components/ProfileForm"
import useOnWindowLeave from "@hooks/useOnWindowLeave"

const ProfilePage: Page = () => {
  useOnWindowLeave()
  const handleProfileSubmit = (profile: Partial<Profile>) => {
    console.log("Save additional profile info", profile)
  }
  return (
    <>
      <ProfileForm onSubmit={handleProfileSubmit}></ProfileForm>
    </>
  )
}

ProfilePage.getLayout = (page) => (
  <Container maxWidth="md" disableGutters>
    {page}
  </Container>
)

ProfilePage.requireAuth = true

export default ProfilePage
