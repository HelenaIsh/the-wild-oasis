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

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
};
