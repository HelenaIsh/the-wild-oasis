import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking, type Booking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: string }) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.refetchQueries();
    },
    onError: () => toast.error(`There was an error while checking out`),
  });
  return { checkout, isCheckingOut: isPending };
}
