// Third-party library imports.
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Style imports.
import { smallModalSize, largeModalSize } from "components/modal/modalSizes";
import "./Table.css";

export default function Table({ projects, openModal, deleteProject }) {
  const theme = useTheme();

  const handleViewButtonClick = (project) => {
    openModal("viewProject", largeModalSize, project);
  };

  const handleEditButtonClick = (project) => {
    openModal("updateProjectForm", smallModalSize, project);
  };

  const handleDeleteButtonClick = (id) => {
    deleteProject(id);
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
            icon={<VisibilityIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleViewButtonClick(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditButtonClick(params.row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteButtonClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={projects}
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
