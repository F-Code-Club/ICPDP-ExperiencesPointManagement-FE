import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { editModal as styles } from "./finalPointViewStyle";
import useEditPoint from "../hooks/useEditPoint";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const EditFinalPointForm = ({ rowToEdit, handleFormData }) => {
  const { rowData } = useEditPoint(rowToEdit);
  const [formData, setFormData] = useState(rowData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  handleFormData(formData);
  return (
    <FormControl
      sx={{
        gap: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color font-bold">
              Đánh giá Ý thức học (Điểm mặc định: 20, tối đa: 35)
            </span>
          </FormLabel>
        </Grid>
        <Grid xs={4} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Điểm cộng"
            value={formData?.studyPoint}
            name="studyPoint"
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid xs={8} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Comment"
            value={formData?.studyComment}
            name="studyComment"
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color font-bold">
              Ý thức tham gia các hoạt động chính trị, văn hóa, văn nghệ, thể
              dục thế thao ( Điểm mặc định 15, tối đa 50)
            </span>
          </FormLabel>
        </Grid>
        {[1, 2, 3, 4, 5].map((num) => (
          <Grid key={num} xs={2.4} item>
            <TextField
              sx={{ ...styles.inputField, width: 130 }}
              autoComplete="false"
              placeholder={`Điểm cộng ${num}`}
              type="number"
              value={formData?.[`activityPoint${num}`]}
              name={`activityPoint${num}`}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color font-bold">
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
            value={formData?.citizenshipPoint}
            name="citizenshipPoint"
            type="number"
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={8} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Comment"
            value={formData?.citizenshipComment}
            name="citizenshipComment"
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={12} item>
          <FormLabel>
            <span className="text-dark-text-color font-bold">
              Đánh giá tham gia công tác phụ trách đoàn thể; các tổ chức…
            </span>
          </FormLabel>
        </Grid>
        <Grid xs={4} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Điểm cộng"
            value={formData?.organizationPoint}
            name="organizationPoint"
            type="number"
            onChange={handleChange}
          />
        </Grid>
        <Grid xs={8} item>
          <TextField
            sx={{ ...styles.inputField }}
            autoComplete="false"
            placeholder="Comment"
            value={formData?.organizationComment}
            name="organizationComment"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
export default EditFinalPointForm;
