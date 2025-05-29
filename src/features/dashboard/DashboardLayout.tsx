import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { stays, isLoading: isLoadingStays, confirmedStays } = useRecentStays();
  const { bookings, isLoading } = useRecentBookings();

  if (isLoading || isLoadingStays) {
    return <Spinner />;
  }

  console.log(bookings, stays, confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s activities</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}
