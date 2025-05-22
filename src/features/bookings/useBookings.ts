import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter =
    filterValue && filterValue !== 'all'
      ? { field: 'status', value: filterValue, method: 'eq' }
      : null;
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  });

  return { bookings, isLoading, error };
};
