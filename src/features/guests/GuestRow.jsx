import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";
import CreateGuestForm from "./CreateGuestForm";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function GuestRow({ guest }) {
  const {
    id: guestID,
    created_at,
    fullName,
    email,
    nationalID,
    nationality,
  } = guest;

  return (
    <>
      <Table.Row>
        <p>{fullName}</p>
        <p>{format(created_at, "MMM, dd, yyy")}</p>
        <p>{email}</p>
        <p>{nationalID.substr(0, 5).padEnd(10, "*")}</p>
        <p>{nationality}</p>

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestID} />

            <Menus.List id={guestID}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Table.Row>
    </>
  );
}

export default GuestRow;
