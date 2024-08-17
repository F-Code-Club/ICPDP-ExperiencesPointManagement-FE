import { Box, Typography, Chip } from "@mui/material";
import { GRADING_STATE } from "../../constant/core";

const columnsSchema = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "header",
    headerAlign: "left",
    type: "number",
    flex: 1,
    align: "left",
    editable: false,
  },
  {
    field: "organizationName",
    headerName: "Tổ chức",
    headerClassName: "header",
    flex: 2,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 18px 12px 0px",
          gap: "18px",
        }}
      >
        <Typography variant="body1" className="ml-[12px]">
          {params.value}
        </Typography>
      </Box>
    ),
    type: "string",
    align: "left",
    headerAlign: "left",
    editable: false,
  },
  {
    field: "eventCount",
    headerName: "Số sự kiện",
    headerClassName: "header",
    flex: 2,
    type: "number",
    align: "left",
    headerAlign: "left",
    editable: false,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    headerClassName: "header",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 18px 12px 0px",
          gap: "18px",
        }}
      >
        {params.value === GRADING_STATE.GRADED && (
          <Chip
            label="Đã nhập điểm"
            sx={{
              backgroundColor: "tag.success",
              color: "text.success",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        )}
        {params.value === GRADING_STATE.UNGRADED && (
          <Chip
            label="Chưa nhập điểm"
            sx={{
              backgroundColor: "tag.error",
              color: "text.error",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        )}
      </Box>
    ),

    flex: 2,
    type: "string",
    align: "left",
    headerAlign: "left",
    editable: false,
  },
];

export default columnsSchema;
