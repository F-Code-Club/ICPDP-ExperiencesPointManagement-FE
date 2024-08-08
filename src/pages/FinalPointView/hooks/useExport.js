import { useContext } from "react";
import { FinalPointContext } from "../context/finalPointContext";
import { exportOptions, resolveHeaders } from "../exportOptions";

const useExport = () => {
  const { rows, rowSelectionModel } = useContext(FinalPointContext);
  return () => {
    const selectedRows = rowSelectionModel.length
      ? rows.filter((row) => rowSelectionModel.includes(row.id))
      : rows;
    const fieldsToExport = exportOptions.fields;
    const customHeaders = resolveHeaders(exportOptions.headers);
    const csvHeader = customHeaders.join(",");
    const csvRows = selectedRows.map((row) =>
      fieldsToExport.map((field) => row[field]).join(",")
    );
    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}\n${csvRows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_rows.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
};

export default useExport;
