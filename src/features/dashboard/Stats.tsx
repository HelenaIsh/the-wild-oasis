import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import type { Booking } from '../../services/apiBookings';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: Booking[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number;
}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupations =
    confirmedStays.reduce(
      (acc: number, stay: Booking) => acc + (stay.numNights || 0),
      0
    ) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupations * 100)}%`}
      />
    </>
  );
}
