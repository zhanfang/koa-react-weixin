import React , { Component } from 'react';
import { Table } from 'antd';

class IndexTable extends Component {
  constructor(props) {
    super(props);
  }
  handleDel(key, id) {
    this.props.delKey(key, id);
  // this.props.fetchKey();
  }
  render() {
    const {keys} = this.props;
    console.log('---------------');
    console.log(keys);
    console.log('---------------');
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '关键字',
        dataIndex: 'key',
        key: 'key'
      },
      {
        title: '回复',
        dataIndex: 'val',
        key: 'val'
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record) => {
          return (
            <span>
              <a href='#' onClick={this.handleDel.bind(this, record.key, record.id)}>删除</a>
              <span className="ant-divider"></span>
            </span>
            );
        }
      }
    ];
    const data = [];
    for (let i = 0, len = keys.length; i < len; i++) {
      let obj = {};
      obj.id = i;
      obj.key = keys[i].key;
      if (keys[i].val.length > 50) {
        obj.val = keys[i].val.slice(0, 50) + '...';
      } else {
        obj.val = keys[i].val;
      }
      obj.description = '详细回复信息：' + keys[i].val;
      data[i] = obj;
    }
    return (
      <Table columns={columns}
      expandedRowRender={record => <p>{record.description}</p>}
      dataSource={data}
      className="table" />
      );
  }
}

export default IndexTable;
