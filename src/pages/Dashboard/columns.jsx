import { Box, Typography, Chip } from "@mui/material";
import { EVENT_STATE } from "../../constant/core";
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
    field: "eventName",
    headerName: "Tên sự kiện",
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
        {params.value === EVENT_STATE.APPROVED && (
          <Chip
            label="Chấp nhận"
            sx={{
              backgroundColor: "tag.success",
              color: "text.success",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        )}
        {params.value === EVENT_STATE.REJECTED && (
          <Chip
            label="Từ chối"
            sx={{
              backgroundColor: "tag.error",
              color: "text.error",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
        )}
        {params.value === EVENT_STATE.PENDING && (
          <Chip
            label="Đang chờ"
            sx={{
              backgroundColor: "tag.warning",
              color: "text.warning",
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
  {
    field: "reason",
    headerName: "Lý do",
    headerClassName: "header",
    flex: 2,
    type: "string",
    align: "left",
    headerAlign: "left",
    editable: false,
  },
];

export default columnsSchema;
