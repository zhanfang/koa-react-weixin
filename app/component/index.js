import React , { Component } from 'react';
import { Col, Row, Button } from 'antd';
import IndexTable from './indexTable';
import MenuWx from './menuWx';
import KeyModal from './keyModal';
import 'antd/style/index.less';
import '../less/index.less';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <MenuWx/>
        <Col className="table" span="22" offset="1">
          <KeyModal/>
          <IndexTable/>
        </Col>
      </Row>
      );
  }
}

export default Index;
