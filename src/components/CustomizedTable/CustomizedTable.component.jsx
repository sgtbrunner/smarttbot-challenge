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
import { useHistory } from "react-router-dom";

import "./CustomizedTable.styles.css";

const columns = [
  { id: "rank", label: "Rank" },
  { id: "pairCode", label: "Pair" },
  { id: "currencies", label: "Currencies" },
  {
    id: "last",
    label: "Last",
    format: (value) => numericValueFormatter(value)
  },
  {
    id: "high24hr",
    label: "High",
    format: (value) => numericValueFormatter(value)
  },
  {
    id: "low24hr",
    label: "Low",
    format: (value) => numericValueFormatter(value)
  },
  {
    id: "percentChange",
    label: "Change %",
    format: (value) => (Number(value) * 100).toFixed(2).replace(".", ",") + "%"
  },
  {
    id: "totalVolume",
    label: "Volume",
    format: (value) => abbreviateNumber(Number(value)).replace(".", ","),
  }
];

const numericValueFormatter = value => {
  return Number(value) > 1
  ? Number(value).toLocaleString("pt-BR")
  : Number(value).toFixed(6).replace(".", ",")
}

const abbreviateNumber = (n) => {
  if (n < 1e3) return n.toLocaleString("pt-BR");
  if (n >= 1e3 && n < 1e6) return ((n / 1e3).toFixed(1) + "K");
  if (n >= 1e6 && n < 1e9) return ((n / 1e6).toFixed(1) + "M");
  if (n >= 1e9 && n < 1e12) return ((n / 1e9).toFixed(1) + "B");
  if (n >= 1e12) return ((n / 1e12).toFixed(1) + "T");
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 30
  },
});

export const CustomizedTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const setCellStyles = (id, value) => {
    if(id === "rank") return "bold-rank";
    if(id === "percentChange") return value > 0 ? "positive" : "negative";
  }

  const setLinkStyle = (id) => {
    if(id === "pairCode") return "clickable-link";
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createSortHandler = () => {};

  const history = useHistory();
  const navigateToPairInfo = (columnId, rowId) => {
    if(columnId==="pairCode") { history.push("/pair/" + rowId); }
  }

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
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  <TableSortLabel
                    active={props.orderBy === column.id}
                    direction={
                      props.orderBy === column.id ? props.order : "asc"
                    }
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {props.orderBy === column.id ? (
                      <span className={classes.visuallyHidden}>
                        {props.order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
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
              .map((row, index) => {
                return (
                  <TableRow 
                    key={row.id}
                    tabIndex={-1} 
                    role="checkbox"
                    style ={ index % 2? { background : "#EEEEEE" }:{ background : "#FFFFFF" }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          onClick={() => navigateToPairInfo(column.id, row.id)} 
                          className={setCellStyles(column.id, value)}>
                          <div className={setLinkStyle(column.id)}>
                            {column.format ? column.format(value) : value}
                          </div>
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
