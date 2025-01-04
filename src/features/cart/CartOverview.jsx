import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  // total cart quantity
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  // total cart price
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
