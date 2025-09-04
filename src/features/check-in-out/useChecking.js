import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      // Mutate the object
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        hasBreakfast: true,
        // the values of the obj would be spread below.
        ...breakfast,
      }),

    // When the mutation complete show success, and invalidate the page, then naviagate to home page
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }), navigate("/");
    },

    // When the mutation fails show error
    onError: () => {
      toast.error("There was an error checking in");
    },
  });

  return { checkin, isCheckingIn };
}
