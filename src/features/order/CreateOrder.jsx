import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15
  }
];

function CreateOrder() {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === 'submitting';

  const formError = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formError?.phone && <p>{formError.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* pass cart object as hidden data which is then captured by the action function */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <button disabled={isSubmitting}>{isSubmitting ? 'Placing order...' : 'Order now'}</button>
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
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart)
  };
  // console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = 'Please give a correct phone number, we might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // when everything is valid, create order and redirect
  const newOrder = await createOrder(order);
  // console.log(newOrder);

  // navigate to /order/orderId; useNavigate() can't be used, same reason as useParams().
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
