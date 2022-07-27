import { lazy } from 'ice';
import BasicLayout from '@/layouts/BasicLayout';

const UserPage = lazy(() => import('@/pages/UserPage'));
const AddUserPage = lazy(() => import('@/pages/AddUserPage'));

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/user',
        component: UserPage,
      },
      {
        path: '/add',
        component: AddUserPage,
      },
      {
        path: '/',
        redirect: '/user',
      },
    ],
  },
];
export default routerConfig;
