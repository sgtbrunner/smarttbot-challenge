import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const columns = [
  { id: "id", label: "Code", minWidth: 50 },
  { 
    id: "pairName", 
    label: "Name", 
    minWidth: 50,
    format: (value) => value.replace('_','/')
  },
  {
    id: "last",
    label: "Value",
    minWidth: 50,
    format: (value) =>
      Number(value) > 1
        ? Number(value).toLocaleString('pt-BR')
        : Number(value).toFixed(6).replace(".", ",")
  },
  {
    id: "percentChange",
    label: "Change",
    minWidth: 50,
    format: (value) => (Number(value) * 100).toFixed(2) + "%"
  },
  {
    id: "baseVolume",
    label: "Base Volume",
    minWidth: 50,
    format: (value) => Number(value).toLocaleString('pt-BR')
  },
  {
    id: "quoteVolume",
    label: "Quote Volume",
    minWidth: 50,
    format: (value) => Number(value).toLocaleString('pt-BR')
  },
  {
    id: "isFrozen",
    label: "Active",
    minWidth: 50,
    format: (value) => value === '0' ? 'Yes' : 'No'
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  }
});

export const CustomizedTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createSortHandler = () => {}

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                  active={props.orderBy === column.id}
                  direction={props.orderBy === column.id ? props.order : 'asc'}
                  onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                      {props.orderBy === column.id ? (
                        <span className={classes.visuallyHidden}>
                          {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        hidden={props.rows.length < 10}
      />
    </Paper>
  );
};
