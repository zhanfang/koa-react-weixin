import React , { Component, PropTypes } from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    let user = this.props.form.getFieldsValue();
    this.props.fetchLogin(user)
  }

  render() {
    const {getFieldProps} = this.props.form;
    return (
      <Row className="content">
        <Col span="12" offset="7">
      <Form inline onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
      label="账户：">
          <Input placeholder="请输入账户名"
      {...getFieldProps('username')} />
        </FormItem>
        <FormItem
      label="密码：">
          <Input type="password" placeholder="请输入密码"
      {...getFieldProps('password')} />
        </FormItem>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
    </Col>
      </Row>
      );
  }
}

LoginForm.propTypes = {
  fetchLogin: PropTypes.func.isRequired
}

export default LoginForm = Form.create()(LoginForm);
