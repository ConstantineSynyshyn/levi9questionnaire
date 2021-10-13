import React from "react"
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import LastPageIcon from "@material-ui/icons/LastPage"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
)

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (
  props: TablePaginationActionsProps
) => {
  const classes = useStyles()
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = React.useCallback((
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0)
  }, [])

  const handleBackButtonClick = React.useCallback((
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page === 0 ? 0 : page - 1)
  }, [page])

  const handleNextButtonClick = React.useCallback((
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1)
  }, [page])

  const handleLastPageButtonClick = React.useCallback((
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }, [count, rowsPerPage])
  const isFirstPage = page === 0
  const isLastPage = page >= (Math.ceil(count / rowsPerPage) - 1)
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={isFirstPage}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={isFirstPage}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={isLastPage}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={isLastPage}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

export default TablePaginationActions
