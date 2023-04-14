import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

const router: any = createBrowserRouter([
  {
    path: 'login',
    element: <>login</>,
  },
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: 'table',
        element: <>table</>,
      },
    ],
  },
]);
export default router;
