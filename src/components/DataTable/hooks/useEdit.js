import { useState } from "react";

const useEdit = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditClick = (id) => {
    setRowToEdit(id);
    setShowEditForm(true);
  };

  return { showEditForm, setShowEditForm, rowToEdit, handleEditClick };
};

export default useEdit;
