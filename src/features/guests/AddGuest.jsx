import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateGuestForm from "./CreateGuestForm";
import { useGuests } from "./useGuests";

function AddGuest() {
  const { guests, isLoading } = useGuests();

  const guestLength = !guests?.length;

  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button disabled={guestLength || isLoading}>Add new guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
