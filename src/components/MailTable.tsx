import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
} from "@mui/material";

import MailTableHead from "./MailTableHead";
import MailToolbar from "./MailToolbar";
import { SelectAllRounded } from "@mui/icons-material";

const MailTable = (props: any) => {
  const { data } = props;
  const [selected, setSelected] = useState([]) as any;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleSelectAllClick = (event: any) => {
    if (event.target.clicked) {
      const newSelecteds = data.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChange = (event: any, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleRowClick = (mail: any) => {
    props.history.push(`/mail/view/${mail.id}`, mail);
  };

  const handleChangePage = (event: any, newPage: number) => {
      setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box
      sx={{
        width: "100%",
        height: { sm: "calc(100vh - 64px)", xs: "calc(100vh - 56px)" },
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <MailToolbar numSelected={SelectAllRounded.length} />
        <TableContainer
          sx={{
            height: { sm: "calc(100vh - 180px)", xs: "calc(100vh - 160px)" },
          }}
        >
          <Table stickyHeader aria-label="sticky table" size="medium">
            <MailTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onChange={(event) => handleChange(event, row.id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="checkbox"
                        onClick={(event) => handleRowClick(row)}
                      >
                        <Typography
                          sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            width: { sm: 168, xs: 100 },
                          }}
                        >
                          {row.fromAddress}
                        </Typography>
                      </TableCell>
                      <TableCell onClick={(event) => handleRowClick(row)}>
                        <Typography
                          sx={{
                            width: { sm: 800, xs: 250 },
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.subject} - {row.body.substring(0, 90)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default MailTable;
