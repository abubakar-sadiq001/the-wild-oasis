import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useGuests } from "./useGuests";

function GuestTable() {
  const { guests, count, isLoading } = useGuests();

  // 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table
        columns="1.8fr 1.8fr 2.2fr 1.5fr 1fr 1fr"
        rows="1.8fr 1.8fr 2.2fr 1.5fr 1fr 1fr">
        <Table.Header>
          <div>Full Name</div>
          <div>Dates</div>
          <div>Email</div>
          <div>National Id</div>
          <div>Nationality</div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
