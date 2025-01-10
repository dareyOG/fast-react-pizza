import { useFetcher } from 'react-router';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ priority }) {
  const fetcher = useFetcher();

  //   const isPriority = true;

  return (
    // fetcher-forms update data without navigation

    // <fetcher.Form method="PATCH" action='/order/:orderId' className="text-right">
    <fetcher.Form method="PATCH" className="text-right">
      {/* <input
        type="hidden"
        name="priority"
        value={!priority ? JSON.stringify(isPriority) : ''}
      /> */}
      <Button type={'primary'}>Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const { orderId } = params;

  const updatedOrder = { priority: true };
  await updateOrder(orderId, updatedOrder);

  /* 
 Alternatively, 

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //   console.log(data);

  const updatedOrder = { priority: JSON.parse(data.priority) };
  await updateOrder(orderId, updatedOrder); */

  return null;
}
