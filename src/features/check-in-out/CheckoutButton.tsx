import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }: { bookingId?: string }) {
  const { isCheckingOut, checkout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => bookingId && checkout({ bookingId })}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
