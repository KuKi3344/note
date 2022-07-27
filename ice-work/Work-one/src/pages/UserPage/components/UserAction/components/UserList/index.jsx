/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from 'react';
import { Message } from '@alifd/next';
import style from './index.module.css';
import DeleteDialog from './components/DeleteDialog';
import CommonDialog from './components/CommonDialog';
import DataTable from './components/DataTable';

const UserList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { getlist, newlist } = props;
  const [deletevis, setDeletevis] = useState(false);
  const [editvis, setEditvis] = useState(false);
  const [watchvis, setWatchvis] = useState(false);
  const [editPerson, setEditPerson] = useState({});
  const [deletePerson, setDeletePerson] = useState({});

  const editOpen = (row) => {
    // eslint-disable-next-line no-console
    setEditvis(true);
    setEditPerson(row);
  };

  const editClose = () => {
    setEditvis(false);
  };

  const deleteOpen = (row) => {
    // eslint-disable-next-line no-console
    setDeletevis(true);
    setDeletePerson(row);
  };

  const deleteClose = () => {
    setDeletevis(false);
  };

  const watchOpen = (row) => {
    setWatchvis(true);
    setEditPerson(row);
  };

  const watchClose = () => {
    setWatchvis(false);
  };

  const formChange = (values) => {
    setEditPerson(values);
  };
  async function updateRequest() {
    let result = 0;
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill, @iceworks/best-practices/no-http-url
    const res = await fetch('http://127.0.0.1:8848/user/update', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(editPerson),
    });
    result = await res.json();
    if (result.code !== 200) {
      Message.error(result.message);
    } else {
      Message.success(result.message);
      setEditvis(false);
      getlist();
    }
  }

  async function deleteRequest() {
    let result = 0;
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
    const res = await fetch(`http://127.0.0.1:8848/user/delete/${deletePerson.id}`, {
      method: 'POST',
    });
    result = await res.json();
    if (result.code !== 200) {
      Message.error(result.message);
    } else {
      Message.success(result.message);
      setDeletevis(false);
      getlist();
    }
  }

  const editUser = (value, err) => {
    if (err) {
      Message.error('输入信息错误');
      return;
    }
    updateRequest();
  };

  const deleteUser = () => {
    deleteRequest();
  };

  useEffect(() => {
    getlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <DataTable newlist={newlist} watchOpen={watchOpen} editOpen={editOpen} deleteOpen={deleteOpen} />
      <DeleteDialog
        deletevis={deletevis}
        deleteUser={() => {
          deleteUser();
        }}
        deleteClose={() => {
          deleteClose();
        }}
      />
      <CommonDialog
        mode="update"
        title="更新用户"
        Dialogvis={editvis}
        DialogPerson={editPerson}
        DialogUser={() => {
          editUser();
        }}
        DialogClose={() => {
          editClose();
        }}
        formChange={(values) => {
          formChange(values);
        }}
      />
      <CommonDialog title="查看用户" DialogClose={watchClose} Dialogvis={watchvis} DialogPerson={editPerson} mode="watch" />
    </div>
  );
};

export default UserList;
