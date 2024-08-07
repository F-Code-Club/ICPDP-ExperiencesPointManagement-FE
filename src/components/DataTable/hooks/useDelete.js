import { useCallback, useState } from "react";

const useDelete = () => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleDeleteClick = useCallback((id) => {
    setRowToDelete(id);
    setShowDeleteForm(true);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setShowDeleteForm(false);
  }, []);

  return {
    showDeleteForm,
    setShowDeleteForm,
    rowToDelete,
    setRowToDelete,
    handleDeleteClick,
    handleDeleteClose,
  };
};

export default useDelete;
