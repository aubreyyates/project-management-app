import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

let apiEndpoint = "https://localhost:7253/api/projects";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 110,
    editable: false,
  },
  {
    field: "percentageComplete",
    headerName: "Complete (%)",
    width: 200,
    valueGetter: (params) => `${params.row.percentageComplete}%`,
  },
];

export default function Table() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error(error));
  }, []); // The empty array [] ensures the effect runs once after the initial render

  return (
    <Box sx={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
