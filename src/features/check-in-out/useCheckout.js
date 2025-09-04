import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      // Mutate the object
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    // When the mutation complete show success, and invalidate the page
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    // When the mutation fails show error
    onError: () => {
      toast.error("There was an error checking out");
    },
  });

  return { checkout, isCheckingOut };
}
