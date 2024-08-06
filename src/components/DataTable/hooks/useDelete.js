import { useState } from "react";

const useDelete = () => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleDeleteClick = (id) => () => {
    setRowToDelete(id);
    setShowDeleteForm(true);
  };

  return {
    showDeleteForm,
    setShowDeleteForm,
    rowToDelete,
    setRowToDelete,
    handleDeleteClick,
  };
};

export default useDelete;
