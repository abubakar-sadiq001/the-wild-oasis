import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          { value: "created_at-desc", label: "Sort by date (recent first)" },
          { value: "created_at-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
