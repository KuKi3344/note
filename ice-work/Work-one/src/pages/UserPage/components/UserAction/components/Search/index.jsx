import React, { useState } from 'react';
import { Input, Button, Icon } from '@alifd/next';
import styles from './index.module.css';

const Search = (props) => {
  const { list, searchResult } = props;
  const [namevalue, setNamevalue] = useState('');
  const [phonevalue, setPhonevalue] = useState('');
  const filterData = () => {
    // eslint-disable-next-line array-callback-return
    const result = list.filter((item) => {
      return item.username.toLowerCase().includes(namevalue.toLowerCase()) && item.phone.includes(phonevalue);
    });
    searchResult(result);
  };
  return (
    <div>
      <Input
        className={styles.input}
        placeholder="输入用户名"
        value={namevalue}
        onChange={(values) => {
          setNamevalue(values);
        }}
      />
      <Input
        className={styles.input}
        placeholder="输入电话号"
        value={phonevalue}
        onChange={(values) => {
          setPhonevalue(values);
        }}
      />
      <Button size="medium" type="primary" onClick={filterData}>
        <Icon type="search" />
      </Button>
    </div>
  );
};

export default Search;
