import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isLoading } = useMutation({
    mutationFn: logOut,

    onSuccess: () => {
      toast.success("Logged out successful");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },

    onError: (error) => {
      toast.error("Error logging out");
      throw new Error(error.message);
    },
  });

  return { logoutUser, isLoading };
}
