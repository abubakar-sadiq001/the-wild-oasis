import { useEffect, useRef } from "react";

function useOutsideClick(handler, capturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // If the modal is active, and doesn't contains the  element that was clicked then close
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("clicked");
          handler?.();
        }
      }

      document.addEventListener("click", handleClick, capturing);

      return () =>
        document.removeEventListener("click", handleClick, capturing);
    },
    [handler, capturing]
  );

  return { ref };
}

export default useOutsideClick;
