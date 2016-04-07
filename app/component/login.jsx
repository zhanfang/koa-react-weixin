import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { submitUser } from '../actions';
import 'antd/style/index.less';
import '../less/login.less'

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log({
      props
    });
  }
  render() {
    const {dispatch, getState} = this.props;
    dispatch(submitUser('12334545'));
    // const {getFieldProps} = this.props.form;
    return (
      <div className="content">
        <Row>
          <Col span="12" offset="6">
            <Form inline onSubmit={this.handleSubmit}>
              <FormItem label="账户：">
                <Input placeholder="请输入账户名" />
              </FormItem>
              <FormItem label="密码：">
                <Input type="password" placeholder="请输入密码" />
              </FormItem>
              <FormItem>
                <label className="ant-checkbox-inline">
                  <Checkbox />记住我
                </label>
              </FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </Form>
          </Col>
        </Row>
      </div>
      );
  }
}

Login = connect()(Login);

export default Login;
