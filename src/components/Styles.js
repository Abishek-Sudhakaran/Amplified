import { withStyles, makeStyles,createStyles } from "@material-ui/core/styles";
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
        "&:nth-of-type(even)": {
            backgroundColor: theme.palette.background.default
        }
    }
}))(TableRow);

const tableStyles = makeStyles(theme => ({
    table: {
        width: "100% !important"
    },
    margin: {
        margin: theme.spacing(-1.8)
    }
}));

const appBarStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            marginBottom: 20
        },
        title: {
            flexGrow: 1,
        },
        link: {
            color: '#FFF',
            textDecoration: 'none'
        }
    }),
);


export { StyledTableCell, StyledTableRow, tableStyles,appBarStyles }