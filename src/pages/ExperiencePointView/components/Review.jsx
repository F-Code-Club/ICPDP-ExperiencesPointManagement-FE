import { Button, Box } from "@mui/material";
import { styles } from "./pointViewStyle";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { toastError } from "../../../utils/toast";
//eslint-disable-next-line
const Review = ({ eventID }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <Button
        sx={styles.addButton}
        onClick={() => {
          if (!eventID) {
            toastError("Event is not selected");
            return;
          }
          setShowModal(true);
        }}
      >
        Duyệt
      </Button>
      {showModal && (
        <ReviewModal
          open={showModal}
          handleClose={handleClose}
          eventID={eventID}
        />
      )}
    </Box>
  );
};

export default Review;
