import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  // Access the client
  const queryClient = useQueryClient();

  // CREATE CABIN MUTATION
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    // Runs when ever a new cabin is created
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //   reset();
    },

    // Runs when error is caught
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
