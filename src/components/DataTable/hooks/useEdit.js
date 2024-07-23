import { useState } from "react";

const useEdit = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditClick = (id) => {
    setRowToEdit(id);
    setIsEdit(true);
    setShowEditForm(true);
  };

  return { isEdit, showEditForm, setShowEditForm, rowToEdit, handleEditClick };
};

export default useEdit;
