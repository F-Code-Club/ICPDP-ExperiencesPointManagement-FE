import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import { ManagementFormStyles as styles } from "../../../components/Form/style";
import FormSelect from "../../../components/Form/FormSelect";
import FormDatePicker from "../../../components/Form/FormDatePicker";
import useAddSemester from "../hooks/useAddSemester";

// eslint-disable-next-line react/prop-types
const SemesterAddForm = ({ open, handleClose, title, func }) => {
  const [handleSubmit, control, isSubmitting, watch] = useAddSemester();
  const [springStartDate, summerStartDate, fallStartDate] = watch([
    "springStartDate",
    "summerStartDate",
    "fallStartDate",
  ]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.managementModal}>
        <Box sx={styles.formHeader}>
          <Button onClick={handleClose}>
            <ClearIcon
              sx={{
                position: "absolute",
                left: "500px",
                top: "0px",
                width: "24px",
                height: "24px",
                color: "text.dark",
              }}
            />
          </Button>
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 3, mb: 2, fontWeight: 600 }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ ...styles.formContainer }}
        >
          <Box sx={styles.formColumn}>
            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <FormSelect
                  control={control}
                  name="year"
                  label="Năm học"
                  options={[
                    { value: 2023, label: "2023" },
                    { value: 2024, label: "2024" },
                  ]}
                  sx={styles.inputField}
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Grid container gap={2}>
              <Grid
                container
                item
                spacing={2}
                sx={{
                  display: "flex",
                  gap: 3,
                }}
              >
                <Grid item xs={2}>
                  <Typography variant="h6">Spring</Typography>
                </Grid>
                <Grid item xs={5}>
                  <FormDatePicker
                    control={control}
                    name="springStartDate"
                    label="Ngày bắt đầu"
                    sx={styles.inputField}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormDatePicker
                    control={control}
                    name="springEndDate"
                    label="Ngày kết thúc"
                    minDate={springStartDate}
                    sx={styles.inputField}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                spacing={2}
                sx={{
                  display: "flex",
                  gap: 3,
                }}
              >
                <Grid item xs={2}>
                  <Typography variant="h6">Summer</Typography>
                </Grid>
                <Grid item xs={5}>
                  <FormDatePicker
                    control={control}
                    name="summerStartDate"
                    label="Ngày bắt đầu"
                    sx={styles.inputField}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormDatePicker
                    control={control}
                    name="summerEndDate"
                    minDate={summerStartDate}
                    label="Ngày kết thúc"
                    sx={styles.inputField}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  gap: 3,
                }}
              >
                <Grid item xs={2}>
                  <Typography variant="h6">Fall</Typography>
                </Grid>
                <Grid item xs={5}>
                  <FormDatePicker
                    control={control}
                    name="fallStartDate"
                    minDate={fallStartDate}
                    label="Ngày bắt đầu"
                    sx={styles.inputField}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormDatePicker
                    control={control}
                    name="fallEndDate"
                    label="Ngày kết thúc"
                    sx={styles.inputField}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={styles.buttonContainer}>
          <Button onClick={handleClose} sx={styles.cancelButton}>
            Hủy
          </Button>
          <Button type="submit" sx={styles.addButton} disabled={isSubmitting}>
            {func}
            <AddIcon sx={styles.addIcon} />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SemesterAddForm;
