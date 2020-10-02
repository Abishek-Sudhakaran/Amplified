import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { StyledTableCell, StyledTableRow } from "./Styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


export default function TableViewWithAction(props) {
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

  const renderActions = (row) => (
    <StyledTableCell component="td" scope="row"
      style={customColumnStyle('20%')} >
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
        size='small'
      >
        {actions.map((item, key) => (
          <Button key={key} onClick={() => item.action(row)}>
            {item.name}
          </Button>
        ))}
      </ButtonGroup>
    </StyledTableCell>
  );
  const renderRows = () => {
    return rows.map((row, index) => (
      <StyledTableRow key={index}>
        {headers.map((header, index) => {
          const accesor = header.accesor
          return <StyledTableCell component="td" scope="row"
            key={index}
            size='small'
            style={customColumnStyle(header.minWidth)}
          >
            <div>
              {row[accesor]}
            </div>
          </StyledTableCell>
        })}
        {renderActions(row)}
      </StyledTableRow>
    ))
  }

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
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

          ) : renderRows()}
        </TableBody>

      </Table>
    </TableContainer >
  )
}
