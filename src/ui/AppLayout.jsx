import Header from './Header';
import CartOverView from '../features/cart/CartOverView';
import { Outlet } from 'react-router';

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverView />
    </div>
  );
}

export default AppLayout;
