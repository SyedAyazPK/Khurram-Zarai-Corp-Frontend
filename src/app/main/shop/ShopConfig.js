import { Cart } from './cart/Cart';
import { Checkout } from './cart/Checkout';
import { OrderSummary } from './cart/OrderSummary';
import ShopPage from './Shop';
import { SingleProduct } from './SingleProduct';
import { LaunchApp } from './Test';

const ShopConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
  
    {
      path: 'shop/product/:id',
      element: <SingleProduct />,
    },
    {
      path: '/shop/:type/:id',
      element: <ShopPage />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: '/checkout',
      element: <Checkout />,
    },
    {
      path: '/order-summary',
      element: <OrderSummary />,
    },
    {
      path: '/test',
      element: <LaunchApp />,
    },
  ],
};

export default ShopConfig;
