import { useCallback, useState } from "react";

const useEdit = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditClick = useCallback((id) => {
    setRowToEdit(id);
    setShowEditForm(true);
    setIsEdit(true);
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
    isEdit,
  };
};

export default useEdit;
