import React, { useState } from 'react';
import { useHistory } from 'ice';
import { Button, Dialog, Form, Input, Radio } from '@alifd/next';

const FormItem = Form.Item;

function AddUserForm(props) {
  const { addlist, addUser, AddFormChange } = props;
  const [confirmvis, setConfirmvis] = useState(false);
  const history = useHistory();
  const confirmOpen = () => {
    setConfirmvis(true);
  };
  const confirmClose = () => {
    setConfirmvis(false);
  };
  const addForm = () => {
    addUser();
    setConfirmvis(false);
  };
  return (
    <div style={{ minWidth: '400px' }}>
      <Form
        style={{ width: '80%', margin: '20px' }}
        colon
        value={addlist}
        onChange={(values) => {
          AddFormChange(values);
        }}
      >
        <FormItem name="username" label="Username" required requiredMessage="Please input your username!">
          <Input />
        </FormItem>
        <FormItem name="sex" label="sex" required>
          <Radio.Group shape="button">
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="email" label="Email" format="email" required requiredMessage="Please input your email!">
          <Input placeholder="Please Enter Email" />
        </FormItem>
        <FormItem name="phone" label="Phone Number" required requiredMessage="Please input your phone!" format="tel">
          <Input placeholder="Please Enter phone number" />
        </FormItem>
        <FormItem label=" " colon={false} style={{ float: 'right' }}>
          <Form.Submit type="primary" validate onClick={confirmOpen} style={{ marginRight: 8 }}>
            添加
          </Form.Submit>
          <Form.Reset>清空</Form.Reset>
          <Button
            type="normal"
            onClick={() => {
              history.push('/user');
            }}
          >
            返回
          </Button>
        </FormItem>
      </Form>
      <Dialog title="确认添加" visible={confirmvis} onOk={addForm} onClose={confirmClose} onCancel={confirmClose}>
        <p>确认添加此用户?</p>
      </Dialog>
    </div>
  );
}

export default AddUserForm;
