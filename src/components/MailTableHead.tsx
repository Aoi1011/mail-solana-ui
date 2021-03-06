import React from "react";
import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

const headCells = [
  { id: "sender", label: "Sender" },
  { id: "subject", label: "Subject" },
];

const MailTableHead = (props: any) => {
  const { onSelectedAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{
              "aria-label": "select all mail",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" padding="normal">
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default MailTableHead;
