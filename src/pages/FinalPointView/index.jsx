import { columnGroupingModel, columnsSchema } from "./column";
import { FinalPointProvider } from "./context/FinalPointContext";
import FinalPointTable from "./components/FinalPointTable";
const FinalPointView = () => {
  return (
    <FinalPointProvider>
      <FinalPointTable
        columnsSchema={columnsSchema}
        columnGroupingModel={columnGroupingModel}
      />
    </FinalPointProvider>
  );
};

export default FinalPointView;
