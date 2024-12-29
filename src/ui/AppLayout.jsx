import Header from './Header';
import CartOverView from '../features/cart/CartOverView';
import { Outlet, useNavigation } from 'react-router';
import Loader from './Loader';

function AppLayout() {
  // display navigation state
  const navigation = useNavigation();

  // console.log(navigation);

  const isLoading = navigation.state === 'loading';

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverView />
    </div>
  );
}

export default AppLayout;
