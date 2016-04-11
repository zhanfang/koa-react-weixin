import React , { Component } from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import request from 'superagent';

let FormItem = Form.Item;

class LoginForm extends Component {
  render() {
    return (
      <Row className="content">
        <Col span="12" offset="7">
      <Form inline>

          <Input/>

          <Input/>

        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
    </Col>
      </Row>
      );
  }
}

export default LoginForm = Form.create()(LoginForm);
