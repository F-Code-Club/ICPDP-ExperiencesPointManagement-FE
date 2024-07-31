import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { editModal as styles } from "./finalPointViewStyle";

const EditFinalPointForm = () => {
  return (
    <FormControl
      sx={{
        gap: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color">
              Đánh giá Ý thức học (Điểm mặc định: 20, tối đa: 35)
            </span>
          </FormLabel>
        </Grid>
        <Grid xs={4} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={8} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Comment"
          />
        </Grid>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color">
              Ý thức tham gia các hoạt động chính trị, văn hóa, văn nghệ, thể
              dục thế thao ( Điểm mặc định 15, tối đa 50)
            </span>
          </FormLabel>
        </Grid>
        <Grid xs={2.4} item>
          <TextField
            sx={{ ...styles.inputField, width: 130 }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={2.4} item>
          <TextField
            sx={{ ...styles.inputField, width: 130 }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={2.4} item>
          <TextField
            sx={{ ...styles.inputField, width: 130 }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={2.4} item>
          <TextField
            sx={{ ...styles.inputField, width: 130 }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={2.4} item>
          <TextField
            sx={{ ...styles.inputField, width: 130 }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color">
              Phẩm chất công dân và quan hệ cộng đồng (Điểm mặc định: 15, tối đa
              25)
            </span>
          </FormLabel>
        </Grid>
        <Grid xs={4} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={8} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Comment"
          />
        </Grid>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color">
              Đánh giá tham gia công tác phụ trách đoàn thể, các tổ chức…
            </span>
          </FormLabel>
        </Grid>
        <Grid xs={4} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Điểm cộng"
          />
        </Grid>
        <Grid xs={8} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Comment"
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
export default EditFinalPointForm;
