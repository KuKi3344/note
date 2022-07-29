import React from 'react';
import { Dialog, Form, Input, Radio, Button } from '@alifd/next';

const FormItem = Form.Item;

const CommonDialog = (props) => {
  const { DialogClose, DialogPerson, DialogUser, Dialogvis, formChange, ispreview, title } = props;
  // eslint-disable-next-line no-console
  return (
    <div>
      <Dialog title={title} visible={Dialogvis} footerActions={[]} onClose={DialogClose} v2>
        <Form
          style={{ width: '80%', margin: '20px' }}
          colon
          value={DialogPerson}
          isPreview={ispreview}
          onChange={(values) => {
            formChange(values);
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
            {!ispreview && (
              <Form.Submit type="primary" validate onClick={DialogUser} style={{ marginRight: 8 }}>
                确认
              </Form.Submit>
            )}
            <Button type="normal" size="medium" onClick={DialogClose}>
              取消
            </Button>
          </FormItem>
        </Form>
      </Dialog>
    </div>
  );
};

export default CommonDialog;
