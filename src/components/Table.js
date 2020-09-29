import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { StyledTableCell, StyledTableRow, useStyles } from "./TableStyles"
import TablePaginationActions from "./Pagination";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";




export default function TableViewWithAction(props) {
  const classes = useStyles();
  const {
    headers,
    rows,
    actions
  } = props;

  const customColumnStyle = (minWidth) => {
    return {
      wordWrap: "break-word",
      width: minWidth ? minWidth : 'unset',
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index} >{header.label}</StyledTableCell>
            ))}
            <StyledTableCell key={headers.length}>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell component="td" scope="row">
                No Employees Available
            </StyledTableCell>
            </StyledTableRow>

          ) : (
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  {headers.map((header, index) => {
                    const accesor = header.accesor
                    return <StyledTableCell component="td" scope="row"
                      key={index}
                      style={customColumnStyle(header.minWidth)} >
                      <div>
                        {row[accesor]}
                      </div>
                    </StyledTableCell>
                  })}
                  <StyledTableCell component="td" scope="row"
                    key={index}
                    style={customColumnStyle('20%')} >

                    <div style={{ display: 'flex', width: '40%', justifyContent: 'space-between' }}>
                      {actions.map((item, key) => (
                        <div key={key} onClick={item.action}>
                          <div>{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              )))}
        </TableBody>

      </Table>
    </TableContainer >
  )
}
