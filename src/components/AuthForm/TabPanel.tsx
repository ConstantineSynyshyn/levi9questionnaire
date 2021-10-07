import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

type Props = {
  value: number
  index: number
}

const TabPanel: React.FC<Props> = (props) => {
  const { children, value, index } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default TabPanel
