import OrderPage from "./OrdersPage";

const OrderConfig = {
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
      path: "/order",
      element: <OrderPage />,
    },
  ],
};

export default OrderConfig;
