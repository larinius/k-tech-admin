import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import type { RouteList } from '@/router/route';
import { FormattedMessage } from '@/locales';
import Layout from '@/layout';
import Authority from '@/layout/Authority';

const Home = lazy(() => import('@/views/Home'));
const Post = lazy(() => import('@/views/Post'));

export const defaultRoute: RouteList[] = [
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
    meta: { label: FormattedMessage({ id: 'layout.memu.home' }), icon: <HomeOutlined /> },
  },
  {
    path: '/post',
    id: 'Power',
    element: <Post />,
    meta: {
      label: 'New Post',
      icon: <PlusOutlined />,
    },
  },
];

const ErrorPage403 = lazy(() => import('@/views/core/error/403'));
const ErrorElement = lazy(() => import('@/views/core/error/ErrorElement'));
const Refresh = lazy(() => import('@/views/core/Refresh'));

const Login = lazy(() => import('@/views/Login'));

export const whiteList = [
  {
    path: '*',
    element: <ErrorPage403 />,
  },
  {
    path: '/refresh/*',
    element: <Refresh />,
    meta: { label: '', hideSidebar: true, whiteList: true },
  },
];

export const baseRouter: RouteObject[] = [
  {
    path: '/',
    element: (
      <Authority>
        <Layout />
      </Authority>
    ),
    errorElement: <ErrorElement pageType="Layout" />,
    children: [...whiteList],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export const browserRouter = createBrowserRouter(baseRouter);
