import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageEditor from './pageEditor';
import MenuWx from './menuWx';
import 'antd/style/index.less';

export default class Page extends Component {
  render() {
    return (
      <Row>
        <MenuWx/>
        <Col span="2" offset="1">
          <PageEditor/>
        </Col>
      </Row>
      );
  }
}
