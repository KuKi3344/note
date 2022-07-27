import React, { useState } from 'react';
import { Message } from '@alifd/next';
// eslint-disable-next-line no-unused-vars
import style from './index.module.css';
import AddUserForm from './components/AddUserForm';

const ob = {
  id: '',
  phone: '',
  username: '',
  email: '',
  sex: '',
};

const AddUserPage = () => {
  const [addlist, setAddList] = useState({});
  const addUser = (value, err) => {
    if (err) {
      Message.error('输入信息错误');
      return;
    }
    addRequest();
  };
  async function addRequest() {
    let result = 0;
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill, @iceworks/best-practices/no-http-url
    const res = await fetch('http://127.0.0.1:8848/user/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(addlist),
    });
    result = await res.json();
    if (result.code !== 200) {
      Message.error(result.message);
    } else {
      setAddList(ob);
      Message.success(result.message);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AddUserForm
        addlist={addlist}
        addUser={addUser}
        AddFormChange={(values) => {
          setAddList(values);
        }}
      />
    </div>
  );
};

export default AddUserPage;
