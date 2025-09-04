import { useState } from "react";

function useModal() {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return { openName, close, open };
}

export default useModal;
