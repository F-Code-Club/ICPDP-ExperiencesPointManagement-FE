import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { InputAdornment } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import {
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => randomArrayItem(roles);

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        borderRadius: 1,
        backgroundColor: "primary.main",
        color: "text.light",
        height: 36,
        width: 73,
        padding: '10px',
        fontSize: 12,
        textTransform: 'none',
      }}
    >
      Thêm
      <AddIcon sx={{ color: "text.light", width: 15, height: 15 }}/>
    </Button>
  );
}

function DataTable() {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({}); //define useState

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } }); //turn to edit mode
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } }); //turn to view mode
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id)); //delete row
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }, //cancel edit mode
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  }; //get the row that is being edited

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //configure columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      type: "string",
      width: 137,
      align: "left",
      editable: false,
    },
    {
      field: "name",
      headerName: "Tên",
      headerClassName: "header",
      type: "string",
      width: 539,
      align: "left",
      headerAlign: "left",

      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "header",
      type: "string",
      width: 560,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerClassName: "header",
      headerName: "Hành động",
      width: 137,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)} //save the row
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)} //cancel the edit
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Box className="py-[24px] px-[20px]">
        <Box className="flex justify-end w-[1376px] h-[36px] mb-20 gap-x-[24px]">
          <TextField
            className="rounded-sm border-2"
            placeholder="Tìm kiếm"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "text.light",
                },
                "&:hover fieldset": {
                  borderColor: "text.light",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "text.light",
                },
                color: "text.light",
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "text.light",
                fontSize: 12,
              },
              "& .MuiOutlinedInput-input": {
                padding: "6px",      
              },
              width: 247,

            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon
                      sx={{ color: "text.light", width: 15, height: 15 }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <EditToolbar setRows={setRows} setRowModesModel={setRowModesModel} />
        </Box>
        <Box
          sx={{
            height: 650,
            width: 1376,
            overflow: "hidden",
            "& .MuiPaginationItem-page.Mui-selected": {
              color: "text.light",
            },
            "& .actions": { color: "text.light" },
            "& .textPrimary": { color: "text.light" },
            "& .header": {
              backgroundColor: "primary.main",
              color: "text.light",
            },

            border: "1px solid",
            borderRadius: 1,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            pageSizeOptions={20}
            rowsPerPageOptions={[20]}
            sx={{ color: "text.light", width: 1376, overflow: "hidden" }}
          />
        </Box>
      </Box>
    </>
  );
}

export default DataTable;
