import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createNewBooking, isLoading: isCreatingBooking } =
    useMutation({
      mutationFn: createBooking,

      onSuccess: () => {
        toast.success("Booking created successful");
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
      onError: (err) => {
        toast.error("Booking couldn't be created");
        console.log(err);
      },
    });

  return { createNewBooking, isCreatingBooking };
}
