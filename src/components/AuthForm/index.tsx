import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import SwipeableViews from "react-swipeable-views"

import TabPanel from "./TabPanel"
import AuthLinkRequest from "./AuthLinkRequest"
import PlainAuthForm from "./PlainAuthForm"
import theme from "src/styles/theme"

const AuthForm: React.FC = () => {
  const [value, setValue] = React.useState<number>(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: unknown) => {
    setValue(newValue as number)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="tabs"
        >
          <Tab label="Send me an invitation link" />
          <Tab label="I know my credentials" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Box>
            <AuthLinkRequest />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <PlainAuthForm />
          </Box>
        </TabPanel>
      </SwipeableViews>
    </Container>
  )
}

export default React.memo(AuthForm)
