import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router';

import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu /> },
      { path: '/cart', element: <Cart /> },
      { path: '/order/new', element: <CreateOrder /> },
      { path: '/order/:orderId', element: <Order /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/menu" element={<Menu />} />
  //       <Route path="/cart" element={<Cart />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;
