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
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverView />
    </div>
  );
}

export default AppLayout;
