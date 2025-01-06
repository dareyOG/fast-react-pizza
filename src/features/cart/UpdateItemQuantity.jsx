import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ id, currentQuantity }) {
  const dispatch = useDispatch();

  // decrease quantity
  const handleDecreaseQuantity = () => {
    dispatch(decreaseItemQuantity(id));
  };

  // increase quantity
  const handleIncreaseQuantity = () => {
    dispatch(increaseItemQuantity(id));
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecreaseQuantity}>
        &#x2D;
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        &#x2B;
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
