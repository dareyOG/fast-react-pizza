import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formError = useActionData();
  // console.log(formError);

  const dispatch = useDispatch();

  // const cart = fakeCart;
  const cart = useSelector(getCart);
  // console.log(cart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  const pos = {
    lat: position.latitude,
    lng: position.longitude,
  };

  if (!cart.length) return <EmptyCart />;

  // fetch address
  const handleFetchAddress = (e) => {
    // clicking the button in the form input submits the form
    e.preventDefault();
    dispatch(fetchAddress());
  };

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

        <div className="field-input relative">
          <label className="sm:basis-40">Address</label>
          <div className="flex-1">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className="input w-full"
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.longitude && !position.latitude && (
            <span className="absolute right-[6px] top-[6px] z-50 sm:right-[5px] sm:top-[5px] md:right-[6.5px] md:top-[6.5px]">
              <Button
                type={'small'}
                disabled={isLoadingAddress}
                onClick={handleFetchAddress}
              >
                Get Position
              </Button>
            </span>
          )}
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
          {/* value has to be a string else, use JSON.stringify() */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* pass geolocation data as hidden data into form action  */}
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude ? JSON.stringify(pos) : ''
            }
          />
          {/* Alternatively as a string literal*/}
          {/*  <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          /> */}

          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
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
    position: JSON.parse(data.position),
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
