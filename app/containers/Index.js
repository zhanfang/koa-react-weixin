import React , { Component } from 'react';
import { Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import { fetchKey } from '../actions';
import IndexTable from '../components/IndexTable';
import KeyModal from '../components/KeyModal';
import '../less/index.less';

class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchKey();
  }
  render() {
    const {keys} = this.props;
    return (
      <Row>
        <Col className="table" span="22" offset="1">
          <KeyModal/>
          <IndexTable keys={keys}/>
        </Col>
      </Row>
      );
  }
}

function mapStateToProps(state, props) {
  const keys = state.keys;
  return {
    keys: keys
  }
}

export default connect(mapStateToProps, {
  fetchKey
})(Index);
