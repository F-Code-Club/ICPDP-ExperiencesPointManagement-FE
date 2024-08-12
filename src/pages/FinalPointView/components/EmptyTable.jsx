import { Typography } from "@mui/material";
const EmptyTable = () => {
  return (
    <Typography
      sx={{
        color: "text.secondary",
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      VUI LÒNG ẤN NÚT <strong className="text-primary">TÍNH ĐIỂM</strong> ĐỂ
      TÍNH TOÁN DỮ LIỆU
    </Typography>
  );
};

export default EmptyTable;
