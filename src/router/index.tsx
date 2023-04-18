import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/login';
import DefaultLayout from '../pages/layout/layout';
import Home from '../pages/components/home/home';
import Table from '../pages/components/table/table';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'table',
        element: <Table />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
]);
export default router;
