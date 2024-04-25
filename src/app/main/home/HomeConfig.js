import Home from './Home';

const HomeConfig = {
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
      path: '/',
      element: <Home />,
    },
  ],
};

export default HomeConfig;
