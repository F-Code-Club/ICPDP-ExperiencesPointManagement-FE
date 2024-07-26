import { memo } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import { ManagementFormStyles as styles } from "../../../components/Form/style";
import FormSelect from "../../../components/Form/FormSelect";
import FormDatePicker from "../../../components/Form/FormDatePicker";
import useAddSemester from "../hooks/useAddSemester";
import useFetchYears from "../hooks/useFetchYears";
import CircularIndeterminate from "../../../components/CircularIndeterminate";

// eslint-disable-next-line react/prop-types
const SemesterAddForm = ({ open, handleClose, setShowForm }) => {
  const [handleSubmit, control, isSubmitting, watch] =
    useAddSemester(setShowForm);
  const [springStartDate, summerStartDate, fallStartDate] = watch([
    "springStartDate",
    "summerStartDate",
    "fallStartDate",
  ]);
  const availableYears = useFetchYears();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.managementModal}>
        <Box sx={styles.formHeader}>
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 0,
              top: "16px",
              width: "24px",
              height: "24px",
              color: "text.dark",
            }}
          >
            <ClearIcon />
          </Button>
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 3, fontWeight: 600 }}
          >
            Thêm kì học
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "40px 24px",
            gap: 1.5,
            alignSelf: "stretch",
            borderTopWidth: "2px",
          }}
        >
          <Grid container marginBottom={1.5} spacing={3}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10}>
              <FormSelect
                control={control}
                name="year"
                label="Năm học"
                options={availableYears.map((year) => ({
                  value: year,
                  label: year.toString(),
                }))}
                sx={{ ...styles.inputField, width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid container gap={2} marginTop={1.5}>
            <Grid container item spacing={3}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  padding: "12px 10px 0px 10px",
                  gap: "10px",
                }}
              >
                <Typography variant="h6">Spring</Typography>
              </Grid>
              <Grid item xs={5}>
                <FormDatePicker
                  control={control}
                  name="springStartDate"
                  label="Ngày bắt đầu"
                  sx={{ ...styles.inputField, width: "100%" }}
                />
              </Grid>
              <Grid item xs={5}>
                <FormDatePicker
                  control={control}
                  name="springEndDate"
                  minDate={springStartDate}
                  label="Ngày kết thúc"
                  sx={{ ...styles.inputField, width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  padding: "12px 10px 0px 10px",
                  gap: "10px",
                }}
              >
                <Typography variant="h6">Summer</Typography>
              </Grid>
              <Grid item xs={5}>
                <FormDatePicker
                  control={control}
                  name="summerStartDate"
                  label="Ngày bắt đầu"
                  sx={{ ...styles.inputField, width: "100%" }}
                />
              </Grid>
              <Grid item xs={5}>
                <FormDatePicker
                  control={control}
                  name="summerEndDate"
                  minDate={summerStartDate}
                  label="Ngày kết thúc"
                  sx={{ ...styles.inputField, width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  padding: "12px 10px 0px 10px",
                  gap: "10px",
                }}
              >
                <Typography variant="h6">Fall</Typography>
              </Grid>
              <Grid item xs={5}>
                <FormDatePicker
                  control={control}
                  name="fallStartDate"
                  label="Ngày bắt đầu"
                  sx={{ ...styles.inputField, width: "100%" }}
                />
              </Grid>
              <Grid item xs={5}>
                <FormDatePicker
                  control={control}
                  name="fallEndDate"
                  minDate={fallStartDate}
                  label="Ngày kết thúc"
                  sx={{ ...styles.inputField, width: "100%" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              ...styles.buttonContainer,
              gap: 2,
              p: 0,
              alignItems: "flex-end",
            }}
          >
            <Button onClick={handleClose} sx={styles.cancelButton}>
              Hủy
            </Button>
            <Button type="submit" sx={styles.addButton} disabled={isSubmitting}>
              Thêm
              <AddIcon sx={styles.addIcon} />
            </Button>
            {isSubmitting && <CircularIndeterminate />}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(SemesterAddForm);
