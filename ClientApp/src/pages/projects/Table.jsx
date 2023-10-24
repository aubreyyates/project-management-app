import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./Table.css";

export default function Table({ rows, deleteRow, handleOpen }) {
  const theme = useTheme();

  const handleDeleteClick = (id) => {
    deleteRow(id);
  };

  const handleEditClick = (row) => {
    handleOpen("update", { ...row });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 500,
      editable: false,
    },
    {
      field: "percentageComplete",
      headerName: "Complete (%)",
      width: 400,
      valueGetter: (params) => `${params.row.percentageComplete}%`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // getRowClassName={getRowClassName}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        sx={{
          border: 1,
          backgroundColor: "background.paper",
          borderColor: `${theme.palette.divider}`,
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
