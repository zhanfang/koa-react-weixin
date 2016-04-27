import React, { Component } from 'react';
import { Modal, Button, Input, message } from 'antd';
// import AddKeyForm from './AddKeyForm';

class KeyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  showModal() {
    this.setState({
      visible: true
    });
  }
  handleOk() {
    const data = {
      key: this.refs.key.refs.input.value,
      val: this.refs.val.refs.input.value
    };
    this.props.addKey(data);
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        visible: false
      });
    }
  }
  render() {
    return (
      <div style={{
        marginBottom: 12
      }}>
        <Button type="primary" onClick={this.showModal.bind(this)}>添加关键字回复</Button>
        <Modal title="添加关键字回复"
      visible={this.state.visible}
      onOk={this.handleOk.bind(this)}
      onCancel={this.handleCancel.bind(this)}>
        <Input ref="key" defaultValue="" placeholder="请输入关键词"/>
        <Input ref="val" type="textarea" placeholder="请输入详细的回复信息" rows="4" style={{
        marginTop: 12
      }}/>
        </Modal>
      </div>
      );
  }
}

export default KeyModal;
