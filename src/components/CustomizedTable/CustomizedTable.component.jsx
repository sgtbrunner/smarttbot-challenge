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
import { useHistory } from "react-router-dom";

import { abbreviateNumber, numericValueFormatter, percentageFormatter } from "../../utils/numberFormatter.util";
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
    format: (value) => percentageFormatter(value)
  },
  {
    id: "totalVolume",
    label: "Volume",
    format: (value) => abbreviateNumber(value),
  }
];

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
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}>
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
                          className={setCellStyles(column.id, value)}>
                            <div 
                              className={setLinkStyle(column.id)}
                              onClick={() => navigateToPairInfo(column.id, row.id)}>
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
