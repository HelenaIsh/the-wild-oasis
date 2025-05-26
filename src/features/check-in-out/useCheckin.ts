import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking, type Booking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast?: Pick<Booking, 'hasBreakfast' | 'extrasPrice' | 'totalPrice'>;
    }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.refetchQueries();
      navigate('/');
    },
    onError: () => toast.error(`There was an error while checking in`),
  });
  return { checkin, isCheckingIn: isPending };
}
