import { useCallback, useState } from "react";

const useEdit = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditClick = useCallback((id) => {
    setRowToEdit(id);
    setShowEditForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowEditForm(false);
  }, []);

  return {
    showEditForm,
    setShowEditForm,
    rowToEdit,
    handleEditClick,
    handleClose,
  };
};

export default useEdit;
