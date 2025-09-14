import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogOut } from "./useLogOut";

function Logout() {
  const { logoutUser, isLoading } = useLogOut();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logoutUser()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
