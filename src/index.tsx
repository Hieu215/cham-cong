import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import router from './router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
