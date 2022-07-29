import React, { useEffect, useState } from 'react';
import { useHistory } from 'ice';
import { Button, Pagination, Loading } from '@alifd/next';
import styles from './index.module.css';
import Search from './components/Search';
import UserList from './components/UserList';
import { getallUser } from '@/static/requestApi';

const UserAction = () => {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [newlist, setNewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('page') ? sessionStorage.getItem('page') : 1);
  const [pageresult, setPageresult] = useState([]);
  const [loadvis, setLoadvis] = useState(true);

  const changePage = (current) => {
    setCurrentPage(current);
    sessionStorage.setItem('page', current);
  };
  useEffect(() => {
    dataSource();
  }, []);
  useEffect(() => {
    checkList(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, newlist]);
  const checkList = (current) => {
    const result = newlist.filter((item, index) => {
      return index >= (current - 1) * 7 && index < current * 7;
    });
    setPageresult(result);
  };
  async function dataSource() {
    let result = [];
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill, @iceworks/best-practices/no-http-url
    const res = await getallUser('/user/all');
    result = await res.json();
    result = result.data;
    setList(result);
    setNewList(result);
    setLoadvis(false);
  }
  const addOpen = () => {
    history.push('/add');
  };

  return (
    <Loading tip="用力加载中..." visible={loadvis} style={{ width: '100%' }}>
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
          newlist={pageresult}
          getlist={() => {
            dataSource();
          }}
        />
        <Pagination
          // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
          current={parseInt(currentPage, 10)}
          totalRender={() => `总数: ${newlist.length}`}
          total={newlist.length}
          pageSize={7}
          onChange={changePage}
        />
      </div>
    </Loading>
  );
};

export default UserAction;
