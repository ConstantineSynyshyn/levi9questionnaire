import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BaseTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { ColumnsConfigType, Data } from "./types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface Props {
  columns: ColumnsConfigType;
  data: ReadonlyArray<any>;
  onRowClick?: (row: any) => void;
}

const Table: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { columns, data, onRowClick } = props;
  return (
    <TableContainer component={Paper}>
      <BaseTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align="left" key={column.title}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={(e) => {
                e.preventDefault();
                if (onRowClick) {
                  onRowClick(row);
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
      </BaseTable>
    </TableContainer>
  );
};

export default React.memo(Table);
