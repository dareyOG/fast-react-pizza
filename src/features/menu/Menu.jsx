import { useLoaderData } from 'react-router';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // get menu data from loader
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul>
      {menu.map(pizza => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// load menu data
export async function loader() {
  const menu = await getMenu();

  return menu;
}

export default Menu;
