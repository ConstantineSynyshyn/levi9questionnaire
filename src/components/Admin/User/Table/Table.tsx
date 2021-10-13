import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import BaseTable from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableFooter from "@material-ui/core/TableFooter"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import { OrderDirection } from "@constants/configuration"
import SortableCell from "./components/SortableCell"
import Pagination from "./Pagination"
import { ColumnsConfigType } from "./types"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

interface Props {
  columns: ColumnsConfigType
  data: ReadonlyArray<any>
  onRowClick?: (row: any) => void
  onOrderClick?: (fieldName: string) => void
  sortBy?: string
  direction?: OrderDirection
  count: number
  currentPage: number
  handlePage: (page: number) => void
  rowPerPage: number
}

const Table: React.FC<Props> = (props) => {
  const classes = useStyles()
  const {
    columns,
    data,
    onRowClick,
    sortBy,
    onOrderClick,
    direction,
    handlePage,
    rowPerPage,
    count = 0,
    currentPage = 0,
  } = props
  return (
    <TableContainer component={Paper}>
      <BaseTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ title, sortable = false, fieldName }) => {
              if (sortable) {
                return (
                  <SortableCell
                    title={title}
                    active={sortBy === fieldName}
                    onClick={() => onOrderClick && onOrderClick(fieldName)}
                    direction={direction}
                    key={title}
                  />
                )
              }
              return (
                <TableCell align="left" key={title}>
                  {title}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={(e) => {
                e.preventDefault()
                if (onRowClick) {
                  onRowClick(row)
                }
              }}
            >
              {columns.map((column) => (
                <TableCell align="left" key={column.fieldName}>
                  {row[column.fieldName]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Pagination
            count={count}
            rowsPerPage={rowPerPage}
            handlePage={handlePage}
            currentPage={currentPage}
          />
        </TableFooter>
      </BaseTable>
    </TableContainer>
  )
}

export default React.memo(Table)
