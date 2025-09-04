import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,

    // show success message
    onSuccess: () => {
      toast.success("Booking deleted successful");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    // throw error message
    onError: () => {
      toast.error("There was an error deleting booking");
    },
  });

  return { deleteBooking, isDeletingBooking };
}
