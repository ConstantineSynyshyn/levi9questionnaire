import React from "react"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"

import TablePaginationActions from "./TablePaginationActions"

const selectProps = {
  inputProps: { "aria-label": "rows per page" },
  native: true,
}

interface Props {
  rowsPerPage: number
  count: number
  currentPage: number
  handlePage: (page: number) => void
}

const Pagination: React.FC<Props> = (props) => {
  const { count, rowsPerPage, currentPage, handlePage } = props
  const handleChangePage = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      handlePage(newPage)
    },
    [handlePage]
  )

  return (
    <TableRow>
      <TablePagination
        labelRowsPerPage=""
        rowsPerPageOptions={[]}
        colSpan={3}
        count={count}
        rowsPerPage={rowsPerPage}
        page={(currentPage)}
        SelectProps={selectProps}
        onPageChange={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </TableRow>
  )
}

export default Pagination
