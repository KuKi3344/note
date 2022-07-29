import { Table, Button } from '@alifd/next';

function DataTable(props) {
  const { watchOpen, editOpen, deleteOpen, newlist } = props;
  const render = (value, index, record) => {
    // eslint-disable-next-line react/jsx-no-bind, react/no-this-in-sfc, max-len
    return (
      <div>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            watchOpen(record);
          }}
        >
          查看
        </Button>
        <Button
          type="secondary"
          size="small"
          onClick={() => {
            editOpen(record);
          }}
        >
          编辑
        </Button>
        <Button
          type="normal"
          size="small"
          warning
          onClick={() => {
            deleteOpen(record);
          }}
        >
          删除
        </Button>
      </div>
    );
  };
  return (
    <div style={{ overflowY: 'scroll' }}>
      <Table dataSource={newlist} style={{ height: '460px' }}>
        <Table.Column title="姓名" dataIndex="username" />
        <Table.Column title="性别" dataIndex="sex" />
        <Table.Column title="手机号" dataIndex="phone" />
        <Table.Column title="邮箱" dataIndex="email" />
        <Table.Column cell={render} width="20%" />
      </Table>
    </div>
  );
}

export default DataTable;
