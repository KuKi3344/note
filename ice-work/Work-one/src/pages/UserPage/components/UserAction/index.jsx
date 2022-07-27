import React, { useState } from 'react';
import { useHistory } from 'ice';
import { Button } from '@alifd/next';
import styles from './index.module.css';
import Search from './components/Search';
import UserList from './components/UserList';

const UserAction = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [newlist, setNewList] = useState([]);

  async function dataSource() {
    let result = [];
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill, @iceworks/best-practices/no-http-url
    const res = await fetch('http://127.0.0.1:8848/user/all', {
      method: 'GET',
    });
    result = await res.json();
    result = result.data;
    setList(result);
    setNewList(result);
  }
  const addOpen = () => {
    history.push('/add');
  };

  return (
    <div className={styles.container}>
      <h2>用户信息页面</h2>
      <div className={styles.head}>
        <Search
          list={list}
          searchResult={(values) => {
            setNewList(values);
          }}
        />
        <Button type="primary" onClick={addOpen}>
          新增用户
        </Button>
      </div>
      <UserList
        newlist={newlist}
        getlist={() => {
          dataSource();
        }}
      />
    </div>
  );
};

export default UserAction;
