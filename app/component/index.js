import React , { Component } from 'react';
import { Col, Row, Button } from 'antd';
import IndexTable from './index/IndexTable';
import KeyModal from './index/KeyModal';
// import '../less/index.less';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col className="table" span="22" offset="1">
          <KeyModal/>
          <IndexTable/>
        </Col>
      </Row>
      );
  }
}

export default Index;
