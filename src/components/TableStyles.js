import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e8e8e8",

    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    }
}))(TableRow);

const useStyles = makeStyles(theme => ({
    table: {
        width: "100% !important"
    },
    margin: {
        margin: theme.spacing(-1.8)
    }
}));


export { StyledTableCell, StyledTableRow, useStyles }