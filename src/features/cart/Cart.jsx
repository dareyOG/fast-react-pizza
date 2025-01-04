import { Link } from 'react-router';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getUsername } from './cartSlice';
import EmptyCart from './EmptyCart';

/* const fakeCart = [
  {
    Id: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    Id: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    Id: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

function Cart() {
  const username = useSelector(getUsername);
  // const cart = fakeCart;
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  // clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to={'/menu'}>&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, <span className="capitalize">{username}</span>
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button to={'/order/new'} type="primary">
          Order pizzas
        </Button>

        <Button type={'secondary'} onClick={handleClearCart}>
          Clear cart
        </Button>

        {/* <button>Clear cart</button> */}
      </div>
    </div>
  );
}

export default Cart;
