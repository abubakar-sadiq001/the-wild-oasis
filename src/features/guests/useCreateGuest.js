import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createNewGuest, isLoading: isCreating } = useMutation({
    mutationFn: createEditGuest,

    onSuccess: () => {
      toast.success("Guest created successful");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },

    onError: (err) => {
      toast.error("Guest couldn't be created");
      console.log(err);
    },
  });

  return { createNewGuest, isCreating };
}
