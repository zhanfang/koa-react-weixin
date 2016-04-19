import React , { Component, PropTypes } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class AddKeyForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  }

  render() {
    const {getFieldProps} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
      {...formItemLayout}
      label="关键词：">
          <Input {...getFieldProps('key')} placeholder="请输入关键词" />
        </FormItem>
        <FormItem
      {...formItemLayout}
      label="回复信息：">
          <Input type="textarea" placeholder="随便写" rows="4" {...getFieldProps('val')} />
        </FormItem>
      </Form>
      );
  }
}

export default AddKeyForm = Form.create()(AddKeyForm);
