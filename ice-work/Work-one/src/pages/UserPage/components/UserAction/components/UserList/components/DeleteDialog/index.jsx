import React from 'react';
import { Dialog } from '@alifd/next';

const DeleteDialog = (props) => {
  const { deletevis, deleteUser, deleteClose } = props;
  return (
    <div>
      <Dialog
        title="确认删除"
        visible={deletevis}
        onOk={deleteUser}
        onClose={deleteClose}
        onCancel={deleteClose}
      >
        <p>确认删除此用户?</p>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
