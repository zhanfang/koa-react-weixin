import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class KeyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: '对话框的内容',
      visible: false
    }
  }
  showModal() {
    this.setState({
      visible: true
    });
  }
  handleOk() {
    this.setState({
      ModalText: '对话框将在两秒后关闭',
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  }
  handleCancel() {
    console.log('点击了取消');
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)}>添加关键字回复</Button>
        <Modal title="对话框标题"
      visible={this.state.visible}
      onOk={this.handleOk.bind(this)}
      confirmLoading={this.state.confirmLoading}
      onCancel={this.handleCancel.bind(this)}>
          <p>{this.state.ModalText}</p>
        </Modal>
      </div>
      );
  }
}

export default KeyModal;
