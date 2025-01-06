import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/* const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const username = useSelector((state) => state.user.username);
  const navigate = useNavigation();
  const isSubmitting = navigate.state === 'submitting';

  const formError = useActionData();
  // console.log(formError);

  // const cart = fakeCart;
  const cart = useSelector(getCart);
  // console.log(cart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="field-input">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            defaultValue={username}
            className="input flex-1"
          />
        </div>

        <div className="field-input">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-1">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="field-input">
          <label className="sm:basis-40">Address</label>
          <div className="flex-1">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          {/* pass cart object as hidden data which is then captured by the action function */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  // convert to an object data
  const data = Object.fromEntries(formData);
  // console.log(data);

  const order = {
    ...data,
    // priority: data.priority === 'on',
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart),
  };

  // console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give a correct phone number, we might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // when everything is valid, create order and redirect
  const newOrder = await createOrder(order);
  // console.log(newOrder);

  // clear cart when order is placed
  store.dispatch(clearCart());

  // navigate to /order/orderId; useNavigate() can't be used, same reason as useParams().
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
