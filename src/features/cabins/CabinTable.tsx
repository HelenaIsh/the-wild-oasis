import Spinner from '../../ui/Spinner';

import CabinRow, { type CabinType } from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  const filter = searchParams.get('discount') || 'all';
  const filteredCabins = cabins.filter((cabin: CabinType) => {
    if (filter === 'all') return true;
    if (filter === 'no-discount') return cabin.discount === 0;
    if (filter === 'with-discount') return cabin.discount > 0;
    return true;
  });
  const sortBy = searchParams.get('sortBy') || '';
  if (sortBy === 'name-asc') {
    filteredCabins.sort((a: CabinType, b: CabinType) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === 'name-desc') {
    filteredCabins.sort((a: CabinType, b: CabinType) =>
      b.name.localeCompare(a.name)
    );
  } else if (sortBy === 'regularPrice-asc') {
    filteredCabins.sort(
      (a: CabinType, b: CabinType) => a.regularPrice - b.regularPrice
    );
  } else if (sortBy === 'regularPrice-desc') {
    filteredCabins.sort(
      (a: CabinType, b: CabinType) => b.regularPrice - a.regularPrice
    );
  } else if (sortBy === 'maxCapacity-asc') {
    filteredCabins.sort(
      (a: CabinType, b: CabinType) => a.maxCapacity - b.maxCapacity
    );
  } else if (sortBy === 'maxCapacity-desc') {
    filteredCabins.sort(
      (a: CabinType, b: CabinType) => b.maxCapacity - a.maxCapacity
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin: CabinType) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}
