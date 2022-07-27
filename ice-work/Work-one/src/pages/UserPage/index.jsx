import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import UserAction from './components/UserAction';

const { Cell } = ResponsiveGrid;

const UserPage = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <UserAction />
      </Cell>
    </ResponsiveGrid>
  );
};

export default UserPage;
