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
