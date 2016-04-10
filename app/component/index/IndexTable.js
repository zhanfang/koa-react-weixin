import React , { Component } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'id',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '关键字',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '回复',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <a href="#">删除</a>
  }
];

const data = [
  {
    key: 1,
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    description: '我是胡彦斌，今年32岁，住在西湖区湖底公园1号。'
  },
  {
    key: 2,
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园2号',
    description: '我是吴彦祖，今年42岁，住在西湖区湖底公园2号。'
  },
  {
    key: 3,
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园3号',
    description: '我是李大嘴，今年32岁，住在西湖区湖底公园3号。'
  }
];

class IndexTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Table columns={columns}
      expandedRowRender={record => <p>{record.description}</p>}
      dataSource={data}
      className="table" />
      );
  }
}

export default IndexTable;
